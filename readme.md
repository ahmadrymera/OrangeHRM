# OrangeHRM Automation Test

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