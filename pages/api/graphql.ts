import { createServer } from "@graphql-yoga/node";
import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { Resolvers } from "../../generates/graphql";
import { prisma } from "../../lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const resolvers: Resolvers = {
  Query: {
    posts: async (parent, args, {}) => {
      return await prisma.post.findMany({ select: { id: true, title: true } });
    },
  },
};

export default createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  endpoint: "/api/graphql",
  logging: true,
  schema: {
    typeDefs: readFileSync(join(process.cwd(), "schema.graphql"), "utf-8"),
    resolvers,
  },
});
