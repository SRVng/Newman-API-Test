import { Status, testing } from "oak";
import { echo_handle } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.180.0/testing/asserts.ts";

Deno.test({
  name: "Should pass the validation",
  async fn() {
    const ctx = testing.createMockContext({
      path: "?foo=bar",
    });

    const next = testing.createMockNext();

    await echo_handle()(ctx, next);

    assertEquals(ctx.response.body, { foo: "bar" });
  },
});

Deno.test({
  name: "Should failed the validation",
  async fn() {
    const ctx = testing.createMockContext({
      path: "",
    });

    const next = testing.createMockNext();

    try {
      await echo_handle()(ctx, next);
    } catch (error) {
      assertEquals(error.status, Status.UnprocessableEntity);
    }
  },
});
