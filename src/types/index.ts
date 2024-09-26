export interface Ticket {
  id: string;
  content: string;
}

export interface Column {
  id: string;
  title: string;
  tickets: Ticket[];
}
