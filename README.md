# Fiction Logs (Name subjected to change)

A minimal web-app for storing the film watchlists

Created with :
`Fastify, Next.js, Mantine, TypeScript, Postgres, and Prisma`

## Getting Started

### Create the .env files

for `api/.env`:

```env
DATABASE_URL=postgres://user:password@localhost:5432/database # or whatever your database connection string is
```

for `web/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3100 # or whatever the URL ur api is located at
```

### Run the following commands

NOTE: This project uses NPM Workspaces, so you need to run the following commands in the root directory of the project.

- `npm install` at the root of repository
- use `npm run dev -w web` to start the nextjs frontend dev server
- For REST API server,
  - Make sure you had set the `DATABASE_URL` in the `api/.env` file
  - `npm run generate -w api` to generate the types based on `api/prisma/schema.prisma`
  - if you are using a new empty database, then `npx prisma migrate dev -n create` to create the tables in your database
  - use `npm run dev -w api` to start the fastify backend dev server

### Deploying the project

Currently, Only Supports for direct deploy to Vercel. 
- frontend, make sure to set the Root directory to the `/web` and the env for pointing to your api as shown in the above steps.
- REST API, similarly make sure to set the Root directory to the `/api` and the script `npm run vercel-build` is used for building the project.

## Why ??

I just need a simple way to store the film watchlists. I currently maintain a text file to store the film watchlists which is OK for me till now, but to share it others and to make it more accessible, This does the job. That's a reason why the film names aren't autocompleted while typing.