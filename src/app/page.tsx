import { redirect } from "next/navigation";
import { getSettings } from "~/server/user";
import { getServerUserId } from "~/utils/auth";

export default async function Home() {
  const userId = await getServerUserId();
  if (!userId) {
    redirect("/login");
  }

  // Check if settings exists
  const settings = await getSettings(userId);
  if (!settings) {
    // Redirect to setup page
    redirect("/dashboard/setup");
  }

  // Redirect to dashboard
  redirect("/dashboard");
}
