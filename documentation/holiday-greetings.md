# Holiday greetings

The hero shows a small red-outlined pill next to the location pill during holiday windows. It is driven by the inline script with id `holiday-script` in `index.html`. Nothing needs updating each year.

## Preview any date
Add `?holiday=YYYY-MM-DD` to the URL, for example `?holiday=2026-12-25`.

## Holidays and windows
New Year (Dec 30 to Jan 1), Martin Luther King Jr. Day, Valentines Day, Presidents Day, St. Patricks Day, Easter, Mothers Day, Memorial Day, Juneteenth, Fathers Day, Fourth of July, Labor Day, Halloween, Veterans Day: 3 days before through the day (New Year 2 days before). Thanksgiving: 6 days before. Christmas: Dec 18 through Dec 25. If two windows overlap, the nearest holiday shows.

## Change the wording, add or remove a holiday
Edit the `list(y)` array in the script. Each entry has `key`, `date`, `before` (days ahead it starts) and `text` (70 characters max). Floating dates use `nth(year, month0, weekday0, n)` where n is 1 to 4 or -1 for the last one. Memorial Day and Veterans Day must not say Happy; the gate enforces it.

## Check it
```
node scripts/check-site.mjs holidays
node scripts/audit.mjs holiday https://twomeypcrepair.github.io/dannystowing.net/
```
The first checks the dates against the real calendar for 2026 to 2028. If you add a holiday, update the expected count and dates in `scripts/check-site.mjs`.
