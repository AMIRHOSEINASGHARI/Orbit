import { afterEach, expect, it, vi } from "vitest";

vi.mock("mongoose", () => ({ default: { connect: vi.fn() } }));

afterEach(() => {
  delete globalThis.mongooseCache;
  vi.resetModules();
});

it("reuses the in-flight MongoDB connection", async () => {
  process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/orbit";
  const mongoose = await import("mongoose");
  const instance = mongoose.default;
  vi.mocked(instance.connect).mockResolvedValue(instance);
  const { connectToDatabase } = await import("@/lib/db/mongoose");

  const [first, second] = await Promise.all([
    connectToDatabase(),
    connectToDatabase(),
  ]);

  expect(instance.connect).toHaveBeenCalledTimes(1);
  expect(first).toBe(instance);
  expect(second).toBe(instance);
});
