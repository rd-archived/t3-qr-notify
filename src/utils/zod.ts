/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { ZodObject, ZodRawShape, ZodSchema } from "zod";

export function extractEnumValues(schema: ZodObject<any>, param: string) {
  const enumValues = (schema as any).shape[param]._def.values;
  return enumValues as string[];
}
