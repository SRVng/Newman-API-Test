import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { get_server } from "../src/main.ts";
import { assertEquals } from "https://deno.land/std@0.181.0/testing/asserts.ts";

Deno.test({
  name: "Should return correct value",
  async fn() {
    const request = await superoak(get_server());

    await request.get("/api/echo?foo=bar").expect((res) => {
      assertEquals(res.status, 200);
      assertEquals(res.body, { foo: "bar" });
    });
  },
});

Deno.test({
  name: "Should error 422 with empty query",
  async fn() {
    const request = await superoak(get_server());

    await request.get("/api/echo").expect((res) => {
      assertEquals(res.status, 422);
      assertEquals(res.body, { message: "Invalid HTTP body" });
    });
  },
});
