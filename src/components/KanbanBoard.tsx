import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanColumn from "./KanbanColumn";
import { getColumnColor } from "../utils/getColumnColor";
import { useKanbanColumns } from "../hooks/useKanbanColumns";
import { filterTicketsByQuery } from "../utils/filterTicketsByQuery";

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
      <div className="App">
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
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;

const SearchBarWrapper = styled.div`
  padding: 16px;
  text-align: center;
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
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  @media (max-width: 1200px) {
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
  }
`;
