import { NextApiRequest } from "next";

import { getSessionPages } from "@/lib/auth-pages";
import { db } from "@/lib/db";

export const currentProfilePages = async (req: NextApiRequest) => {
  const session = await getSessionPages(req);

  if (!session?.userId) return null;

  const profile = await db.profile.findUnique({
    where: { userId: session.userId }
  });

  return profile;
};
