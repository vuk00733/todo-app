import React from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";
import { Ticket } from "../types";
import KanbanTicket from "./KanbanTicket";
import { lightenColor } from "../utils/ligthenColor";

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

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const ColumnWrapper = styled.div<{ columnColor: string; isOver: boolean }>`
  background-color: ${({ columnColor }) => lightenColor(columnColor, 70)};
  width: 300px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
  border: ${({ isOver }) => (isOver ? "2px dashed white" : "none")};
`;

const ColumnHeader = styled.div<{ columnColor: string }>`
  background-color: ${({ columnColor }) => columnColor};
  padding: 16px;
  color: white;
  text-align: center;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  text-align: center;

  h2 {
    margin: 0;
    font-size: 24px;
  }
`;

const TicketCount = styled.div`
  margin-top: 4px;
  font-size: 20px;
  font-weight: bold;
`;

const TicketList = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const AddTicketButton = styled.button`
  color: white;
  border: none;
  padding: 8px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;
