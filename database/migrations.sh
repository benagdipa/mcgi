#!/bin/bash

# Shell script for handling database migrations and seeding
FORCE=0
SEED=0
REFRESH=0

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --force)
            FORCE=1
            shift
            ;;
        --seed)
            SEED=1
            shift
            ;;
        --refresh)
            REFRESH=1
            shift
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Function to print section headers
write_step() {
    echo -e "\n=== $1 ==="
}

# Function to backup database
backup_database() {
    write_step "Creating database backup"
    
    timestamp=$(date +%Y%m%d_%H%M%S)
    backup_path="database/backups"
    
    mkdir -p "$backup_path"
    backup_file="$backup_path/db_backup_$timestamp.sql"
    
    if php artisan db:backup --path="$backup_file"; then
        echo "Database backup created successfully: $backup_file"
        return 0
    else
        echo "Error creating backup"
        return 1
    fi
}

# Function to run migrations in sequence
run_migrations() {
    write_step "Running migrations in correct sequence"
    
    # 1. System Tables (no dependencies)
    echo "1. Creating system tables..."
    php artisan migrate --path=database/migrations/2019_08_19_000000_create_system_tables.php || return 1
    
    # 2. Users Table (depends on system tables)
    echo "2. Creating users table..."
    php artisan migrate --path=database/migrations/2014_10_12_000000_create_users_table.php || return 1
    php artisan migrate --path=database/migrations/2014_10_12_100000_create_password_reset_tokens_table.php || return 1
    
    # 3. Permission Tables (depends on users)
    echo "3. Creating permission tables..."
    php artisan migrate --path=database/migrations/2024_03_21_000000_create_permission_tables.php || return 1
    
    # 4. Categories Table (depends on users)
    echo "4. Creating categories table..."
    php artisan migrate --path=database/migrations/2024_03_29_000000_create_categories_table.php || return 1
    
    # 5. Events Tables (depends on users and categories)
    echo "5. Creating events tables..."
    php artisan migrate --path=database/migrations/2024_04_08_000001_create_event_attendances_table.php || return 1
    php artisan migrate --path=database/migrations/2024_04_08_000002_create_events_options_table.php || return 1
    
    # 6. Gallery Tables (depends on users and categories)
    echo "6. Creating gallery tables..."
    php artisan migrate --path=database/migrations/2024_04_18_000000_create_gallery_tables.php || return 1
    
    return 0
}

# Function to run seeders in sequence
run_seeders() {
    write_step "Running seeders in correct sequence"
    
    # 1. Roles and Permissions (no dependencies)
    echo "1. Seeding roles and permissions..."
    php artisan db:seed --class=RoleAndPermissionSeeder || return 1
    
    # 2. Super Admin (depends on roles)
    echo "2. Seeding super admin..."
    php artisan db:seed --class=SuperAdminSeeder || return 1
    
    # 3. Locales (system data)
    echo "3. Seeding locales..."
    php artisan db:seed --class=LocaleSeeder || return 1
    
    # 4. Categories
    echo "4. Seeding categories..."
    php artisan db:seed --class=CategorySeeder || return 1
    
    # 5. Locations (depends on locales)
    echo "5. Seeding locations..."
    php artisan db:seed --class=LocationSeeder || return 1
    
    # 6. Events Options
    echo "6. Seeding events options..."
    php artisan db:seed --class=EventsOptionsSeeder || return 1
    
    # 7. Sample Content
    echo "7. Seeding sample content..."
    php artisan db:seed --class=PostSeeder || return 1
    php artisan db:seed --class=BannerTablesSeeder || return 1
    
    return 0
}

# Main execution flow
if [ $FORCE -eq 0 ]; then
    echo "WARNING: This script will modify your database. Make sure you have a backup."
    read -p "Do you want to continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Operation cancelled."
        exit 0
    fi
fi

# Create backup if not forced
if [ $FORCE -eq 0 ]; then
    if ! backup_database; then
        echo "Failed to create backup. Use --force to skip backup."
        exit 1
    fi
fi

# Handle refresh flag
if [ $REFRESH -eq 1 ]; then
    write_step "Refreshing database"
    if ! php artisan migrate:reset; then
        echo "Failed to reset database"
        exit 1
    fi
fi

# Run migrations
if ! run_migrations; then
    echo "Migration failed. Please check the error messages above."
    exit 1
fi
echo "Migrations completed successfully."

# Run seeders if requested
if [ $SEED -eq 1 ]; then
    if ! run_seeders; then
        echo "Seeding failed. Please check the error messages above."
        exit 1
    fi
    echo "Seeding completed successfully."
fi

echo -e "\nDatabase setup completed successfully!" 