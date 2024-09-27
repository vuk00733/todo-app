import { useKanbanColumns } from "./useKanbanColumns";
import { Ticket } from "../types";
import { renderHook, act } from "@testing-library/react";

describe("useKanbanColumns", () => {
  const initialMockData = [
    {
      id: "todo",
      title: "To Do",
      tickets: [{ id: "1", content: "Initial Ticket" }],
    },
    { id: "in-progress", title: "In Progress", tickets: [] as Ticket[] },
    { id: "done", title: "Done", tickets: [] as Ticket[] },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize columns from localStorage if available", () => {
    const savedColumns = JSON.stringify(initialMockData);
    localStorage.setItem("kanban-columns", savedColumns);

    const { result } = renderHook(() => useKanbanColumns());

    expect(result.current.columns).toEqual(initialMockData);
  });

  it("should save columns to localStorage on update", () => {
    const { result } = renderHook(() => useKanbanColumns());

    act(() => {
      result.current.addTicket("todo", "New Task");
    });

    const savedColumns = JSON.parse(localStorage.getItem("kanban-columns")!);
    expect(savedColumns[0].tickets.length).toBe(2);
    expect(savedColumns[0].tickets[1].content).toBe("New Task");
  });

  it("should add a new ticket to the correct column", () => {
    const { result } = renderHook(() => useKanbanColumns());

    act(() => {
      result.current.addTicket("in-progress", "Start new feature");
    });

    expect(result.current.columns[1].tickets.length).toBe(2);
    expect(result.current.columns[1].tickets[1].content).toBe(
      "Start new feature"
    );
  });

  it("should update the ticket content", () => {
    const { result } = renderHook(() => useKanbanColumns());

    act(() => {
      result.current.updateTicket("1", "Updated Ticket");
    });

    expect(result.current.columns[0].tickets[0].content).toBe("Updated Ticket");
  });

  it("should delete a ticket from the correct column", () => {
    const { result } = renderHook(() => useKanbanColumns());

    act(() => {
      result.current.deleteTicket("1");
    });

    expect(result.current.columns[0].tickets.length).toBe(0);
  });

  it("should move a ticket between columns", () => {
    const { result } = renderHook(() => useKanbanColumns());

    act(() => {
      result.current.moveTicket("1", "in-progress");
    });

    expect(result.current.columns[0].tickets.length).toBe(0);
    expect(result.current.columns[1].tickets.length).toBe(2);
    expect(result.current.columns[1].tickets[0].id).toBe("2");
  });
});
