import { composeMiddleware, helpers, Middleware, Status } from "oak";

export function echo_handle(): ReturnType<typeof composeMiddleware> {
  return composeMiddleware([validate_echo_query(), echo_handler()]);
}

function echo_handler(): Middleware {
  return async (context, next) => {
    const query = helpers.getQuery(context);
    context.response.body = query;
    await next();
  };
}

function validate_echo_query(): Middleware {
  return async (context, next) => {
    if (Object.keys(helpers.getQuery(context)).length === 0) {
      context.throw(Status.UnprocessableEntity);
    }
    await next();
  };
}
