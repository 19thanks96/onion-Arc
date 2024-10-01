# Movie CRUD Project
This is a full-featured movie management application built with Svelte, allowing users to create, read, update, and delete (CRUD) movies. It leverages modern web technologies for efficient development and testing.

## Tech Stack
 - SvelteKit: Main framework for building the app.
 - Prisma: ORM for database interactions.
 - Playwright: End-to-end testing tool.
 - TailwindCSS: For styling the application.
 - TypeScript: For type safety.
 - Tsyringe: Dependency injection framework.
 - DotLottie: For animation handling.

### Installation and Setup
1. Clone the repository
   bash
   Копіювати код
   git clone <your-repo-url>
   cd project
2. Install dependencies
   Install all dependencies using one of the following package managers:


```
   npm install
   # or
   pnpm install
   # or
   yarn install
```
3. Start the development server
   To start a local development server, run:

```
   npm run dev
   
   # to open the app in your browser:
   npm run dev -- --open
```
4. Build for production
   To build the project for production:



```npm run build```


You can preview the production build with:



```npm run preview```

### Testing

The project uses Playwright for testing CRUD operations with movies. To run the tests:


```npm run test```


### Database Setup
The project uses Prisma for database management. Make sure your database is properly configured and migrations are applied:


```npx prisma migrate dev```

 > - Note: For the Prisma .env file required to configure the database, please contact me directly.

### Main Dependencies
 
 - Prisma: Database management and query handling.

 - Playwright: End-to-end testing framework.

 - SvelteKit: For building the frontend.

 - TailwindCSS: For responsive and modern styling.

 - DotLottie: For managing animations.
### Development
The project supports hot-reloading and modular development, making changes instantly visible in the browser.

For deployment, SvelteKit supports various adapters. Refer to the SvelteKit adapters documentation for environment-specific deployment instructions.

## Thank you
# The End