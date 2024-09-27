import { render, screen, fireEvent } from "@testing-library/react";
import TicketEditModal from "./TicketEditModal";

describe("TicketEditModal", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const mockOnContentChange = jest.fn();

  const setup = (isOpen: boolean, content: string = "") => {
    render(
      <TicketEditModal
        isOpen={isOpen}
        title="Edit Ticket"
        content={content}
        onClose={mockOnClose}
        onSave={mockOnSave}
        onContentChange={mockOnContentChange}
        color="blue"
      />
    );
  };

  it("should render modal when isOpen is true", () => {
    setup(true);

    expect(screen.getByText("Edit Ticket")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should not render modal when isOpen is false", () => {
    setup(false);

    expect(screen.queryByText("Edit Ticket")).not.toBeInTheDocument();
  });

  it("should call onClose when Close button is clicked", () => {
    setup(true);

    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call onContentChange when input changes", () => {
    setup(true, "Initial content");

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Updated content" } });

    expect(mockOnContentChange).toHaveBeenCalled();
  });
});
