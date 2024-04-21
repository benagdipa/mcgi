<?php

namespace App\Rules;

use App\Models\Attendance;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UniqueAttendance implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    protected $eventId;

    public function __construct($eventId)
    {
        $this->eventId = $eventId;
    }
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!$this->passes($attribute, $value)) {
            $fail('Already marked as attended.');
        }
    }

    public function passes($attribute, $value)
    {
        // Check if the combination of event_id and email already exists
        return !Attendance::where('event_id', $this->eventId)
            ->where('email', $value)
            ->exists();
    }
}
