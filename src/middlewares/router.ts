import { HTTPMethods, Router } from "oak";
import { echo_handle, health_handle } from "../controller/mod.ts";

function public_router(): Router {
  const methods: HTTPMethods[] = ["GET", "OPTIONS", "HEAD"];
  return new Router({ methods })
    .get("/health", health_handle())
    .get("/echo", echo_handle());
}

export function app_router(): Router {
  return new Router({ prefix: "/api" }).use(public_router().routes());
}
