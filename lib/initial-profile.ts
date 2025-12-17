import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const session = await getSession();

  if (!session?.userId) {
    return redirect("/sign-in");
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: session.userId
    }
  });

  if (!profile) {
    return redirect("/sign-in");
  }

  return profile;
};
