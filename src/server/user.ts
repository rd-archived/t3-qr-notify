import type { User, UserSettings } from "@prisma/client";
import { prisma } from "~/utils/db";

export async function getSettings(userId: number) {
  const settings = await prisma.userSettings.findFirst({
    where: {
      userId: userId,
    },
  });
  return settings;
}

export async function updateSettings(
  userId: number,
  settings: Omit<Partial<UserSettings>, "id" | "userId">
) {
  const updatedSettings = await prisma.userSettings.upsert({
    where: {
      userId: userId,
    },
    update: settings,
    create: {
      ...settings,
      userId: userId,
    },
  });
  return updatedSettings;
}
