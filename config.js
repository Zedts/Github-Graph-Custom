// ========================================
// CONFIGURASI GITHUB COMMIT GENERATOR
// ========================================
const YEAR_TARGET = 2023; // Tahun target untuk commit
const COMMIT_PER_DAY = 1; // Jumlah commit per hari
const TOTAL_DAYS = 1; // Total hari (maks 365 untuk 1 tahun)

// ========================================
// MODE SELECTION (PILIH MODE true / false)
// ========================================
const USE_RANDOM = true;
const USE_MANUAL = false;

// ========================================
// RANDOM CONFIG
// ========================================
const RANDOM_WEEK_MIN = 0; // Week mulai dari minggu ke-
const RANDOM_WEEK_MAX = 52; // Week sampai minggu ke- (maksimal 52 untuk 1 tahun)
const RANDOM_DAY_MIN = 0; // Hari mulai (0=Senin)
const RANDOM_DAY_MAX = 6; // Hari sampai (6=Minggu)

// ========================================
// MANUAL CONFIG
// ========================================
const MANUAL_WEEK = 1; // Minggu ke- (maksimal 52 untuk 1 tahun)
const MANUAL_DAY = 3; // Hari ke- (0=Senin, 6=Minggu)

// ========================================
// VALIDASI MODE SELECTION
// ========================================
if (USE_RANDOM && USE_MANUAL) {
    console.error('❌ ERROR: HANYA BOLEH AKTIFKAN 1 MODE SAJA!');
    console.error('   → Comment salah satu: USE_RANDOM atau USE_MANUAL');
    console.error('   → Contoh RANDOM: const USE_RANDOM = true; const USE_MANUAL = false;');
    console.error('   → Contoh MANUAL: const USE_RANDOM = false; const USE_MANUAL = true;');
    process.exit(1);
}

if (!USE_RANDOM && !USE_MANUAL) {
    console.error('❌ ERROR: PILIH SETIDAKNYA 1 MODE!');
    console.error('   → Uncomment salah satu: USE_RANDOM atau USE_MANUAL');
    console.error('   → Contoh: const USE_RANDOM = true; const USE_MANUAL = false;');
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
