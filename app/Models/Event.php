<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    // Event types
    const TYPE_INTERNAL = 'internal';
    const TYPE_EXTERNAL = 'external';

    // Event categories for internal events
    const CATEGORY_WORSHIP = 'worship_service';
    const CATEGORY_THANKSGIVING = 'thanksgiving';
    const CATEGORY_PRAYER = 'prayer_meeting';
    const CATEGORY_BIBLE_STUDY = 'bible_study';
    const CATEGORY_MEMBERS_MEETING = 'members_meeting';
    
    // Event categories for external events
    const CATEGORY_OUTREACH = 'outreach';
    const CATEGORY_COMMUNITY = 'community_event';
    const CATEGORY_SPECIAL = 'special_event';
    const CATEGORY_HOLIDAY = 'holiday_celebration';

    protected $fillable = [
        'title',
        'description',
        'location',
        'category',
        'event_type', // 'internal' or 'external'
        'requires_registration', // Whether registration is required
        'max_attendees', // Maximum number of attendees (null for unlimited)
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'requires_registration' => 'boolean',
        'max_attendees' => 'integer',
    ];

    /**
     * Get the attendances for the event.
     */
    public function attendances(): HasMany
    {
        return $this->hasMany(EventAttendance::class);
    }

    /**
     * Determine if the event is internal (members only).
     */
    public function isInternal(): bool
    {
        return $this->event_type === self::TYPE_INTERNAL;
    }

    /**
     * Determine if the event is external (open to guests).
     */
    public function isExternal(): bool
    {
        return $this->event_type === self::TYPE_EXTERNAL;
    }

    /**
     * Get internal event categories as an array.
     */
    public static function internalCategories(): array
    {
        return [
            self::CATEGORY_WORSHIP => 'Worship Service',
            self::CATEGORY_THANKSGIVING => 'Thanksgiving',
            self::CATEGORY_PRAYER => 'Prayer Meeting',
            self::CATEGORY_BIBLE_STUDY => 'Bible Study',
            self::CATEGORY_MEMBERS_MEETING => 'Members Meeting',
        ];
    }

    /**
     * Get external event categories as an array.
     */
    public static function externalCategories(): array
    {
        return [
            self::CATEGORY_OUTREACH => 'Outreach Program',
            self::CATEGORY_COMMUNITY => 'Community Event',
            self::CATEGORY_SPECIAL => 'Special Event',
            self::CATEGORY_HOLIDAY => 'Holiday Celebration',
        ];
    }

    /**
     * Get all event categories.
     */
    public static function allCategories(): array
    {
        return array_merge(self::internalCategories(), self::externalCategories());
    }

    /**
     * Get category display name.
     */
    public function getCategoryNameAttribute(): string
    {
        $allCategories = self::allCategories();
        return $allCategories[$this->category] ?? ucfirst(str_replace('_', ' ', $this->category));
    }
} 