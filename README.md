# 🚀 **Github-Graph-Custom**


> **Generate custom GitHub contribution graphs** with precise control over dates, patterns, and commit frequency!


## ✨ **Features**
- 🎯 **Triple Mode**: Random scatter, Linear sequential, or Recent commits
- 📅 **Any Year**: Target 2023, 2024, 2025, or future years
- ⏰ **Custom Hours**: Spread commits across workday (8AM-8PM)
- ⚙️ **Easy Config**: Edit `config.js`, run `node index.js`
- ✅ **Git Ready**: Auto commit + push to your repo
- 🛡️ **Validation**: Prevents config errors before execution


## 🚀 **Quick Start**


```bash
# 1. Clone & Install
git clone <your-repo>
cd Github-Graph-Custom
npm install


# 2. Configure (edit config.js)
# 3. Run!
node index.js
```


**Congrats! 🎉 Your GitHub graph is populated instantly!**


## ⚙️ **Configuration** (`config.js`)


### Core Settings
```javascript
YEAR_TARGET = 2023        // Target year (2023, 2024, 2025, etc) - Ignored in RECENT mode
COMMIT_PER_DAY = 3        // How many commits per day (1-10 recommended)
TOTAL_DAYS = 365          // How many days to fill (max 365)
```


### Mode Selection (Choose ONE)
Set exactly one of these to `true`.

```javascript
const USE_RANDOM = false;  // Random scatter pattern
const USE_MANUAL = false;  // Linear sequential dates
const USE_RECENT = true;   // Recent dates (from today backwards)
```


### RANDOM Mode Config
```javascript
RANDOM_WEEK_MIN = 0       // Week range start (0 = first week of year)
RANDOM_WEEK_MAX = 52      // Week range end (52 = last week of year)
RANDOM_DAY_MIN = 0        // Day range start (0 = Monday)
RANDOM_DAY_MAX = 6        // Day range end (6 = Sunday)
```


### MANUAL Mode Config
```javascript
MANUAL_WEEK = 1           // Starting week (1 = week 1)
MANUAL_DAY = 3            // Starting day (0=Mon, 1=Tue, 2=Wed, 3=Thu, etc)
```


### RECENT Mode Config
```javascript
RECENT_DAYS_OFFSET = 0    // 0 = Start from today, 1 = Start from yesterday, etc
```


## 🎮 **Mode Comparison**


| Feature | RANDOM | MANUAL | RECENT |
|---------|--------|--------|--------|
| **Pattern** | Scattered across date range | Linear sequential from start date | Sequential from today/recent backwards |
| **Use Case** | Natural-looking contributions | Fill specific date range continuously | Fill recent contribution streak |
| **Config** | Set week/day range | Set start week/day | Set days offset from today |
| **Year Control** | Full control via YEAR_TARGET | Full control via YEAR_TARGET | Ignores YEAR_TARGET (uses current year) |
| **Best For** | Realistic activity patterns | Completing activity streaks | Recent activity streaks |


## 📋 **Config Examples**


### Example 1: RANDOM MODE
```javascript
const YEAR_TARGET = 2024;
const COMMIT_PER_DAY = 2;
const TOTAL_DAYS = 250;


const USE_RANDOM = true;
const USE_MANUAL = false;
const USE_RECENT = false;

const RANDOM_WEEK_MIN = 0;
const RANDOM_WEEK_MAX = 52;
```


### Example 2: MANUAL MODE
```javascript
const YEAR_TARGET = 2023;
const COMMIT_PER_DAY = 3;
const TOTAL_DAYS = 365;


const USE_RANDOM = false;
const USE_MANUAL = true;
const USE_RECENT = false;

const MANUAL_WEEK = 1;   // Start from week 1
const MANUAL_DAY = 0;    // Start from Monday
```


### Example 3: RECENT MODE
```javascript
const COMMIT_PER_DAY = 2;
const TOTAL_DAYS = 30; // Last 30 days


const USE_RANDOM = false;
const USE_MANUAL = false;
const USE_RECENT = true;


const RECENT_DAYS_OFFSET = 0;  // 0 = Start from today, 5 = Start from 5 days ago
```


## 📁 **File Structure**
```
Github-Graph-Custom/
├── 📄 index.js          # Main logic (don't edit, all logic goes here)
├── 📄 config.js         # 🎛️ EDIT YOUR SETTINGS HERE
├── 📄 data.json         # Auto-generated (git tracked)
├── 📄 README.md         # This file
└── 📦 package.json      # Dependencies
```


## 📦 **Installation**


### Prerequisites
- Node.js v18+ installed
- Git repository initialized
- npm or yarn


## ▶️ **Running the Generator**


### Step 1: Configure
Edit `config.js` with your desired settings:
```bash
# Open in your editor
nano config.js
```


