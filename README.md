# Prisma + SQLite + GraphQL + Codesandbox test

```bash
npx create-next-app --ts test
yarn add prisma -D
npx prisma init
npx prisma migrate dev --name init
yarn add @prisma/client
```

https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem

```ts
import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
```

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./test.db"
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  createdAt DateTime @default(now())
  content   String?
  published Boolean  @default(false)
}
```
