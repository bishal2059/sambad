import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const currentProfile = async () => {
  const session = await getSession();

  if (!session?.userId) return null;

  const profile = await db.profile.findUnique({
    where: { userId: session.userId }
  });

  return profile;
};
