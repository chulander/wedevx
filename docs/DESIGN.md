# Lead Management System — Design Document

## Overview

The Lead Management System is a web application that supports both public lead submissions and an internal dashboard for lead management. The system is built using Next.js (v15+ with the App Router), Drizzle‑ORM with Turso (SQLite), React, and Tailwind CSS. It leverages both server and client components to provide efficient data fetching, interactive user interfaces, and deep linking of application state (e.g., pagination, filtering, and sorting).

## Technology Stack

- **Next.js (v15+):**
  - _App Router & Server Components:_ Used for data fetching and server-side rendering, enabling SEO-friendly pages and improved performance.
  - _Client Components:_ Handle user interactivity such as forms, dynamic tables, and modals.
- **Drizzle‑ORM & Turso/SQLite:**:

  - Provides a type-safe, minimal ORM layer.
  - Turso/SQLite is used for lightweight, easily deployable data storage.

- **React & Tailwind CSS:**
  - React for building interactive user interfaces.
  - Tailwind CSS for rapid styling and responsive design.
- **Zod:**
  - Schema validation for API requests ensuring data integrity and providing helpful error messages.
- **JWT & bcrypt**:

  - For secure authentication: generating and validating JWTs (access token, id token, refresh token) and hashing passwords.

- **Additional Libraries:**
  - use-debounce: To debounce rapid user input (e.g., search fields).
  - lucide-react: For modern, customizable icons.
  - server-only: Ensure server components are only rendered on the server.

## Architectural Overview

High-Level Architecture Diagram (Textual)

             +----------------------+
             |   Web Browser/Client |
             +----------------------+
                        |
                        v
             +----------------------+
             |     Next.js App      |
             |  (Server & Client)   |
             +----------+-----------+
                        |
                        v
             +----------------------+
             |    API Routes &      |
             |   Server Components  |
             +----------+-----------+
                        |
                        v
             +----------------------+
             |    Drizzle‑ORM &     |
             |    Turso/SQLite      |
             +----------------------+

### Component Interactions

#### Public Lead Submission

- Users access a public form (client component) to submit lead data.
  \_ The form posts data to an API route which validates input using Zod and stores it via Drizzle‑ORM.

#### Internal Dashboard (Admin Panel)

- Server components fetch leads, applying filters (search, status, pagination, sorting) based on URL query parameters.
- Client components (e.g., LeadsTable) display the data, allowing interactive sorting, filtering, and pagination.
- Clicking on a lead navigates to a detailed view rendered by a dynamic route.

#### Authentication

- The users table is dedicated to authentication.
- API routes for sign-in and sign-up use bcrypt for password hashing and JWT for token generation.
- Tokens are stored in HTTP‑only cookies for security.
- Protected routes and actions verify tokens to ensure proper access. 4.

## Key Design Choices

#### Separation of Concerns

##### Client vs. Server Components:

- Server components are used for data fetching and initial page render (improving performance and SEO).
- Client components handle interactive elements like forms, tables, and modals.

##### Data Modeling:

- The system uses normalized tables (e.g., users, visa_applications, visa_category, visa_applications_categories) with enforced foreign key relationships for data integrity.

##### Authentication:

- The authentication process is split into API routes using JWT for stateless authentication.
- Sensitive tokens are stored in HTTP‑only cookies and validated on each request.

#### API & Data Fetching

##### RESTful API Endpoints:

- Dedicated endpoints handle sign-up, sign-in (with JWT issuance), and updates (e.g., PATCH for status updates).

##### Server-Side Pagination, Filtering & Sorting:

- Query parameters (search, status, sort, order, page) are maintained in the URL for deep linking and are used to generate dynamic SQL queries via Drizzle‑ORM.
- This approach minimizes the data fetched and improves scalability.

#### Security & Performance

##### Secure Token Storage:

- JWT tokens are stored in HTTP‑only cookies, and secure flags are conditionally enabled in production.

##### Debouncing:

User inputs (such as search queries) are debounced to prevent excessive API calls and improve performance.

##### Type Safety:

- Drizzle‑ORM and Zod provide strong type safety, reducing runtime errors and ensuring predictable behavior.

## System Components

#### Public Interface

##### Lead Submission Form:

- A client component that validates user input both on the client (immediate feedback) and on the server (via API routes).

##### Authentication Pages:

- Sign-Up and Sign-In pages using controlled components to manage form state and communicate with API routes for token generation and storage.

#### Admin Dashboard

##### Leads List:

- A server component fetches leads data based on URL parameters, while the client component (LeadsTable) provides interactive filtering, sorting (deep-linked), and pagination.

##### Lead Detail View:

- A dynamic route (/dashboard/[id]) that displays detailed information about a selected lead.

##### Status Updates:

- A PATCH endpoint updates a lead's status (e.g., from PENDING to REACHED_OUT), and the UI updates accordingly.

#### Shared Utilities

##### Auth Tools:

- Utility functions for password comparison, JWT token creation, and user retrieval.

##### Constants & Environment Variables:

- Secure configuration using environment variables (e.g., TOKEN_SECRET).

## Future Considerations

##### Testing:

- Write unit and integration tests for key components and endpoints to ensure reliability and reduce regressions.
- Add a git precommit hook to run the linting and testing scripts.

##### Enhanced Security:

- Add middleware to protect the PATCH endpoint
  - Set the **access_token** from the cookie into an Authorization header and verify it before allowing the PATCH request.
- Implement refresh token flow and more granular role-based access control.

##### Scaling & Performance:

- As the dataset grows, consider migrating to a more scalable database solution or adding caching layers.
