import type { Prisma, User, UserSettings, Vehicle } from "@prisma/client";
import { prisma } from "~/utils/db";

export async function createVehicle(
  userId: number,
  data: Omit<Prisma.VehicleUncheckedCreateInput, "userId">
) {
  const vehicle = await prisma.vehicle.create({
    data: {
      ...data,
      userId,
    },
  });
  return vehicle;
}

export async function updateVehicle(
  vehicleId: number,
  data: Prisma.VehicleUncheckedUpdateInput
) {
  const vehicle = await prisma.vehicle.update({
    where: {
      id: vehicleId,
    },
    data,
  });
  return vehicle;
}

export async function deleteVehicle(vehicleId: number) {
  const vehicle = await prisma.vehicle.delete({
    where: {
      id: vehicleId,
    },
  });
  return vehicle;
}

export async function getVehicleById(vehicleId: number) {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
  });
  return vehicle;
}

export async function getVehiclesByUserId(userId: number) {
  const vehicles = await prisma.vehicle.findMany({
    where: {
      userId,
    },
  });
  return vehicles;
}

export async function enableVehicleNotifications(vehicleId: number) {
  const vehicle = await prisma.vehicle.update({
    where: {
      id: vehicleId,
    },
    data: {
      notify: true,
    },
  });
  return vehicle;
}

export async function disableVehicleNotifications(vehicleId: number) {
  const vehicle = await prisma.vehicle.update({
    where: {
      id: vehicleId,
    },
    data: {
      notify: false,
    },
  });
  return vehicle;
}
