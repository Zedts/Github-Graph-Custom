import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'lodash.random';
import config from './config.js';

const path = './data.json';
const git = simpleGit();

// ========================================
// LOGIC UTAMA
// ========================================
const makeCommits = async (n) => {
    if (n === 0) {
        console.log('\n✅ Pushing all commits...');
        await git.push();
        return;
    }

    const targetYearStart = moment({ year: config.YEAR_TARGET, month: 0, date: 1 });
    let baseDate;

    // ========================================
    // CALCULATE BASE DATE BERDASARKAN MODE
    // ========================================

    if (config.USE_RANDOM) {

        // LOGIC 1: RANDOM MODE
        const x = random(config.RANDOM_WEEK_MIN, config.RANDOM_WEEK_MAX);
        const y = random(config.RANDOM_DAY_MIN, config.RANDOM_DAY_MAX);
        baseDate = targetYearStart.clone()
            .add(x, 'week')
            .add(y, 'day');
        console.log(`🎲 RANDOM - Week:${x}(${config.RANDOM_WEEK_MIN}-${config.RANDOM_WEEK_MAX}), Day:${y}(${config.RANDOM_DAY_MIN}-${config.RANDOM_DAY_MAX}), Date:${baseDate.format('YYYY-MM-DD (dddd)')}`);

    } else if (config.USE_MANUAL) {

        // LOGIC 2: MANUAL MODE
        const startWeekMonday = targetYearStart.clone().startOf('isoWeek').add(config.MANUAL_WEEK, 'weeks');
        baseDate = startWeekMonday.clone().add(config.MANUAL_DAY, 'days').add(config.TOTAL_DAYS - n, 'days');
        console.log(`📅 MANUAL - Week:${config.MANUAL_WEEK}, Day:${config.MANUAL_DAY}, Day:${config.TOTAL_DAYS - n + 1}/${config.TOTAL_DAYS}, Date:${baseDate.format('YYYY-MM-DD (dddd)')}`);
    }

    // ========================================
    // CREATE COMMITS UNTUK HARI INI
    // ========================================

    console.log(`📊 Processing day ${config.TOTAL_DAYS - n + 1}/${config.TOTAL_DAYS}...\n`);

    for (let i = 0; i < config.COMMIT_PER_DAY; i++) {
        const hourOffset = Math.floor((i * 12) / config.COMMIT_PER_DAY);
        const date = baseDate.clone()
            .hour(8 + hourOffset)
            .minute(random(0, 59))
            .second(0)
            .format('YYYY-MM-DD HH:mm:ss Z');

        const data = { 
            date,
            commit: n,
            batch: i + 1,
            total: config.COMMIT_PER_DAY,
            year: config.YEAR_TARGET,
            mode: config.USE_RANDOM ? 'random' : 'manual',
            timestamp: Date.now() + n + i
        };

        console.log(`  ${date} (batch ${i + 1}/${config.COMMIT_PER_DAY})`);
        await jsonfile.writeFile(path, data);
        await git.add([path]).commit(`update day-${config.TOTAL_DAYS - n + 1} batch-${i + 1}`, null, { '--date': date });
    }

    console.log(''); // Spacer
    await makeCommits(n - 1);
};

// ========================================
// EXECUTE
// ========================================

console.log('🚀 GITHUB COMMIT GENERATOR');
console.log('='.repeat(50));
console.log(`📆 Year: ${config.YEAR_TARGET}`);
console.log(`📊 ${config.TOTAL_DAYS} hari × ${config.COMMIT_PER_DAY} commits = ${config.TOTAL_DAYS * config.COMMIT_PER_DAY} commits`);
console.log(`🎮 Mode: ${config.USE_RANDOM ? 'RANDOM' : 'MANUAL'}`);
console.log('='.repeat(50));

makeCommits(config.TOTAL_DAYS).catch(console.error);
