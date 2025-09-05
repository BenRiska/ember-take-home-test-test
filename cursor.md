# Depreciation Tracker - Do's and Don'ts

## ✅ DO

### Core Requirements
- Build a web app that calculates depreciation for hardcoded assets
- User selects a date, app shows depreciation figures up to that date
- Support straight-line (5-year useful life) and reducing balance (25% annual rate)
- Calculate in-year expense, accumulated depreciation, net book value
- Handle assets not yet purchased (show full value, zero depreciation)

### Technical Approach
- Use Next.js with TypeScript and Tailwind CSS
- Implement daily pro-rata calculations with high precision
- Round only for display (2 decimal places), not during calculations
- Handle leap years and calendar days correctly
- Write tests for calculation accuracy first
- Keep UI simple: date picker + table of assets

### Architecture
- Simple file structure: page.tsx, components folder, lib folder
- Pure functions for depreciation calculations
- Basic useState for date selection
- Clean separation between calculation logic and UI

## ❌ DON'T

### Features
- Don't add database or storage
- Don't add user authentication
- Don't add asset management (add/edit/delete)
- Don't add export/import features
- Don't add multiple currencies
- Don't add complex UI animations

### Technical Over-Engineering
- Don't use complex state management (Redux, Zustand, etc.)
- Don't over-abstract interfaces
- Don't add more calculation methods beyond the two required
- Don't add complex error handling beyond basic validation
- Don't use advanced date picker libraries (keep it simple)

### UI Complexity
- Don't make the interface overly complex
- Don't prioritize UI polish over calculation accuracy
- Don't add unnecessary features not in requirements
- Don't over-style with Tailwind (keep it clean and functional)

---

**Bottom Line**: Build a working depreciation calculator with accurate math and clean UI. Focus on correctness over complexity. Don't add features not in the requirements.
