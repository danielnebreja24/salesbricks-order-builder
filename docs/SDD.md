# Software Design Document for Salesbricks Order Builder

### Revision History

| Date       | Author         | Change Summary       |
| ---------- | -------------- | -------------------- |
| 2025-08-08 | Daniel Nebreja | Initial draft of SDD |

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

#### 2.2 Folder Structure

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
|   |   |-- terms  /
|   |   |   `-- index.tsx
|   |   `-- workflow.tsx
|   |-- constants/
|   |   `-- constants.ts
|   |-- context/
|   |   `-- order.context.ts
|   |-- hooks/
|   |   `-- order.hooks.ts.ts
|   |-- interfaces/
|   |   `-- models.ts
|   |-- services/
|   |   `-- order.service/ts
|   `-- utils/
|       |-- date.ts
|       |-- formatter.ts
|       `-- math.ts
`-- App.tsx
```

#### 2.3 Deployment

- **Hosting**: Deployed as a static build on Vercel
- **Build command**: `yarn build`
- **Env vars**:
  - `REACT_APP_API_URL` (when integrated later)
- **Preview URLs**:
  - Pull Request previews on Vercel
  - Production: `https://salesbricks-app.vercel.app`

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
- MUI

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
  id: string;
  customer: string;
  street?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface Plan {
  id: string;
  name: string;
  basePrice: number;
}

interface Product {
  id: string;
  name: string;
  plans: Plan[];
}

interface AddOn {
  id: string;
  name: string;
  unitPrice: number;
  quantity?: number;
}

interface ContractTerms {
  startDate: string;    // formatted date string
  endDate: string;      // formatted date string
}

interface Order {
  customer?: Customer;
  product?: Product;
  plan?: Plan;
  addOns: AddOn[];
  contract?: ContractTerms;
}

```

---

### 5. UI Flow & Wireframes

##### Figure 1: Customer Information Stage

- Select a customer account from the dropdown or create a new one if the customer doesn't exist on the data

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 2 25 24 PM" src="https://github.com/user-attachments/assets/57d137ff-7dec-4b7a-8c63-a5056be3f3a6" />

- Check the `Pre-populate customer information` checkbox to input the customer's address

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 2 25 37 PM" src="https://github.com/user-attachments/assets/e65bff69-b422-4242-9696-6a6b5353cca0" />

---

##### Figure 2: Product & Plan Stage

- Select a product line from the dropdown

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 2 25 50 PM" src="https://github.com/user-attachments/assets/fe713f44-5ecf-4684-839f-06600cec1a81" />

- Select a plan, the price are already pre-populated but it should be editable

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 2 26 00 PM" src="https://github.com/user-attachments/assets/ab70ee5f-742c-4177-8f6e-0fd13eff5113" />

- Cicking the Edit button will open a modal and user can edit the price

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 2 26 09 PM" src="https://github.com/user-attachments/assets/a9addd50-477d-4f29-a62c-ce2cd1d6ada9" />

- Clicking `Save` will update the current selected plan

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 2 26 24 PM" src="https://github.com/user-attachments/assets/2cb364f2-8f35-4141-b1a6-9a13e6f3c9a7" />

---

##### Figure 3: Contract Terms Stage

- User can select a Start Date from a datepicker

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 2 26 35 PM" src="https://github.com/user-attachments/assets/3f72ed90-86f9-4735-bed1-f1746a1970f3" />

- User selects a duration:
  - 6 months
  - 12 months
  - 24 months
  - 36 months
  - Custom (reveals a _Number of months input_, minimum 1)
- End date is auto-calculated and read-only.

  - > **Contract Period Options**
    >
    > - `6 months`
    > - `12 months`
    > - `24 months`
    > - `36 months`
    > - `Custom` (user-entered integer ≥ 1)

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 2 26 51 PM" src="https://github.com/user-attachments/assets/b670afa1-e232-4a23-8a60-cce83f5cc575" />

- If `Custom` is selected on the contract dropdown it should show a free text input and they can input a **number** of months with the minimum of 1

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 2 27 02 PM" src="https://github.com/user-attachments/assets/25b490ae-65ca-44ae-8052-06c530371aaf" />

- End date should be automatically updated accordingly based on the selected contract duration or custom input month/s, the field should be read-only

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 2 28 18 PM" src="https://github.com/user-attachments/assets/b7b15c99-e343-44af-957b-351bffd6a5b0" />

---

##### Figure 4: Review & Fine-Tune Stage

###### Figure 4.1: Edit Order Section (right side of the page)

- It should show all the information of their order along with the add-ons capability

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 2 28 45 PM" src="https://github.com/user-attachments/assets/100cd906-ee59-4939-8999-25bd3088a3e4" />

- It should show all the available add-ons at the bottom and can edit the quantity with the minimum to **0**, unchecking the add-on will remove the specific add-on from the order
  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 3 06 59 PM" src="https://github.com/user-attachments/assets/547ab7d0-d2be-47f5-a5b1-d6a65bf05238" />

###### Figure 4.2: Summary Section (left side of the page)

- Unchecking/Removing an add-on on the Edit order section should also reflect on this page as well

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 3 07 56 PM" src="https://github.com/user-attachments/assets/6e8a19b5-a334-4aa3-9de4-b9cf782883d0" />

- Left column of the add-on list is the name and the right side is the _total amount (quantity _ price per unit)

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 3 06 59 PM" src="https://github.com/user-attachments/assets/a2605514-7561-4701-8c9f-93faec427c45" />

- Below is the **total price (plan price + all add-ons' total)**

  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 3 08 08 PM" src="https://github.com/user-attachments/assets/0bbd6a91-317b-4b79-b604-dcdfb8b20218" />

- Clicking the **Finalize Order** button will show a success message and will redirect step 1
  - <img width="1511" height="1273" alt="Screenshot 2025-08-08 at 2 48 02 PM" src="https://github.com/user-attachments/assets/c8b67b34-b3d3-4b94-b6cc-b5eadd5df425" />

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

### 7. Quality Attributes & Edge Cases

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
