# 🚀 **Github-Graph-Custom**

> **Generate custom GitHub contribution graphs** with precise control over dates, patterns, and commit frequency!

## ✨ **Features**
- 🎯 **Triple Mode**: Random scatter, Linear sequential, or Recent backdating
- 📅 **Any Year**: Target specific years or use relative recent dates
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
YEAR_TARGET = 2023        // Target year (Ignored in RECENT mode)
COMMIT_PER_DAY = 3        // How many commits per day (1-10 recommended)
TOTAL_DAYS = 365          // How many days to fill (max 365)
```

### Mode Selection (Choose ONE)
Set exactly one of these to `true`.

```javascript
const USE_RANDOM = true;   // Random scatter pattern
const USE_MANUAL = false;  // Linear sequential dates
const USE_RECENT = false;  // Backdate from today
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
RECENT_DAYS_OFFSET = 0    // 0 = Start from today, 1 = Start from yesterday, etc.
```

## 🎮 **Mode Comparison**

| Feature | RANDOM | MANUAL | RECENT |
|---------|--------|--------|--------|
| **Pattern** | Scattered across date range | Linear sequential from start date | Linear sequential counting back from today |
| **Use Case** | Natural-looking contributions | Fill specific date range continuously | Fill gaps in recent history or maintain streaks |
| **Config** | Set week/day range | Set start week/day | Set offset from today |
| **Best For** | Realistic activity patterns | Completing activity streaks | Quick "I forgot to commit" fixes |

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
const COMMIT_PER_DAY = 5;
const TOTAL_DAYS = 7;     // Fill the last week

const USE_RANDOM = false;
const USE_MANUAL = false;
const USE_RECENT = true;

const RECENT_DAYS_OFFSET = 0; // End today
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
🕒 RECENT - Day:1/7, Offset:0, Date:2024-01-20 (Saturday)
📊 Processing day 1/7...
  2024-01-20 08:23:45 (batch 1/5)
  ...

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

## ⚠️ **Important Notes**

### ✅ Safe & Recommended
- Works on any repository (new or existing)
- Only modifies `data.json` file
- Preserves all existing commits
- Git history remains intact

### 🛡️ Validation Features
- Prevents multiple modes activation
- Requires at least one mode enabled
- Validates configuration

## 🐛 **Troubleshooting**

### Error: "ONLY 1 MODE"
```
❌ Problem: More than one mode (USE_RANDOM, USE_MANUAL, USE_RECENT) is true
✅ Solution: Set only one to true in config.js
```

### Error: "CHOOSE AT LEAST 1 MODE"
```
❌ Problem: All modes are false
✅ Solution: Set one of the modes to true
```

## 🔍 **How It Works**

### RANDOM Mode Flow
```
Random Week (0-52) + Random Day (0-6) 
→ Calculate date 
→ Repeat TOTAL_DAYS times
```

### MANUAL Mode Flow
```
Week 1, Day 3 
→ Linear add TOTAL_DAYS days 
→ Sequential generation
```

### RECENT Mode Flow
```
Today - Offset - (Total Days - n)
→ Generates dates counting up to Today (minus offset)
```

## 📄 **License**
MIT License - Free to use and modify

## 👨‍💻 **Contributing**
Contributions welcome!

## ⭐ **Support**
If this helped you, please star the repository! ⭐

---
