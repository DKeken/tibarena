describe("Example Test Suite", () => {
  it("should pass basic arithmetic", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle string concatenation", () => {
    expect("Hello " + "World").toBe("Hello World");
  });

  it("should work with arrays", () => {
    const array = [1, 2, 3];
    expect(array).toHaveLength(3);
    expect(array).toContain(2);
  });
});
