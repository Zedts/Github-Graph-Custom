# 🚀 **Github-Graph-Custom**

> **Generate custom GitHub contribution graphs** with precise control over dates, patterns, and commit frequency!

## ✨ **Features**
- 🎯 **Dual Mode**: Random scatter OR Linear sequential commits
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
YEAR_TARGET = 2023        // Target year (2023, 2024, 2025, etc)
COMMIT_PER_DAY = 3        // How many commits per day (1-10 recommended)
TOTAL_DAYS = 365          // How many days to fill (max 365)
```

### Mode Selection (Choose ONE)
```javascript
const USE_RANDOM = true;   // Random scatter pattern
const USE_MANUAL = false;  // Comment this for RANDOM mode
```

OR

```javascript
const USE_RANDOM = false;  // Comment this for MANUAL mode
const USE_MANUAL = true;   // Linear sequential dates
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

## 🎮 **Mode Comparison**

| Feature | RANDOM | MANUAL |
|---------|--------|--------|
| **Pattern** | Scattered across date range | Linear sequential from start date |
| **Use Case** | Natural-looking contributions | Fill specific date range continuously |
| **Config** | Set week/day range | Set start week/day |
| **Best For** | Realistic activity patterns | Completing activity streaks |

## 📋 **Config Examples**

### Example 1: RANDOM MODE
```javascript
const YEAR_TARGET = 2024;
const COMMIT_PER_DAY = 2;
const TOTAL_DAYS = 250; // ~50 weeks

const USE_RANDOM = true;
const USE_MANUAL = false;

const RANDOM_WEEK_MIN = 0;
const RANDOM_WEEK_MAX = 52;
const RANDOM_DAY_MIN = 0;    // Monday
const RANDOM_DAY_MAX = 6;    // Sunday
```

### Example 2: MANUAL MODE
```javascript
const YEAR_TARGET = 2023;
const COMMIT_PER_DAY = 3;
const TOTAL_DAYS = 365; // Full year

const USE_RANDOM = false;
const USE_MANUAL = true;

const MANUAL_WEEK = 1;   // Start from week 1
const MANUAL_DAY = 0;    // Start from Monday
```

## 📁 **File Structure**
```
Github-Graph-Custom/
├── 📄 index.js          # Main logic (don't edit, all logic goes here, nothing to worry about in this file)
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
# or use VS Code, Sublime, etc
```

### Step 2: Execute
```bash
node index.js
```

### Step 3: Watch Output
```
🚀 GITHUB COMMIT GENERATOR
==================================================
📆 Year: 2023
📊 365 hari × 3 commits = 1095 commits
🎮 Mode: RANDOM
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
  "mode": "random",
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
- Prevents dual mode activation
- Requires at least one mode enabled
- Validates week/day ranges
- Checks year validity

## 🐛 **Troubleshooting**

### Error: "ONLY 1 MODE"
```
❌ Problem: Both USE_RANDOM and USE_MANUAL are true
✅ Solution: Set one to false in config.js
```

### Error: "CHOSE ATLEAST 1 MODE"
```
❌ Problem: Both modes are false or commented
✅ Solution: Set USE_RANDOM = true OR USE_MANUAL = true
```

### Error: "Module not found"
```
❌ Problem: Dependencies not installed
✅ Solution: Run npm install
```

### Error: "Git push failed"
```
❌ Problem: GitHub credentials not set
✅ Solution: Configure git credentials or add remote
```

### No contributions showing on GitHub
```
❌ Problem: Commits use wrong date format
✅ Solution: Check git config user.name and user.email
```

## 🔍 **How It Works**

1. **Read Config** → Load `config.js` settings
2. **Calculate Dates** → Based on mode (RANDOM or MANUAL)
3. **Generate Commits** → Create commits with custom dates
4. **Write Data** → Update `data.json` file
5. **Git Add** → Stage changes
6. **Git Commit** → Commit with backdated timestamps
7. **Git Push** → Push to remote repository

### RANDOM Mode Flow
```
Random Week (0-52) + Random Day (0-6) 
→ Calculate date 
→ Repeat TOTAL_DAYS times
→ Each iteration generates new random date
```

### MANUAL Mode Flow
```
Week 1, Day 3 
→ Linear add TOTAL_DAYS days 
→ Day 1 = Week1Day3 + 0 days
→ Day 2 = Week1Day3 + 1 day
→ Day 3 = Week1Day3 + 2 days
→ ... continues sequentially
```

## 📈 **Examples Output**

### Scenario: Fill Q1 2024
```javascript
YEAR_TARGET = 2024;
TOTAL_DAYS = 90;  // Q1
USE_RANDOM = true;
RANDOM_WEEK_MIN = 0;   // Jan 1
RANDOM_WEEK_MAX = 13;  // Mar 31
RANDOM_DAY_MIN = 0;
RANDOM_DAY_MAX = 6;
```

### Scenario: Perfect Streak 365 Days
```javascript
YEAR_TARGET = 2023;
TOTAL_DAYS = 365;
USE_MANUAL = true;
MANUAL_WEEK = 1;
MANUAL_DAY = 0;
COMMIT_PER_DAY = 1;
```

## 💡 **Tips & Tricks**

### Tip 1: Different Patterns
Adjust `RANDOM_WEEK_MIN` and `RANDOM_WEEK_MAX` for different seasons

### Tip 2: Sparse vs Dense
- Increase `TOTAL_DAYS` for denser graph
- Increase `COMMIT_PER_DAY` for more visible contributions

### Tip 3: Realistic Activity
- Use `RANDOM_DAY_MIN = 0, RANDOM_DAY_MAX = 4` for workday pattern
- Use `RANDOM_DAY_MIN = 5, RANDOM_DAY_MAX = 6` for weekend activity

### Tip 4: Multiple Runs
Run script multiple times with different YEAR_TARGET for multi-year graphs

## 📄 **License**
MIT License - Free to use and modify

## 👨‍💻 **Contributing**
Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## ⭐ **Support**
If this helped you, please star the repository! ⭐

---
