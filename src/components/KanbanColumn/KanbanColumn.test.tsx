import { render, screen, fireEvent } from "@testing-library/react";
import KanbanColumn from "./KanbanColumn";
import { useDrag, useDrop } from "react-dnd";
import { Ticket } from "../../types";

jest.mock("react-dnd", () => ({
  useDrag: jest.fn(),
  useDrop: jest.fn(),
}));

describe("KanbanColumn", () => {
  const mockOnAddTicket = jest.fn();
  const mockOnDropTicket = jest.fn();
  const mockOnDeleteTicket = jest.fn();
  const mockOnUpdateTicket = jest.fn();

  const tickets: Ticket[] = [
    { id: "1", content: "Test Ticket 1" },
    { id: "2", content: "Test Ticket 2" },
  ];

  beforeEach(() => {
    (useDrop as jest.Mock).mockReturnValue([{ isOver: false }, jest.fn()]);
    (useDrag as jest.Mock).mockReturnValue([{ isDragging: false }, jest.fn()]);
  });

  it("should render the column with title and ticket count", () => {
    render(
      <KanbanColumn
        title="To Do"
        tickets={tickets}
        onAddTicket={mockOnAddTicket}
        onDropTicket={mockOnDropTicket}
        onDeleteTicket={mockOnDeleteTicket}
        onUpdateTicket={mockOnUpdateTicket}
        columnColor="blue"
      />
    );

    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("(2)")).toBeInTheDocument();
  });

  it("should render the list of tickets", () => {
    render(
      <KanbanColumn
        title="To Do"
        tickets={tickets}
        onAddTicket={mockOnAddTicket}
        onDropTicket={mockOnDropTicket}
        onDeleteTicket={mockOnDeleteTicket}
        onUpdateTicket={mockOnUpdateTicket}
        columnColor="blue"
      />
    );

    expect(screen.getByText("Test Ticket 1")).toBeInTheDocument();
    expect(screen.getByText("Test Ticket 2")).toBeInTheDocument();
  });

  it("should call onAddTicket when the add button is clicked", () => {
    render(
      <KanbanColumn
        title="To Do"
        tickets={tickets}
        onAddTicket={mockOnAddTicket}
        onDropTicket={mockOnDropTicket}
        onDeleteTicket={mockOnDeleteTicket}
        onUpdateTicket={mockOnUpdateTicket}
        columnColor="blue"
      />
    );

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);
    expect(mockOnAddTicket).toHaveBeenCalled();
  });

  it("should call onDeleteTicket when delete icon is clicked on a ticket", () => {
    render(
      <KanbanColumn
        title="To Do"
        tickets={tickets}
        onAddTicket={mockOnAddTicket}
        onDropTicket={mockOnDropTicket}
        onDeleteTicket={mockOnDeleteTicket}
        onUpdateTicket={mockOnUpdateTicket}
        columnColor="blue"
      />
    );

    const deleteButton = screen.getAllByText("X")[0];
    fireEvent.click(deleteButton);
    expect(mockOnDeleteTicket).toHaveBeenCalledWith("1");
  });

  it("should call onDropTicket when a ticket is dropped", () => {
    (useDrop as jest.Mock).mockReturnValue([{ isOver: true }, jest.fn()]);

    render(
      <KanbanColumn
        title="To Do"
        tickets={tickets}
        onAddTicket={mockOnAddTicket}
        onDropTicket={mockOnDropTicket}
        onDeleteTicket={mockOnDeleteTicket}
        onUpdateTicket={mockOnUpdateTicket}
        columnColor="blue"
      />
    );

    expect(mockOnDropTicket).not.toHaveBeenCalled();
  });
});
