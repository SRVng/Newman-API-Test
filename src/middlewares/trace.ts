import { Middleware } from "oak";

export function tracing_request_middleware(): Middleware {
  return async (context, next) => {
    await next();

    const method = context.request.method;
    const request_url = context.request.url;
    const response_time = context.response.headers.get("X-Response-Time");
    console.log(`[${method}] ${request_url}-${response_time}`);
  };
}

export function tracing_timeing_middleware(): Middleware {
  return async (context, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    context.response.headers.set("X-Response-Time", `${ms}ms`);
  };
}
