# OrangeHRM Automation Test

## Test case
https://docs.google.com/spreadsheets/d/1EyXO5QlaWDJFU2R2Xrp3h7uwHiQd47KSYn8FGh5ROq8/edit?usp=sharing

## How to install

1. Clone the repository and navigate to the folder
2. Install the npm dependencies
   ```
   npm install
   ```
---

## How to run

1. run cypress in headless mode
```bash
npx cypress run
```

2. run cypress in headed mode
```bash
npx cypress open
```

3. run only for login test
```bash
npm run test:login
```

4. run only for add user test
```bash
npm run test:add-user
```

5. run all feature file
```bash
npm run test:all
```
