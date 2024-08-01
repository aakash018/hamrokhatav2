import type { Response, Request } from "express";

import _ from "lodash";
import { AppHttpError } from "../../utilities/custom-errors";

export const appErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  ___: unknown
) => {
  if (error && error instanceof AppHttpError) {
    const resPayload: Record<string, unknown> = {
      message: error.message,
      status: error.status,
    };
    if (!_.isEmpty(error.errors)) resPayload.issues = error.errors;

    return res.status(error.status).json(resPayload);
  }

  if (error && error instanceof Error && "message" in error) {
    return res.status(500).json({ status: 500, message: error.message });
  }

  return res
    .status(500)
    .json({ status: 500, message: "Internal server error occurred" });
};
