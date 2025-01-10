# PictoPicto Client
This is the client-side application for a project aimed at enhancing communication through pictograms. 
Designed exclusively for healthcare professionals, the app allows users to monitor patient progress and customize pictogram sets. 
A guest mode is also available for non-professionals to explore the app freely.

The current version is a modernized rewrite of a previous application built with [`Symfony 5`](https://github.com/ShilkovKonst/PictoPictoV2-Symfony5) .

## Technologies Used
### Frameworks: 
- Next.js
### Styling: 
- Tailwind CSS with Flowbite plugin
### Utilities:
- js-cookie for managing cookies
- jwt-decode for decoding JSON Web Tokens

## Project Structure
The project follows a modular and organized structure:
- src/_assets: Media assets like images and icons
- src/_components: Reusable UI components
- src/_constants: Constants used throughout the application
- src/_lib: Utility functions and helpers
- src/app: The Next.js folder-based routing system for handling pages and APIs
For more information on Next.js routing, visit the [`official documentation`](https://nextjs.org/docs/14/getting-started/project-structure).

## Getting Started on local machine
First, create *.env.local* file with 
```bash
SERVER_BASE_URL=http://localhost:8080/api/gateway
NEXT_PUBLIC_CLIENT_API_BASE_URL=http://localhost:3000
REVALIDATE=0
```
This project works only when [`application server`](https://gitlab.com/ShilkovKonst/picto_microservices_spring/-/tree/konstantin) is up and running!

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
