import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'lodash.random';

const path = './data.json';
const git = simpleGit();

// ========================================
// CONFIGURASI
// ========================================
const YEAR_TARGET = 2024; // tahun target untuk commit
const COMMIT_PER_DAY = 3; // jumlah commit per hari
const TOTAL_DAYS = 10; // total hari yang ingin diisi commit

// ========================================
// RANDOM RANGE CONFIG
// ========================================
const RANDOM_WEEK_MIN = 0; // start minggu ke- (0 = minggu pertama tahun ini)
const RANDOM_WEEK_MAX = 20; // sampai minggu ke- (maks 52)
const RANDOM_DAY_MIN = 0; // start hari ke- dalam minggu itu (0 = Senin, 6 = Minggu)
const RANDOM_DAY_MAX = 4; // sampai hari ke- dalam minggu itu (0 = Senin, 6 = Minggu)

// ========================================
// MANUAL CONFIG
// ========================================
const MANUAL_X = 1; // minggu ke- (0 = minggu pertama tahun ini)
const MANUAL_Y = 3; // hari ke- dalam minggu itu (0 = Senin, 6 = Minggu)

// ========================================
// CODE LOGIC STARTS HERE
// ========================================

const makeCommits = async (n) => {
    if (n === 0) {
        await git.push();
        return;
    }
    let baseDate;

    const now = moment();
    const targetYearStart = moment({ year: YEAR_TARGET, month: 0, date: 1 });
    const daysOffset = now.diff(targetYearStart, 'days');

    // ========================================
    // LOGIC 1: RANDOM - CONFIGURABLE RANGE
    // ========================================
    const x = random(RANDOM_WEEK_MIN, RANDOM_WEEK_MAX);
    const y = random(RANDOM_DAY_MIN, RANDOM_DAY_MAX);
    // baseDate = targetYearStart
    //     .add(x, 'week')
    //     .add(y, 'day');
    // console.log(`RANDOM - Year:${YEAR_TARGET}, Week:${x} (range ${RANDOM_WEEK_MIN}-${RANDOM_WEEK_MAX}), Day:${y} (range ${RANDOM_DAY_MIN}-${RANDOM_DAY_MAX}), Date:${baseDate.format('YYYY-MM-DD (dddd)')}`);

    // ========================================
    // END LOGIC 1
    // ========================================

    // ========================================
    // LOGIC 2: MANUAL
    // ========================================
    const startWeekMonday = targetYearStart.startOf('isoWeek').add(MANUAL_X, 'weeks');
    baseDate = startWeekMonday.add(MANUAL_Y, 'days').add(TOTAL_DAYS - n, 'days');
    
    console.log(`MANUAL LINEAR - Year:${YEAR_TARGET}, Week:${MANUAL_X}, Day:${MANUAL_Y}, DayIndex:${TOTAL_DAYS - n + 1}/${TOTAL_DAYS}, Date:${baseDate.format('YYYY-MM-DD (dddd)')}`);

    // ========================================
    // END LOGIC 2
    // ========================================

    // LOOP DYNAMIC
    for (let i = 0; i < COMMIT_PER_DAY; i++) {
        const date = baseDate
            .clone()
            .hour(8 + (i * 12 / COMMIT_PER_DAY))
            .minute(random(0, 59))
            .second(0)
            .format('YYYY-MM-DD HH:mm:ss Z');
        
        const data = { 
            date, 
            commit: n, 
            batch: i + 1,
            total: COMMIT_PER_DAY,
            year: YEAR_TARGET,
            day_index: TOTAL_DAYS - n + 1,
            timestamp: Date.now() + n + i 
        };
        
        console.log(`${date} (batch ${i + 1}/${COMMIT_PER_DAY}, day ${TOTAL_DAYS - n + 1}/${TOTAL_DAYS})`);
        await jsonfile.writeFile(path, data);
        await git.add([path]).commit(`data update day-${TOTAL_DAYS - n + 1}-${i + 1}`, null, { '--date': date });
    }

    await makeCommits(n - 1);
};

makeCommits(TOTAL_DAYS).catch(console.error);
console.log(`🚀 Total: ${TOTAL_DAYS * COMMIT_PER_DAY} commits (${TOTAL_DAYS} hari x ${COMMIT_PER_DAY}/hari)`);
