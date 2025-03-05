# Wedevx: Alma-LegalTech

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

#### Test Deployed App [here](https://wedevx-sigma.vercel.app/visa-applications)

- For **/dashboard** access:
  email: admin@test.com
  password: test123

#### Design Document [here](docs/DESIGN.md)

### Installation

1. **Ensure Node.js 20+ is installed.**

   - [Download Node.js](https://nodejs.org) if it’s not already installed.

2. **Clone the repository:**

   ```bash
   git@github.com:chulander/wedevx.git
   ```

3. **Install dependencies:**
   ```bash
   cd wedevx
   npm install
   ```
4. **Set up a Turso database (FREE):**

- Sign up at Turso and [create a database](https://docs.turso.tech/quickstart).
- Generate an access token for your Turso database.

  ```bash
  turso db tokens create <database-name>
  ```

- Get the connection URL for your database.
  ```bash
  turso db connect <database-name>
  ```

5. **Create a .env file:**
   ```bash
   touch .env
   ```

- Add the following environment variables to your .env file:
  ```bash
   TOKEN_SECRET=
   TURSO_CONNECTION_URL=
   TURSO_AUTH_TOKEN=
  ```

6. **Run database scripts in this order:**

- Generate the database schema
  ```bash
  npm run db:generate
  ```
- Migrate the database schema

  ```bash
  npm run db:migrate
  ```

- Seed the static data

  ```bash
  npm run db:seed
  ```

- **OPTIONAL:** Seed test applications

  ```bash
  npm run db:seed:applications
  ```

7. **Start the development server:**

   ```bash
    npm run dev
   ```

8. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**
