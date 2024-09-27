import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import KanbanBoard from "./KanbanBoard";
import { useKanbanColumns } from "../../hooks/useKanbanColumns";
import { DndProvider, useDrop, useDrag } from "react-dnd";

jest.mock("react-dnd", () => ({
  DndProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useDrop: jest.fn(),
  useDrag: jest.fn(),
}));

jest.mock("react-dnd-html5-backend", () => ({
  HTML5Backend: jest.fn(),
}));

jest.mock("../../hooks/useKanbanColumns");

describe("KanbanBoard", () => {
  beforeEach(() => {
    (useKanbanColumns as jest.Mock).mockReturnValue({
      columns: [
        { id: 1, title: "To Do", tickets: [{ id: 1, content: "Test Task 1" }] },
        { id: 2, title: "In Progress", tickets: [] },
        { id: 3, title: "Done", tickets: [] },
      ],
      addTicket: jest.fn(),
      updateTicket: jest.fn(),
      deleteTicket: jest.fn(),
      moveTicket: jest.fn(),
    });

    (useDrop as jest.Mock).mockReturnValue([{ isOver: false }, jest.fn()]);
    (useDrag as jest.Mock).mockReturnValue([{ isDragging: false }, jest.fn()]);
  });

  it("should render the Kanban board with columns", () => {
    render(<KanbanBoard />);

    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
  });

  it("should allow searching for tickets", () => {
    render(<KanbanBoard />);

    fireEvent.change(screen.getByPlaceholderText("Search tickets..."), {
      target: { value: "Test Task 1" },
    });

    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
  });
});
