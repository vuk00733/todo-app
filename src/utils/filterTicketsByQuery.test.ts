import { filterTicketsByQuery } from "./filterTicketsByQuery";
import { Column } from "../types";

describe("filterTicketsByQuery", () => {
  const mockColumns: Column[] = [
    {
      id: "todo",
      title: "To Do",
      tickets: [
        { id: "1", content: "Fix bug in project" },
        { id: "2", content: "Write unit tests" },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tickets: [
        { id: "3", content: "Implement feature" },
        { id: "4", content: "Refactor code" },
      ],
    },
  ];

  it("should return all tickets when query is empty", () => {
    const result = filterTicketsByQuery(mockColumns, "");

    expect(result).toEqual(mockColumns);
  });

  it("should filter tickets based on query", () => {
    const result = filterTicketsByQuery(mockColumns, "feature");

    expect(result[1].tickets).toHaveLength(1);
    expect(result[1].tickets[0].content).toBe("Implement feature");
    expect(result[0].tickets).toHaveLength(0);
  });

  it("should be case-insensitive", () => {
    const result = filterTicketsByQuery(mockColumns, "WRITE");

    expect(result[0].tickets).toHaveLength(1);
    expect(result[0].tickets[0].content).toBe("Write unit tests");
    expect(result[1].tickets).toHaveLength(0);
  });

  it("should return an empty array if no tickets match the query", () => {
    const result = filterTicketsByQuery(mockColumns, "non-existent query");

    expect(result[0].tickets).toHaveLength(0);
    expect(result[1].tickets).toHaveLength(0);
  });
});
