import { lightenColor } from "./ligthenColor";

describe("lightenColor", () => {
  it("should lighten a dark color by 50%", () => {
    const result = lightenColor("#000000", 50);
    expect(result).toBe("#7f7f7f");
  });

  it("should lighten a mid-tone color by 20%", () => {
    const result = lightenColor("#123456", 20);
    expect(result).toBe("#415c77");
  });

  it("should lighten a color by 100% (should return white)", () => {
    const result = lightenColor("#123456", 100);
    expect(result).toBe("#ffffff");
  });

  it("should lighten a white color by any percentage (should stay white)", () => {
    const result = lightenColor("#ffffff", 50);
    expect(result).toBe("#ffffff");
  });
});
