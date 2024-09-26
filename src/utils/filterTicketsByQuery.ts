import { Column } from "../types";

export const filterTicketsByQuery = (columns: Column[], query: string) => {
  return columns.map((column) => ({
    ...column,
    tickets: column.tickets.filter((ticket) =>
      ticket.content.toLowerCase().includes(query.toLowerCase())
    ),
  }));
};
