# Software Design Document for Salesbricks Order Builder

### 1. Introduction

#### 1.1 Purpose

`This Software Design Document describes the architecture, requirements, tools, data models, risks, possible improvements and implementation approach for Salesbricks Order Builder. This will help the Project Managers, Software Engineers and other people who will be involved in the implementation of the app`

#### 1.2 Scope

- A SaaS product that allows sellers to configure an order for their buyers through the order builder page
- The page will consist of 4 major stages: **Customer Info**, **Product & Plan**, **Contract Terms**, and **Review & Fine-Tune**.
- Hard-coded sample data, no real backend integration yet

#### 1.3 Audience

- Project Managers who will facilitate the development of the application
- Engineers who will be implementing the SDD

---

### 2. System architecture

#### 2.1

FLOWCHART GOES HERE

#### 2.2 Folder Structure

```
├── docs/                           # Document related
│   ├── SDD.md
│   └── SDD.pdf
├── src/                            # Source folder for the application
│   ├── components/                 # Components
│   │   ├── File1.tsx
│   │   └── File2.tsx
│   ├── context/                    # Context for global states
│   │   └── OrderContext.ts
│   ├── hooks/                      # Reusable custom hooks
│   │   ├── useCustomers.ts
│   │   └── useProductLine.ts
│   ├── interfaces/                 # Type shapes and model
│   │   └── customers.ts
│   └── utils/                      # Utility functions
│       └── util1.ts
└── App.tsx                         # Main entry point of the app
```

---

### 3. Technology Stacks

**Language**

- Typescript
- Javascript

**Frameworks & Libraries**

- React JS
- Node JS

**Styling**

- Tailwind CSS
- ShadCN

**State management & Form**

- API Context
- React Hook Form
- Zod

**Data Fetching**

- React Query

**Linting**

- Prettier
- ESLint

---

### 4. Data models

```
interface Customer {
  id: uuid;
  name: string;
  billingAddress: string;
}

interface Product {
  id: string;
  name: string;
  plans: Plan[];
}

interface Plan {
  id: string;
  name: string;
  basePrice: number;
}

interface AddOn {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

interface ContractTerms {
  startDate: string;
  durationMonths: number;
}

interface Order {
  customer: Customer;
  product: Product;
  plan: Plan;
  addOns: AddOn[];
  contract: ContractTerms;
}
```

---

### 5. UI Flow & Wireframes

#### 5.1 Customer Information

- Select a customer account from the dropdown or create a new one if the customer doesn't exist on the data
- Check the `Pre-populate customer information` checkbox to input the customer's address

#### 5.2 Product & Plan

- Select a product line from the dropdown
- Select a plan, the price are already pre-populated but can edit the price of the selected plan

#### 5.3 Contract Terms

- Select a start date from the datepicker
- Select a duration of the contract, duration options are the ff:
  - 6 months
  - 12 months
  - 24 months
  - 36 months
  - Custom
- If `Custom` is selected on the contract dropdown it should show a free text input and they input a **number** of months with the minimum of 1.
- End date should be automatically updated accordingly based on the select contract duration

#### 5.4 Review & Fine-Tune

- **Edit Order Section** (right side of the page)

  - It should show all the information of their order along with the add-ons capability
  - It show show all the available add-ons at the bottom and can edit the quantity with the minimum to **0**, unchecking the add-on will remove the specific add-on from the order
  - More checking and validation before finalizing the order

- **Summary Section** (left side of the page)
  - Unchecking/Removing an add-on on the Edit order section should also reflect on this page as well
  - Left column of the add-on list is the name and the right side is the **_total amount (quantity _ price per unit)\***
  - Below is the **_total price (plan price + all add-ons' total)_**
  - Clicking the **Finalize Order** button will show a success message and will redirect step 1

---

### 6. Validation Rules

**Customer information**

- Name is `required`
- Billing address is `optional`
  **Product & Plan**
- Product line is `required`
- Plan is `required`
  **Contract Terms**
- Start date is `required`
- Contract Period is `required`
- End date is `required` (auto-populated)
  **Review**
- Add-ons are `optional`

---

### 7. Error Handling & Edge Cases

| Possible risk/problem                      |                         Solution                          |
| ------------------------------------------ | :-------------------------------------------------------: |
| User navigates backward                    |             Persist the data to localStorage              |
| User refreshes the page                    |             Persist the data to localStorage              |
| User input an invalid character            |           Sanitize or validate (handled by zod)           |
| User forgot to input some required field/s | Disable the **Next** button or show an error notification |

### 8. Implementation Timeline

| Task                                                            |   Estimate    |
| --------------------------------------------------------------- | :-----------: |
| Setup project, contexts, interfaces, custom hooks               |  **20 mins**  |
| Steps 1-4 development (validations, setup utils, styling, etc.) | **1.5 hours** |
| Manual e2e testing, polish, and optimization                    |  **25 mins**  |

### 9. Assumptions & Future Works

#### 9.1 Assumptions

- No real backend, static JSON data is provided
- Currency is USD accross the app
- No authentication
- Single Page Application (SPA)

#### 9.2 Future Works

- Implement user authentication
- Implement unit testing & e2e testing (_Jest, Playwright or Cypress_)
- Integrate the backend server using **Node JS**, **PostgreSQL**, **Prisma for ORM**
  - Rest API endpoints
    - CUSTOMERS
      - GET `/api/customers`
      - POST/GET `/api/customer`
      - PATCH/PUT `/api/customer/:id`
    - PRODUCTS (includes plan)
      - GET `/api/products`
      - GET/POST `/api/product`
      - PATCH/PUT `/api/product/:id`
    - PLANS
      - GET `/api/plans`
      - GET/POST `/api/plan`
      - PATCH/PUT `/api/plan/:id`
    - ADD-ONS - GET `/api/add-ons` - GET/POST `/api/add-on` - PATCH/PUT `/api/add-on/:id`
      _All endpoints return JSON_

### 10 Non-Functional requirements

- Performance optimization
  - Lazy loading
  - Memoize child components
  - Memoize expensive calculations and functions
  - Debounce input events
  - Map array should have key property
  - Add linter
- Accessibility
  - Use semantic HTML
  - Apply ARIA roles
- Security
  - Communicate through HTTPS only
  - Sanitize inputs
  - Hash passwords
  - Store sensitive information thru `.env`
- Scalability
  - Break large components into smaller ones
  - Store repetitive functions into utility
  - Create custom hooks for reusability
- Deployment
  - Host in Vercel or Netlify
  - Implement CI/CD pipeline for build, lint, test and deployment on each push or merge
