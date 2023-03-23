import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { get_server } from "../src/main.ts";
import { assertEquals } from "https://deno.land/std@0.181.0/testing/asserts.ts";

Deno.test({
  name: "Should return correct value",
  async fn() {
    const request = await superoak(get_server());

    await request.get("/api/health").expect((res) => {
      assertEquals(res.status, 200);
      assertEquals(
        res.text,
        "Server is in health state, Request from 127.0.0.1"
      );
    });
  },
});
