import { NextResponse } from "next/server";

/** Single predictable API envelope for every route handler (PROMPT.md §8.2). */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { message: string; code: string; fields?: Record<string, string> };
}

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "INTERNAL_ERROR";

export class ApiError extends Error {
  constructor(
    readonly code: ApiErrorCode,
    message: string,
    readonly status: number,
    readonly fields?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function ok<T>(data: T, status = 200) {
  return NextResponse.json<ApiResponse<T>>({ success: true, data }, { status });
}

export function fail(
  code: ApiErrorCode,
  message: string,
  status: number,
  fields?: Record<string, string>,
) {
  return NextResponse.json<ApiResponse<never>>(
    { success: false, error: { code, message, fields } },
    { status },
  );
}

/** Centralised catch-block handler so error shape and logging stay uniform. */
export function handleApiError(error: unknown, requestId: string) {
  if (error instanceof ApiError) {
    console.warn(
      JSON.stringify({
        level: "warn",
        requestId,
        code: error.code,
        message: error.message,
      }),
    );
    return fail(error.code, error.message, error.status, error.fields);
  }

  console.error(
    JSON.stringify({
      level: "error",
      requestId,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    }),
  );

  return fail(
    "INTERNAL_ERROR",
    "Something went wrong on our side. Please try again.",
    500,
  );
}
