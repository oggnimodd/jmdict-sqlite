import { describe, test, expect } from "bun:test";
import { sayHello } from "../src/hello";

describe("check", () => {
  test("should say hello", () => {
    expect(sayHello()).toBe("hello");
  });
});