### Step 2: Execute
```bash
node index.js
```


### Step 3: Watch Output
```
🚀 GITHUB COMMIT GENERATOR
==================================================
📆 Year: CURRENT/RECENT
📊 7 hari × 5 commits = 35 commits
🎮 Mode: RECENT
==================================================
🎲 RANDOM - Week:19(0-52), Day:2(0-6), Date:2023-05-10 (Wednesday)
📊 Processing day 1/365...
  2023-05-10 08:23:45 (batch 1/3)
  2023-05-10 12:17:32 (batch 2/3)
  2023-05-10 16:41:09 (batch 3/3)


...processing more days...


✅ Pushing all commits...
```


### Step 4: Verify
Check your GitHub profile - contributions updated! ✨


## 🎨 **Output Details**


Each commit generates:
```json
{
  "date": "2023-05-10 08:23:45 +0700",
  "commit": 365,
  "batch": 1,
  "total": 3,
  "year": 2023,
  "mode": "recent",
  "timestamp": 1234567890123
}
```


Commit messages follow pattern:
```
update day-{dayNumber} batch-{batchNumber}
Example: update day-1 batch-1
```


## 📊 **Understanding Day Numbers**


```
Day 0 = Monday    (Senin)
Day 1 = Tuesday   (Selasa)
Day 2 = Wednesday (Rabu)
Day 3 = Thursday  (Kamis)
Day 4 = Friday    (Jumat)
Day 5 = Saturday  (Sabtu)
Day 6 = Sunday    (Minggu)
```


## 🕒 **RECENT Mode Explained**


The RECENT mode generates commits starting from today and going backwards for a specified number of days.

### How RECENT Works:
```
RECENT_DAYS_OFFSET = 0  → Commits start from TODAY
RECENT_DAYS_OFFSET = 1  → Commits start from YESTERDAY
RECENT_DAYS_OFFSET = 7  → Commits start from 7 DAYS AGO
RECENT_DAYS_OFFSET = 30 → Commits start from 30 DAYS AGO
```

### Use Cases:
- Fill recent contribution gaps
- Create activity streak from today backwards
- Backfill last N days of activity
- No need to worry about year (auto-uses current year)


### RECENT Mode Output Example:
```
🚀 GITHUB COMMIT GENERATOR
==================================================
📆 Year: CURRENT/RECENT
📊 30 hari × 2 commits = 60 commits
🎮 Mode: RECENT
==================================================
🕒 RECENT - Day:1/30, Offset:0, Date:2026-01-10 (Friday)
📊 Processing day 1/30...
  2026-01-10 08:23:45 (batch 1/2)
  2026-01-10 12:17:32 (batch 2/2)

🕒 RECENT - Day:2/30, Offset:0, Date:2026-01-09 (Thursday)
📊 Processing day 2/30...
  2026-01-09 08:23:45 (batch 1/2)
  2026-01-09 12:17:32 (batch 2/2)

...processing more days...

✅ Pushing all commits...
```


## ⚠️ **Important Notes**


### ✅ Safe & Recommended
- Works on any repository (new or existing)
- Only modifies `data.json` file
- Preserves all existing commits
- Git history remains intact
- Can be run multiple times


### 🔒 Best Practices
- Use on personal projects first
- Don't share generated repos professionally
- For legitimate contribution graphs only
- Respect GitHub's terms of service


### 🛡️ Validation Features
- Prevents multiple mode activation
- Requires exactly one mode enabled
- Validates week/day ranges
- Checks year validity
- Validates RECENT_DAYS_OFFSET


## 🐛 **Troubleshooting**


### Error: "ONLY 1 MODE CAN BE ACTIVATED"
```
❌ Problem: More than one mode is set to true
✅ Solution: Set only ONE of these to true in config.js:
   - USE_RANDOM
   - USE_MANUAL
   - USE_RECENT
```


### Error: "CHOOSE AT LEAST 1 MODE"
```
❌ Problem: All modes are set to false
✅ Solution: Set one mode to true in config.js
```


### Error: "Module not found"
```
❌ Problem: Dependencies not installed
✅ Solution: Run npm install
```


### Error: "Git push failed"
```
❌ Problem: GitHub credentials not set or remote not configured
✅ Solution: 
   1. Configure git credentials: git config user.name & git config user.email
   2. Add remote: git remote add origin <repo-url>
   3. Verify remote: git remote -v
```


### No contributions showing on GitHub
```
❌ Problem: Commits use wrong author email
✅ Solution: 
   1. Check git config: git config --list
   2. Update if needed: git config user.email "your-github-email@example.com"
   3. Re-run the generator
```


