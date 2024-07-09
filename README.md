# Getting Started with a Demo React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Author

Umer Faiz

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run coverage`

Launches the test runner in the interactive watch mode. and shows the complete report\

### `npm run server`

Launches a json server on prt 5000, can be accessed via [http://localhost:5000](http://localhost:5000).

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Test Coverage

----------------------------|---------|----------|---------|---------|-------------------
File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------------|---------|----------|---------|---------|-------------------
All files                   |   60.24 |    66.66 |   55.55 |   64.38 |                   
 src                        |       0 |      100 |       0 |       0 |                   
  App.tsx                   |       0 |      100 |       0 |       0 | 10-11             
  index.tsx                 |       0 |      100 |     100 |       0 | 6-7               
 src/components/Basket      |     100 |      100 |     100 |     100 | 
  Basket.tsx                |     100 |      100 |     100 |     100 | 
 src/components/NavBar      |     100 |      100 |     100 |     100 | 
  NavBar.tsx                |     100 |      100 |     100 |     100 | 
 src/components/ProductList |   83.33 |     87.5 |   66.66 |   83.33 | 
  ProductList.tsx           |   83.33 |     87.5 |   66.66 |   83.33 | 21
 src/hooks                  |       8 |        0 |       0 |      10 | 
  useBasket.ts              |    7.69 |      100 |       0 |    9.09 | 5-21
  useProducts.ts            |    8.33 |        0 |       0 |   11.11 | 6-17
 src/store                  |      80 |      100 |       0 |     100 | 
  hooks.ts                  |   66.66 |      100 |       0 |     100 | 
  index.ts                  |     100 |      100 |     100 |     100 | 
 src/store/basketSlice      |    90.9 |       50 |   88.88 |   94.44 | 
  basketSlice.ts            |    90.9 |       50 |   88.88 |   94.44 | 38
 src/store/productSlice     |   81.81 |       50 |      80 |   81.81 | 
  productsSlice.ts          |   81.81 |       50 |      80 |   81.81 | 25-26
----------------------------|---------|----------|---------|---------|-------------------