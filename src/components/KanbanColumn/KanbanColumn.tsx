import React from "react";
import { useDrop } from "react-dnd";
import { Ticket } from "../../types";
import KanbanTicket from "../KanbanTicket/KanbanTicket";
import {
  ColumnContainer,
  ColumnHeader,
  ColumnWrapper,
  HeaderContent,
  TitleWrapper,
  TicketCount,
  TicketList,
  AddTicketButton,
} from "./KanbanColumn.styles";

interface KanbanColumnProps {
  title: string;
  tickets: Ticket[];
  onAddTicket: () => void;
  onDropTicket: (ticketId: string) => void;
  onDeleteTicket: (ticketId: string) => void;
  onUpdateTicket: (ticketId: string, newContent: string) => void;
  columnColor: string;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  tickets,
  onAddTicket,
  onDropTicket,
  onDeleteTicket,
  onUpdateTicket,
  columnColor,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ticket",
    drop: (item: { id: string }) => onDropTicket(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <ColumnContainer>
      <ColumnHeader columnColor={columnColor}>
        <HeaderContent>
          <TitleWrapper>
            <h2>{title}</h2>
            <TicketCount>({tickets.length})</TicketCount>
          </TitleWrapper>
          <AddTicketButton onClick={onAddTicket}>+</AddTicketButton>
        </HeaderContent>
      </ColumnHeader>
      <ColumnWrapper ref={drop} columnColor={columnColor} isOver={isOver}>
        <TicketList>
          {tickets.map((ticket) => (
            <KanbanTicket
              key={ticket.id}
              ticket={ticket}
              onDelete={onDeleteTicket}
              onUpdate={onUpdateTicket}
              color={columnColor}
              showDeleteIcon={title === "To Do"}
            />
          ))}
        </TicketList>
      </ColumnWrapper>
    </ColumnContainer>
  );
};

export default KanbanColumn;
