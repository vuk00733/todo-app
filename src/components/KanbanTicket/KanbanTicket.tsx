import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { Ticket } from "../../types";
import TicketEditModal from "../TicketEditModal/TicketEditModal";
import { TicketWrapper, TicketText, DeleteIcon } from "./KanbanTicket.styles";

interface KanbanTicketProps {
  ticket: Ticket;
  onDelete: (ticketId: string) => void;
  onUpdate: (ticketId: string, newContent: string) => void;
  color: string;
  showDeleteIcon: boolean;
}

const KanbanTicket: React.FC<KanbanTicketProps> = ({
  ticket,
  onDelete,
  onUpdate,
  color,
  showDeleteIcon,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(ticket.content);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "ticket",
      item: { id: ticket.id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [ticket.id]
  );

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    onDelete(ticket.id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    onUpdate(ticket.id, content);
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setContent(ticket.content);
  };

  return (
    <>
      <TicketWrapper ref={drag} $isDragging={isDragging} color={color}>
        <TicketText onDoubleClick={handleDoubleClick}>
          {ticket.content}
        </TicketText>
        {showDeleteIcon && <DeleteIcon onClick={handleDelete}>X</DeleteIcon>}
      </TicketWrapper>

      <TicketEditModal
        isOpen={isEditing}
        title="Edit Ticket"
        content={content}
        onClose={handleCloseModal}
        onSave={handleSave}
        onContentChange={handleInputChange}
        color={color}
      />
    </>
  );
};

export default KanbanTicket;
