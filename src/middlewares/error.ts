import { isHttpError, type Middleware, Status } from "oak";

export function error_catcher_middleware(): Middleware {
  return async (context, next) => {
    try {
      await next();
    } catch (error) {
      if (isHttpError(error)) {
        switch (error.status) {
          case Status.NotFound:
            context.response.body = {
              message: `${context.request.url} Not found`,
            };
            break;
          case Status.UnprocessableEntity:
            context.response.status = Status.UnprocessableEntity;
            context.response.body = {
              message: "Invalid HTTP body",
            };
            break;
          default:
            context.response.body = {
              message: "Internal Server Error",
              error: error,
            };
        }
      } else {
        throw error;
      }
    }
  };
}
