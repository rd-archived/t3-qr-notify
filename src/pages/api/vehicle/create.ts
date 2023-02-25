import type { Vehicle } from "@prisma/client";
import { z } from "zod";
import { updateSettings } from "~/server/user";
import { createVehicle } from "~/server/vehicle";
import { createHandler, unauthorizedResponse } from "~/utils/api";
import UnauthorizedError from "~/utils/errors/unauthorizedError";
import ValidationError from "~/utils/errors/validationError";

const handler = createHandler();

export type VehicleCreateResponse = {
  success: boolean;
  vehicle: Vehicle | null;
};
handler.post(async (req, res) => {
  if (!req.session) {
    throw new UnauthorizedError();
  }

  const validated = z
    .object({
      title: z.string().min(3).max(100),
      vehicleNo: z
        .string()
        .length(10)
        .transform((val) => val.toUpperCase()),
      type: z.enum(["Car", "Bike"]),
    })
    .safeParse(req.body);

  if (!validated.success) {
    throw new ValidationError(validated.error);
  }
  const { data } = validated;
  const userId = req.session.user.id;
  const vehicle = await createVehicle(userId, data);

  res.json({
    success: true,
    vehicle,
  } satisfies VehicleCreateResponse);
});

export default handler;
