import type { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";
import nc from "next-connect";
import { z, ZodSchema } from "zod";
import { getServerAuthSessionLegacy } from "./auth";
import HttpError from "./errors/httpError";
import ZodError from "./errors/validationError";

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

/**
 * Create api handler using next-connect
 * @see https://www.npmjs.com/package/next-connect
 */
export function createHandler() {
  const handler = nc<
    NextApiRequest & {
      session: Session | null;
      zodValidate: (schema: ZodSchema) => void;
    },
    NextApiResponse
  >({
    onError(error, req, res) {
      if (error instanceof HttpError) {
        res.status(error.code).json({
          success: false,
          error: error.error,
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Internal Server Error",
        });
      }
    },
  });

  // Add session to request
  handler.use(async (req, res, next) => {
    const session = await getServerAuthSessionLegacy({
      req,
      res,
    });
    req.session = session;
    next();
  });

  return handler;
}

export function unauthorizedResponse(res: NextApiResponse) {
  res.status(401).json({
    success: false,
    error: "Unauthorized",
  });
  return;
}