### RECENT mode showing wrong dates
```
❌ Problem: Timezone mismatch
✅ Solution: 
   1. Check system timezone
   2. Verify RECENT_DAYS_OFFSET is set correctly
   3. Check GIT_AUTHOR_DATE format
```


## 🔍 **How It Works**


1. **Read Config** → Load `config.js` settings
2. **Validate Config** → Check that exactly one mode is enabled
3. **Calculate Dates** → Based on selected mode (RANDOM, MANUAL, or RECENT)
4. **Generate Commits** → Create commits with custom dates
5. **Write Data** → Update `data.json` file
6. **Git Add** → Stage changes
7. **Git Commit** → Commit with backdated timestamps
8. **Git Push** → Push to remote repository


### RANDOM Mode Flow
```
Random Week (0-52) + Random Day (0-6) 
→ Calculate date within target year
→ Repeat TOTAL_DAYS times (each iteration generates new random date)
→ Each day generates COMMIT_PER_DAY commits
```


### MANUAL Mode Flow
```
Start from Week N, Day D in target year
→ Linear add days sequentially
→ Day 1 = StartDate + 0 days
→ Day 2 = StartDate + 1 day
→ Day 3 = StartDate + 2 days
→ Continues sequentially for TOTAL_DAYS
```


### RECENT Mode Flow
```
Today's date - RECENT_DAYS_OFFSET
→ Linear subtract days sequentially backwards
→ Day 1 = Today - Offset (most recent)
→ Day 2 = Yesterday - Offset
→ Day 3 = Day before yesterday - Offset
→ Continues backwards for TOTAL_DAYS
```


## 📈 **Examples Output**


### Scenario: Fill Q1 2024 (RANDOM)
```javascript
YEAR_TARGET = 2024;
TOTAL_DAYS = 90;  // Q1
COMMIT_PER_DAY = 2;
USE_RANDOM = true;
USE_MANUAL = false;
USE_RECENT = false;

RANDOM_WEEK_MIN = 0;   // Jan 1
RANDOM_WEEK_MAX = 13;  // Mar 31
RANDOM_DAY_MIN = 0;
RANDOM_DAY_MAX = 6;
```


### Scenario: Perfect 365 Day Streak (MANUAL)
```javascript
YEAR_TARGET = 2023;
TOTAL_DAYS = 365;
COMMIT_PER_DAY = 1;
USE_RANDOM = false;
USE_MANUAL = true;
USE_RECENT = false;

MANUAL_WEEK = 1;
MANUAL_DAY = 0;
```


### Scenario: Fill Last 30 Days (RECENT)
```javascript
TOTAL_DAYS = 30;
COMMIT_PER_DAY = 2;
USE_RANDOM = false;
USE_MANUAL = false;
USE_RECENT = true;

RECENT_DAYS_OFFSET = 0;  // Start from today
```


### Scenario: Backfill Last Week (RECENT)
```javascript
TOTAL_DAYS = 7;
COMMIT_PER_DAY = 1;
USE_RANDOM = false;
USE_MANUAL = false;
USE_RECENT = true;

RECENT_DAYS_OFFSET = 0;  // Start from today, go back 7 days
```


### Scenario: Fill Previous Month (RECENT)
```javascript
TOTAL_DAYS = 31;
COMMIT_PER_DAY = 1;
USE_RANDOM = false;
USE_MANUAL = false;
USE_RECENT = true;

RECENT_DAYS_OFFSET = 0;  // Start from today, go back 31 days (covers most of previous month)
```


## 💡 **Tips & Tricks**


### Tip 1: Different Patterns (RANDOM)
Adjust `RANDOM_WEEK_MIN` and `RANDOM_WEEK_MAX` for different seasons


### Tip 2: Sparse vs Dense
- Increase `TOTAL_DAYS` for denser graph
- Increase `COMMIT_PER_DAY` for more visible contributions


### Tip 3: Realistic Activity (RANDOM)
- Use `RANDOM_DAY_MIN = 0, RANDOM_DAY_MAX = 4` for workday pattern
- Use `RANDOM_DAY_MIN = 5, RANDOM_DAY_MAX = 6` for weekend activity


### Tip 4: Multiple Runs (Different Years)
Run script multiple times with different YEAR_TARGET for multi-year graphs (RANDOM/MANUAL modes only)


### Tip 5: Recent Activity Continuation
Use RECENT mode to add commits from today backwards without specifying dates manually


### Tip 6: Combining Modes Across Time
- Use MANUAL mode for historical period (e.g., 2023)
- Use RECENT mode to continue from today onwards


## 📄 **License**
MIT License - Free to use and modify


## 👨‍💻 **Contributing**
Contributions welcome!


## ⭐ **Support**
If this helped you, please star the repository! ⭐


---

**Last Updated:** January 2026
**Version:** 2.0 (Added RECENT Mode)