// ========================================
// GITHUB COMMIT GENERATOR CONFIGURATION
// ========================================
const YEAR_TARGET = 2023; // Target year for commits
const COMMIT_PER_DAY = 1; // Number of commits per day
const TOTAL_DAYS = 1; // Total days (max 365 for 1 year)

// ========================================
// MODE SELECTION (CHOOSE MODE true / false)
// ========================================
const USE_RANDOM = true;
const USE_MANUAL = false;

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
// MODE SELECTION VALIDATION
// ========================================
if (USE_RANDOM && USE_MANUAL) {
    console.error('❌ ERROR: ONLY 1 MODE CAN BE ACTIVATED!');
    console.error('   → Comment one of: USE_RANDOM or USE_MANUAL');
    console.error('   → Example RANDOM: const USE_RANDOM = true; const USE_MANUAL = false;');
    console.error('   → Example MANUAL: const USE_RANDOM = false; const USE_MANUAL = true;');
    process.exit(1);
}

if (!USE_RANDOM && !USE_MANUAL) {
    console.error('❌ ERROR: CHOOSE AT LEAST 1 MODE!');
    console.error('   → Uncomment one of: USE_RANDOM or USE_MANUAL');
    console.error('   → Example: const USE_RANDOM = true; const USE_MANUAL = false;');
    process.exit(1);
}

export default {
    YEAR_TARGET,
    COMMIT_PER_DAY,
    TOTAL_DAYS,
    USE_RANDOM,
    USE_MANUAL,
    RANDOM_WEEK_MIN,
    RANDOM_WEEK_MAX,
    RANDOM_DAY_MIN,
    RANDOM_DAY_MAX,
    MANUAL_WEEK,
    MANUAL_DAY
};
