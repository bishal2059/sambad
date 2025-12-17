import React from "react";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { InitialModal } from "@/components/modals/initial-modal";
import { LandingPage } from "@/components/landing-page";

export default async function SetupPage() {
  const session = await getSession();

  // If not signed in, show landing page
  if (!session?.userId) {
    return <LandingPage />;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: session.userId
    }
  });

  if (!profile) {
    return <LandingPage />;
  }

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (server) return redirect(`/servers/${server.id}`);

  return <InitialModal />;
}
