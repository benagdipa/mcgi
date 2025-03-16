# Database Migration Strategy for Production

This directory contains consolidated and optimized database migrations for deploying to production servers using MySQL. The migrations have been reorganized to address several issues:

1. **Removal of duplicate migrations** - Several migrations were attempting to create the same tables or modify the same columns
2. **Fixed migration timestamps** - Some migrations had incorrect timestamps from the year 2025
3. **Improved MySQL compatibility** - Added proper indexes and optimized field types for MySQL
4. **Consolidated related tables** - Related tables are now created in the same migration file
5. **Added explicit foreign key relationships** - Ensures data integrity across tables

## Deployment Instructions

### For Fresh Installation

If you're setting up the database for the first time, follow these steps:

1. Copy all migration files from this directory to your `database/migrations` directory, replacing any existing files
2. Run the migrations:

```
php artisan migrate
```

### For Existing Installations

If you already have a database with tables, follow these steps to safely update your schema:

1. Create a backup of your production database:

```powershell
mysqldump -u username -p database_name > database_backup.sql
```

2. Create a new temp directory in your Laravel project:

```powershell
New-Item -ItemType Directory -Path database/temp_migrations
```

3. Copy all migration files from this directory to the temp directory:

```powershell
Copy-Item fixed_migrations/* database/temp_migrations/
```

4. Reset your migrations (only in development, never in production without a backup):

```powershell
php artisan migrate:reset
```

5. Move the temp migrations to replace your existing migrations:

```powershell
Remove-Item database/migrations/* -Recurse -Force
Move-Item database/temp_migrations/* database/migrations/
Remove-Item database/temp_migrations -Recurse -Force
```

6. Run the new migrations:

```powershell
php artisan migrate
```

7. Import your data back if needed (depending on your strategy):

```powershell
mysql -u username -p database_name < data_backup.sql
```

## MySQL-Specific Optimizations

The migrations include several MySQL-specific optimizations:

1. **Appropriate indexes** on frequently queried columns
2. **Proper string lengths** for high-cardinality indexes
3. **InnoDB-friendly** foreign key relationships
4. **Minimized TEXT fields** where possible to improve performance
5. **Soft deletes** for maintaining data integrity without hard deletion

## Table Dependencies

The migrations are arranged in a specific order to ensure proper foreign key relationships:

1. System tables (failed_jobs, personal_access_tokens)
2. Users table
3. Permission tables
4. Categories and Tags
5. Content tables (posts, events)
6. Relationship tables (attendances, etc.)

## Troubleshooting

If you encounter issues during migration:

1. Check that all foreign key references exist before they are referenced
2. Verify MySQL version compatibility (these migrations are tested with MySQL 5.7+)
3. If you get "Specified key was too long" errors, you may need to update your MySQL configuration to use the utf8mb4 charset with a smaller key length

For further assistance, contact the development team. 