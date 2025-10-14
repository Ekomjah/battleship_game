import {
  code,
  arr,
  capitalize,
  reverse,
  calculator,
  analyze,
  cipher,
} from "./code.js";

test("correct", () => {
  expect(code(4, 6)).not.toBe(110);
});

test("adds 1 + 2 to equal 3", () => {
  expect(code(1, 2)).toBe(3);
});

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toStrictEqual({ one: 1, two: 2 });
});

test("null", () => {
  const val = 2;
  expect(val).toBeGreaterThan(-7);
  expect(val).toBeLessThan(9);
});

test("if 'stoph'", () => {
  const val = "Christopher";
  expect(val).toMatch(/stopher/);
});

test("contains", () => {
  expect(arr).toContain("diapers");
});

function compileAndroidCode() {
  throw new Error("you are using the wrong JDK!");
}

test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  //   // You can also use a string that must be contained in the error message or a regexp
  //   expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
  //
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  //   // Or you can match an exact error message using a regexp like below
  //   expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
  //   expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});

test("boolean", () => {
  const val = null;
  const str = "me";
  expect(val).toBeDefined();
  expect(val).toBeFalsy();
  expect(str).toMatch(/me/);
});

test("capitalize", () => {
  expect(capitalize("mocha")).toMatch(/^Mocha$/);
  expect(capitalize("singer")).toMatch(/^Singer/);
  expect(capitalize("agent")).toMatch(/^Agent$/);
  expect(capitalize("Moderator")).toMatch(/^Moderator/);
  expect(capitalize("physiotherapy")).toMatch(/^Physiotherapy$/);
  expect(capitalize("mono tonous")).toMatch(/^Mono tonous$/);
});

test("reverseString", () => {
  expect(reverse("hello")).toMatch(/^olleh$/);
  expect(reverse("money")).toMatch(/^yenom$/);
  expect(reverse("Solomon")).toMatch(/^nomoloS$/);
  expect(reverse("timilehin")).toMatch(/^nihelimit$/);
  expect(reverse("Ekomjah")).toMatch(/^hajmokE$/);
});

test("calculator", () => {
  expect(calculator().add(16, 16)).toBe(32);
  expect(calculator().add(5, -15)).toBe(-10);
  expect(calculator().add(3, -3)).toBe(0);
  expect(calculator().add(5, 2)).toBe(7);
  expect(calculator().add(-6, 10)).toBe(4);

  expect(calculator().subtract(10, 6)).toBe(4);
  expect(calculator().subtract(6, 6)).toBe(0);
  expect(calculator().subtract(5, 6)).toBe(-1);
  expect(calculator().subtract(6, 10)).toBe(-4);
  expect(calculator().subtract(85, 64)).toBe(21);

  expect(calculator().multiply(3, 6)).toBe(18);
  expect(calculator().multiply(6, 5)).toBe(30);
  expect(calculator().multiply(11, 11)).toBe(121);
  expect(calculator().multiply(2, 6)).toBe(12);
  expect(calculator().multiply(13, 5)).toBe(65);

  expect(calculator().divide(66, 6)).toBe(11);
  expect(calculator().divide(9, 3)).toBe(3);
  expect(calculator().divide(18, 6)).toBe(3);
  expect(calculator().divide(190, 10)).toBe(19);
  expect(calculator().divide(24, 2)).toBe(12);
});

test("analyzer", () => {
  const object = analyze([1, 8, 3, 4, 2, 6]);
  expect(object).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});

test("cipher", () => {
  expect(cipher("xyz", 3)).toMatch(/^abc$/);
  expect(cipher("HeLLo", 3)).toMatch(/^KhOOr$/);
  expect(cipher("Hello, World!", 3)).toMatch(/^Khoor, Zruog!$/);
});
