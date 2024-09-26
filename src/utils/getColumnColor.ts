export const getColumnColor = (columnId: string) => {
  switch (columnId) {
    case "todo":
      return "#1791d6";
    case "in-progress":
      return "#e0285a";
    case "done":
      return "#0f233c";
    default:
      return "#999";
  }
};
