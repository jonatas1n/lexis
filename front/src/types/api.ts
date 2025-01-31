export type ApiError = {
  info?: Record<string, unknown>;
  status: number;
  message?: string;
};