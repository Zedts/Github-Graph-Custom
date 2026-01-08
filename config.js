// ========================================
// GITHUB COMMIT GENERATOR CONFIGURATION
// ========================================
const YEAR_TARGET = 2023; // Target year for commits (Ignored in RECENT mode)
const COMMIT_PER_DAY = 1; // Number of commits per day
const TOTAL_DAYS = 1; // Total days (max 365 for 1 year)

// ========================================
// MODE SELECTION (CHOOSE MODE true / false)
// ========================================
const USE_RANDOM = true;
const USE_MANUAL = false;
const USE_RECENT = false;

// ========================================
// RANDOM CONFIG
// ========================================
const RANDOM_WEEK_MIN = 0; // Week start from week number
const RANDOM_WEEK_MAX = 52; // Week until week number (max 52 for 1 year)
const RANDOM_DAY_MIN = 0; // Day start (0=Monday)
const RANDOM_DAY_MAX = 6; // Day until (6=Sunday)

// ========================================
// MANUAL CONFIG
// ========================================
const MANUAL_WEEK = 1; // Week number (max 52 for 1 year)
const MANUAL_DAY = 3; // Day number (0=Monday, 6=Sunday)

// ========================================
// RECENT CONFIG
// ========================================
const RECENT_DAYS_OFFSET = 0; // 0 = Start from today, 1 = Start from yesterday

// ========================================
// MODE SELECTION VALIDATION
// ========================================
const activeModes = [USE_RANDOM, USE_MANUAL, USE_RECENT].filter(Boolean).length;

if (activeModes > 1) {
    console.error('❌ ERROR: ONLY 1 MODE CAN BE ACTIVATED!');
    console.error('   → Set only one of these to true: USE_RANDOM, USE_MANUAL, USE_RECENT');
    process.exit(1);
}

if (activeModes === 0) {
    console.error('❌ ERROR: CHOOSE AT LEAST 1 MODE!');
    console.error('   → Set one of these to true: USE_RANDOM, USE_MANUAL, USE_RECENT');
    process.exit(1);
}

export default {
    YEAR_TARGET,
    COMMIT_PER_DAY,
    TOTAL_DAYS,
    USE_RANDOM,
    USE_MANUAL,
    USE_RECENT,
    RANDOM_WEEK_MIN,
    RANDOM_WEEK_MAX,
    RANDOM_DAY_MIN,
    RANDOM_DAY_MAX,
    MANUAL_WEEK,
    MANUAL_DAY,
    RECENT_DAYS_OFFSET
};
