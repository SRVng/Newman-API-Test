import { Middleware } from "oak";

export function health_handle(): Middleware {
  return async (context, next) => {
    context.response.body = `Server is in health state, Request from ${context.request.ip}`;
    await next();
  };
}
