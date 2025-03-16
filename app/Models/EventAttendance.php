<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventAttendance extends Model
{
    use HasFactory;

    // Attendee types
    const TYPE_MEMBER = 'member';
    const TYPE_GUEST = 'guest';

    // Attendance modes
    const MODE_IN_PERSON = 'in-person';
    const MODE_ONLINE = 'online';

    protected $fillable = [
        'event_id',
        'user_id',
        'name',
        'email',
        'phone',
        'locale',
        'attendee_type', // 'member' or 'guest'
        'attendance_mode', // 'in-person' or 'online'
        'check_in_time', // When the attendee checked in
        'notes', // Any additional notes about the attendance
    ];

    protected $casts = [
        'check_in_time' => 'datetime',
    ];

    /**
     * Get the event that owns the attendance.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the user that owns the attendance.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Determine if the attendee is a member.
     */
    public function isMember(): bool
    {
        return $this->attendee_type === self::TYPE_MEMBER;
    }

    /**
     * Determine if the attendee is a guest.
     */
    public function isGuest(): bool
    {
        return $this->attendee_type === self::TYPE_GUEST;
    }

    /**
     * Determine if attendance is in-person.
     */
    public function isInPerson(): bool
    {
        return $this->attendance_mode === self::MODE_IN_PERSON;
    }

    /**
     * Determine if attendance is online.
     */
    public function isOnline(): bool
    {
        return $this->attendance_mode === self::MODE_ONLINE;
    }
} 