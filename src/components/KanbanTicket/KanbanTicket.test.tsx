import { render, screen, fireEvent } from "@testing-library/react";
import KanbanTicket from "./KanbanTicket";
import { useDrag } from "react-dnd";
import { Ticket } from "../../types";

jest.mock("react-dnd", () => ({
  useDrag: jest.fn(),
}));

describe("KanbanTicket", () => {
  const mockOnDelete = jest.fn();
  const mockOnUpdate = jest.fn();

  const ticket: Ticket = {
    id: "1",
    content: "Test Ticket",
  };

  beforeEach(() => {
    (useDrag as jest.Mock).mockReturnValue([{ isDragging: false }, jest.fn()]);
  });

  it("should render the ticket content", () => {
    render(
      <KanbanTicket
        ticket={ticket}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        color="blue"
        showDeleteIcon={true}
      />
    );

    expect(screen.getByText("Test Ticket")).toBeInTheDocument();
  });

  it("should show the delete icon and call onDelete when clicked", () => {
    render(
      <KanbanTicket
        ticket={ticket}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        color="blue"
        showDeleteIcon={true}
      />
    );

    const deleteIcon = screen.getByText("X");
    fireEvent.click(deleteIcon);
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("should open the edit modal when double-clicked and update ticket", () => {
    render(
      <KanbanTicket
        ticket={ticket}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        color="blue"
        showDeleteIcon={true}
      />
    );

    const ticketText = screen.getByText("Test Ticket");
    fireEvent.doubleClick(ticketText);

    expect(screen.getByText("Edit Ticket")).toBeInTheDocument();

    const input = screen.getByDisplayValue("Test Ticket");
    fireEvent.change(input, { target: { value: "Updated Ticket" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockOnUpdate).toHaveBeenCalledWith("1", "Updated Ticket");
  });

  it("should cancel the edit and close the modal without updating", () => {
    render(
      <KanbanTicket
        ticket={ticket}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        color="blue"
        showDeleteIcon={true}
      />
    );

    const ticketText = screen.getByText("Test Ticket");
    fireEvent.doubleClick(ticketText);

    expect(screen.getByText("Edit Ticket")).toBeInTheDocument();

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(screen.queryByText("Edit Ticket")).not.toBeInTheDocument();
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });
});
