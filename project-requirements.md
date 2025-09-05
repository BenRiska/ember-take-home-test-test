Depreciation is the accounting method of spreading the cost of an asset over its useful life. It is used because assets (like machinery, vehicles, and computers) lose value over time through use, wear and tear, or obsolescence. There are a number of ways of depreciating an asset, but two of the most common are introduced below:

1. **Straight-line depreciation:** The asset loses the same amount of value each year.
    
    *Example: £10,000 asset with a 5 year useful life → £2,000 expense per year.*
    
2. **Reducing balance depreciation:** A fixed percentage is applied to the remaining value each year, so charges are larger early on and smaller later.
    
    *Example: £10,000 asset, 20% depreciation rate → £2,000 in year 1, £1,600 in year 2, £1,280 in year 3, etc.*
    

# Requirements

The goal is to produce a simple web application that displays a hardcoded list of assets and calculates their depreciation figures up to a date supplied by the user.

- Provide an input to select a date.
- For each asset show:
    - Asset name
    - Purchase date
    - Purchase amount
    - Depreciation method
    - Calculated in-year depreciation expense up to and including the selected date
    - Calculated accumulated depreciation up to and including the selected date
    - Calculated net book value as at the end of the selected date
- The straight-line method of depreciation is supported with a useful life of 5 years.
- The reducing balance method of depreciation is supported with a 25% annual depreciation rate.
- Assets not yet purchased as at the selected date should display their full value (i.e. for the zero in-year depreciation expense and accumulated depreciation).

## Technical guidelines

- Target time: ~2 hours.
- Any language, frameworks, or libraries are allowed.
- Use git for version control.
- Write production-quality code and automated tests.
- Prioritise correctness and test coverage over pretty UI or bells and whistles.
- Hardcoding your list of assets (this list is provided in [Appendix A](https://www.notion.so/Take-home-exercise-Depreciation-tracker-261186ac8aa580489379c039c7361366?pvs=21)); There is no need to implement a database or other storage mechanism.
- Use the gherkin tests (provided in [Appendix B](https://www.notion.so/Take-home-exercise-Depreciation-tracker-261186ac8aa580489379c039c7361366?pvs=21)) to verify the correctness of your calculations.
    - It is your choice if you want to implement the gherkin tests as-is or implement more traditional unit tests.
- Use of AI is allowed but be prepared to justify your decisions in the follow-up interview.

## Submission instructions

- Include a README with brief instructions explaining:
    - How to run the app and tests.
    - Any assumptions made or deviations from the requirements.
    - Notes on trade-offs and future work.
- Send the git repository as a zip file by email.

---

# Depreciation calculations

The application must support calculating depreciation using the straight line and reducing balance methods on a daily pro-rata basis using the days in the calendar year.

*Tip*: *Calculate with high precision. Round only for display to 2 decimal places.*

## Straight-line

Useful life: 5 years.

### **To calculate in-year depreciation:**

1. Work out end date of useful life: `endDate = purchaseDate + 5 years - 1 day` (e.g. for laptop purchased on 2020-04-15, it fully depreciates by 2025-04-14)
2. Work out daily depreciation: `dailyDepreciation = purchaseAmount / (endDate - purchaseDate + 1 day)`
3. Calculate the number of days in the period
    1. The period starts on the `purchaseDate`, or current year start, whichever is later
    2. The period ends on the `endDate` , current year end, or the “depreciation up to” date supplied by the user, whichever is sooner (inclusive).
4. Work out the in-year expense: `Number of days in period * dailyDeprecation` (with number of days in period starting on either purchase date or calendar year).

## Reducing balance

Annual depreciation rate: 25 percent.

### **To calculate in-year depreciation:**

1. Calculate the opening net book value:
    - For the purchase year, this is the `purchaseAmount`.
    - For subsequent years, this is the closing net book value from the previous year.
2. Work out the full annual depreciation: `annualDepreciation = openingNetBookValue * 0.25`
3. Calculate the number of days in the period:
    - The period starts on the `purchaseDate` or the current year start, whichever is later.
    - The period ends on the current year end or the “depreciation up to” date supplied by the user, whichever is sooner (inclusive).
4. Work out the in-year expense: `annualDepreciation * (Number of days in period / Number of days in current year`