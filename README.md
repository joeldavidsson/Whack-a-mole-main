This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Setting up the prisma database

Start docker desktop.

in CMD or a terminal of your choice:<br />
docker run --name whackdb -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres

- docker/container/exec > psql -U postgres
- docker/container/exec > CREATE DATABASE "whackdb";
- docker/container/exec > \c whackdb
<br /><br />
- vs code terminal > npm i prisma
- vs code terminal > npx prisma init

if there is a prisma folder already you can either delete it and restore it after the npx prisma init or add the .env file manually

DATABASE_URL should look like 'postgresql://postgres:password@localhost:port/databasename?schema=public'

- vs code terminal > npx prisma generate
- vs code terminal > npx prisma db push