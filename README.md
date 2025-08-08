# Salesbricks Order Builder

> A React-based SaaS order configuration tool.

## Software Design Document

We’ve created a detailed SDD outlining architecture, data models, UI flows and more.  
You can find it here:  
**`docs/SDD.md`** – covers everything from folder structure to wireframes and CI/CD.

---

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Initial Setup

### 1. **Install dependencies**

#### `yarn install`

### 2. **In the project directory, you can run the app by:**

#### `yarn start`

### 3. **Run the linter**

#### `yarn lint`

### 4. **(Optional) Auto-fix lint issues**

#### `yarn lint`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Folder Structure

```
|-- docs/
|   `-- SDD.md
|-- public/
|   `-- data/
|       |-- addons.json
|       |-- customers.json
|       `-- products.json
|-- src/
|   |-- components/
|   |   |-- customer/
|   |   |   |-- index.tsx
|   |   |   `-- customer-info.tsx
|   |   |-- product/
|   |   |   |-- index.tsx
|   |   |   |-- plans.tsx
|   |   |   `-- edit-price.tsx
|   |   |-- review-order/
|   |   |   |-- index.tsx
|   |   |   |-- order-summary.tsx
|   |   |   `-- add-ons.tsx
|   |   |-- terms/
|   |   |   `-- index.tsx
|   |   `-- workflow.tsx
|   |-- constants/
|   |   `-- constants.ts
|   |-- context/
|   |   `-- order.context.ts
|   |-- hooks/
|   |   `-- order.hooks.ts
|   |-- interfaces/
|   |   `-- models.ts
|   |-- services/
|   |   `-- order.service.ts
|   `-- utils/
|       |-- date.ts
|       |-- formatter.ts
|       `-- math.ts
`-- App.tsx
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
