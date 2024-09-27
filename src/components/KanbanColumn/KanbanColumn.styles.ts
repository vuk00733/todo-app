import styled from "styled-components";
import { lightenColor } from "../../utils/ligthenColor";

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const ColumnWrapper = styled.div<{
  color: string;
  $isOver: boolean;
}>`
  background-color: ${({ color }) => lightenColor(color, 70)};
  width: 300px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
  border: ${({ $isOver }) => ($isOver ? "2px dashed white" : "none")};
`;

export const ColumnHeader = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: 16px;
  color: white;
  text-align: center;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleWrapper = styled.div`
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

export const TicketCount = styled.div`
  margin-top: 4px;
  font-size: 20px;
  font-weight: bold;
`;

export const TicketList = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

export const AddTicketButton = styled.button`
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
