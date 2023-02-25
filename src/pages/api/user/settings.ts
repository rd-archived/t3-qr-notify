import { z } from "zod";
import { updateSettings } from "~/server/user";
import { createHandler, unauthorizedResponse } from "~/utils/api";
import UnauthorizedError from "~/utils/errors/unauthorizedError";
import ValidationError from "~/utils/errors/validationError";

const handler = createHandler();

export type SettingsPostResponse = {
  success: boolean;
};
handler.post(async (req, res) => {
  if (!req.session) {
    throw new UnauthorizedError();
  }

  const validated = z
    .object({
      phone: z
        .number()
        .refine((v) => String(v).length === 10)
        .transform((v) => String(v)),
      gender: z.enum(["Male", "Female"]),
    })
    .safeParse(req.body);

  if (!validated.success) {
    throw new ValidationError(validated.error);
  }
  const { data } = validated;
  const userId = req.session.user.id;
  const result = await updateSettings(userId, data);

  res.json({
    success: true,
  } satisfies SettingsPostResponse);
});

export default handler;
