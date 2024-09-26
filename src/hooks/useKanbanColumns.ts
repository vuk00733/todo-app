import { useEffect, useState, useMemo } from "react";
import { Column, Ticket } from "../types";

const LOCAL_STORAGE_KEY = "kanban-columns";
const initialMockData = [
  {
    id: "todo",
    title: "To Do",
    tickets: [{ id: "1", content: "Initial Ticket" }],
  },
  { id: "in-progress", title: "In Progress", tickets: [] as Ticket[] },
  { id: "done", title: "Done", tickets: [] as Ticket[] },
];

export const useKanbanColumns = () => {
  const [columns, setColumns] = useState<Column[]>(() => {
    const savedColumns = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedColumns ? JSON.parse(savedColumns) : initialMockData;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const addTicket = (columnId: string, content = "New Ticket") => {
    const newTicket: Ticket = {
      id: new Date().getTime().toString(),
      content,
    };

    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, tickets: [...column.tickets, newTicket] }
          : column
      )
    );
  };

  const updateTicket = (ticketId: string, newContent: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tickets: column.tickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, content: newContent } : ticket
        ),
      }))
    );
  };

  const deleteTicket = (ticketId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tickets: column.tickets.filter((ticket) => ticket.id !== ticketId),
      }))
    );
  };

  const moveTicket = (ticketId: string, targetColumnId: string) => {
    setColumns((prevColumns) => {
      let draggedTicket: Ticket | undefined;

      const updatedColumns = prevColumns.map((column) => {
        if (column.tickets.some((ticket) => ticket.id === ticketId)) {
          draggedTicket = column.tickets.find(
            (ticket) => ticket.id === ticketId
          );
          return {
            ...column,
            tickets: column.tickets.filter((ticket) => ticket.id !== ticketId),
          };
        }
        return column;
      });

      return updatedColumns.map((column) => {
        if (column.id === targetColumnId && draggedTicket) {
          return { ...column, tickets: [...column.tickets, draggedTicket] };
        }
        return column;
      });
    });
  };

  return { columns, addTicket, updateTicket, deleteTicket, moveTicket };
};
