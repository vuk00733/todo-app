import { getColumnColor } from "./getColumnColor";

describe("getColumnColor", () => {
  it("should return the correct color for the 'todo' column", () => {
    const color = getColumnColor("todo");
    expect(color).toBe("#1791d6");
  });

  it("should return the correct color for the 'in-progress' column", () => {
    const color = getColumnColor("in-progress");
    expect(color).toBe("#e0285a");
  });

  it("should return the correct color for the 'done' column", () => {
    const color = getColumnColor("done");
    expect(color).toBe("#0f233c");
  });

  it("should return the default color for unknown column IDs", () => {
    const color = getColumnColor("unknown-column");
    expect(color).toBe("#999");
  });
});
