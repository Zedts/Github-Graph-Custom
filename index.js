import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'lodash.random';

const path = './data.json';
const git = simpleGit();

// ========================================
// CONFIGURASI UTAMA
// ========================================
const YEAR_TARGET = 2023;        // Tahun target untuk commit
const COMMIT_PER_DAY = 3;        // Jumlah commit per hari
const TOTAL_DAYS = 1;          // Total hari (maks 365 untuk 1 tahun)

// ========================================
// MODE SELECTION
// ========================================
const USE_RANDOM = true;
// const USE_MANUAL = true;

// ========================================
// RANDOM CONFIG
// ========================================
const RANDOM_WEEK_MIN = 0;       // Week mulai dari minggu ke-
const RANDOM_WEEK_MAX = 52;      // Week sampai minggu ke- (maksimal 52 untuk 1 tahun)
const RANDOM_DAY_MIN = 0;        // Hari mulai (0=Senin)
const RANDOM_DAY_MAX = 6;        // Hari sampai (6=Minggu)

// ========================================
// MANUAL CONFIG
// ========================================
const MANUAL_X = 1;              // Minggu ke- (maksimal 52 untuk 1 tahun)
const MANUAL_Y = 3;              // Hari ke- (0=Senin, 6=Minggu)

// ========================================
// VALIDASI MODE SELECTION
// ========================================
if (USE_RANDOM && USE_MANUAL) {
    console.error('❌ ERROR: HANYA BOLEH AKTIFKAN 1 MODE SAJA!');
    console.error('   → Comment salah satu: USE_RANDOM atau USE_MANUAL');
    console.error('   → Contoh RANDOM: const USE_RANDOM = true; // const USE_MANUAL = true;');
    console.error('   → Contoh MANUAL: // const USE_RANDOM = true; const USE_MANUAL = true;');
    process.exit(1);
}

if (!USE_RANDOM && !USE_MANUAL) {
    console.error('❌ ERROR: PILIH SETIDAKNYA 1 MODE!');
    console.error('   → Uncomment salah satu: USE_RANDOM atau USE_MANUAL');
    console.error('   → Contoh: const USE_RANDOM = true;');
    process.exit(1);
}

// ========================================
// LOGIC UTAMA
// ========================================
const makeCommits = async (n) => {
    if (n === 0) {
        console.log('\n✅ Pushing all commits...');
        await git.push();
        return;
    }

    const targetYearStart = moment({ year: YEAR_TARGET, month: 0, date: 1 });
    let baseDate;

    // ========================================
    // CALCULATE BASE DATE BERDASARKAN MODE
    // ========================================

    if (USE_RANDOM) {

        // LOGIC 1: RANDOM MODE
        const x = random(RANDOM_WEEK_MIN, RANDOM_WEEK_MAX);
        const y = random(RANDOM_DAY_MIN, RANDOM_DAY_MAX);
        baseDate = targetYearStart.clone()
            .add(x, 'week')
            .add(y, 'day');
        console.log(`🎲 RANDOM - Week:${x}(${RANDOM_WEEK_MIN}-${RANDOM_WEEK_MAX}), Day:${y}(${RANDOM_DAY_MIN}-${RANDOM_DAY_MAX}), Date:${baseDate.format('YYYY-MM-DD (dddd)')}`);

    } else if (USE_MANUAL) {

        // LOGIC 2: MANUAL MODE
        const startWeekMonday = targetYearStart.clone().startOf('isoWeek').add(MANUAL_X, 'weeks');
        baseDate = startWeekMonday.clone().add(MANUAL_Y, 'days').add(TOTAL_DAYS - n, 'days');
        console.log(`📅 MANUAL - Week:${MANUAL_X}, Day:${MANUAL_Y}, Day:${TOTAL_DAYS - n + 1}/${TOTAL_DAYS}, Date:${baseDate.format('YYYY-MM-DD (dddd)')}`);
    }

    // ========================================
    // CREATE COMMITS UNTUK HARI INI
    // ========================================

    console.log(`📊 Processing day ${TOTAL_DAYS - n + 1}/${TOTAL_DAYS}...\n`);

    for (let i = 0; i < COMMIT_PER_DAY; i++) {
        const hourOffset = Math.floor((i * 12) / COMMIT_PER_DAY);
        const date = baseDate.clone()
            .hour(8 + hourOffset)
            .minute(random(0, 59))
            .second(0)
            .format('YYYY-MM-DD HH:mm:ss Z');

        const data = { 
            date,
            commit: n,
            batch: i + 1,
            total: COMMIT_PER_DAY,
            year: YEAR_TARGET,
            mode: USE_RANDOM ? 'random' : 'manual',
            timestamp: Date.now() + n + i
        };

        console.log(`  ${date} (batch ${i + 1}/${COMMIT_PER_DAY})`);
        await jsonfile.writeFile(path, data);
        await git.add([path]).commit(`update day-${TOTAL_DAYS - n + 1} batch-${i + 1}`, null, { '--date': date });
    }

    console.log(''); // Spacer
    await makeCommits(n - 1);
};

// ========================================
// EXECUTE
// ========================================

console.log('🚀 GITHUB COMMIT GENERATOR');
console.log('='.repeat(50));
console.log(`📆 Year: ${YEAR_TARGET}`);
console.log(`📊 ${TOTAL_DAYS} hari × ${COMMIT_PER_DAY} commits = ${TOTAL_DAYS * COMMIT_PER_DAY} commits`);
console.log(`🎮 Mode: ${USE_RANDOM ? 'RANDOM' : 'MANUAL'}`);
console.log('='.repeat(50));

makeCommits(TOTAL_DAYS).catch(console.error);
