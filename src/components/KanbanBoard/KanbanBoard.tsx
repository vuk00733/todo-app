import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import { getColumnColor } from "../../utils/getColumnColor";
import { useKanbanColumns } from "../../hooks/useKanbanColumns";
import { filterTicketsByQuery } from "../../utils/filterTicketsByQuery";

const KanbanBoard: React.FC = () => {
  const { columns, addTicket, updateTicket, deleteTicket, moveTicket } =
    useKanbanColumns();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredColumns = useMemo(
    () => filterTicketsByQuery(columns, searchQuery),
    [columns, searchQuery]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <BoardWrapper>
        <SearchBarWrapper>
          <SearchInput
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </SearchBarWrapper>
        <ColumnsWrapper>
          {filteredColumns.map((column) => (
            <KanbanColumn
              key={column.id}
              title={column.title}
              tickets={column.tickets}
              onAddTicket={() => addTicket(column.id)}
              onDropTicket={(ticketId) => moveTicket(ticketId, column.id)}
              columnColor={getColumnColor(column.id)}
              onDeleteTicket={deleteTicket}
              onUpdateTicket={updateTicket}
            />
          ))}
        </ColumnsWrapper>
      </BoardWrapper>
    </DndProvider>
  );
};

export default KanbanBoard;

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  padding: 20px;
`;

const SearchBarWrapper = styled.div`
  padding: 16px;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 8px;
  font-size: 1em;
`;

const ColumnsWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  padding: 16px;

  @media (max-width: 992px) {
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;
