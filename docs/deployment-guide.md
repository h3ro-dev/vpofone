# Vercel Deployment Guide for VP of One

This guide provides step-by-step instructions for deploying the VP of One project to Vercel.

## 1. Prerequisites

- A Vercel account.
- The project pushed to a Git repository (GitHub, GitLab, or Bitbucket).

## 2. Configuration Files

This project includes pre-configured files for Vercel:

- **`vercel.json`**: This file at the root of the project tells Vercel how to build the application. It's configured to identify the Next.js app in the `frontend` directory.
- **`.vercelignore`**: This file prevents unnecessary files (like development logs, local environment variables, and `node_modules`) from being uploaded, speeding up deployments.

## 3. Deployment Methods

You can deploy the project using Vercel's Git integration (recommended) or via the Vercel CLI.

### Method A: Git Integration (Recommended)

1.  **Import Project**:
    -   Log in to your Vercel account.
    -   Click on "Add New..." -> "Project".
    -   Select your Git provider and import the repository for this project.

2.  **Configure Project**:
    -   Vercel will automatically detect that you are using Next.js.
    -   **Root Directory**: Ensure the "Root Directory" is set to `frontend`. Vercel will likely detect this, but it's good to confirm. This tells Vercel where your Next.js application code is located.
    -   **Build & Output Settings**: Vercel will automatically configure the build command (`next build`) and output directory. You don't need to change these.
    -   **Environment Variables**: Click on the "Environment Variables" section. Add all the variables from your `frontend/.env.example` file (like `NEXT_PUBLIC_GA_MEASUREMENT_ID`).

3.  **Deploy**:
    -   Click the "Deploy" button. Vercel will start the build process.

    Your site will now be deployed. Future pushes to your main branch will trigger automatic deployments.

### Method B: Vercel CLI

1.  **Install Vercel CLI**:
    ```bash
    npm install -g vercel
    ```

2.  **Login**:
    ```bash
    vercel login
    ```

3.  **Link Project**:
    Navigate to your local project's root directory in your terminal and run:
    ```bash
    vercel link
    ```
    This will link your local repository to a Vercel project. You can create a new one or link to an existing one.

4.  **Deploy**:
    To deploy to a preview environment, run:
    ```bash
    vercel
    ```
    To deploy to production, run:
    ```bash
    vercel --prod
    ```

    Vercel will use `vercel.json` for build instructions. Make sure to set up your environment variables in the Vercel project dashboard.

## 4. Environment Variables

For the application to function correctly, you **must** set the following environment variables in your Vercel project settings:

-   `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Your Google Analytics Measurement ID.
-   `NEXT_PUBLIC_API_URL`: The URL for your backend API.
-   `NEXT_PUBLIC_SITE_URL`: The production URL of your site.
-   ... any other secrets or keys your application needs.

## 5. Verifying Deployment

After a successful deployment, check the following:

-   **Performance**: Run a Lighthouse or PageSpeed Insights report on your Vercel domain to ensure performance optimizations are working.
-   **SEO**: Use browser developer tools to inspect the page `meta` tags and structured data (`<script type="application/ld+json">`).
-   **Analytics**: Check your Google Analytics real-time reports to see if page views are being tracked.
-   **PWA**: Verify that the service worker is active and caching assets in the browser's developer tools (`Application` > `Service Workers`).

Your site is now fully configured for automated deployments on Vercel. 