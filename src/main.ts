import { Application } from "oak";
import {
  tracing_request_middleware,
  tracing_timeing_middleware,
  app_router,
  error_catcher_middleware,
} from "./middlewares/mod.ts";

export function get_server(): Application {
  return new Application()
    .use(tracing_request_middleware())
    .use(tracing_timeing_middleware())
    .use(error_catcher_middleware())
    .use(app_router().routes());
}

if (import.meta.main) {
  console.log("Sever is listen at 3000");
  get_server().listen({ port: 3000 });
}
