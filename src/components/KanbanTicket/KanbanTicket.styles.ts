import styled from "styled-components";
import { lightenColor } from "../../utils/ligthenColor";

export const DeleteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  cursor: pointer;
  color: white;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    color: red;
  }
`;

export const TicketWrapper = styled.div<{ isDragging: boolean; color: string }>`
  background-color: ${({ color }) => lightenColor(color, 35)};
  width: 150px;
  height: 150px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  color: white;
  font-size: 16px;
  font-weight: bold;
  opacity: ${({ isDragging }) => (isDragging ? 0.7 : 1)};
  transform: ${({ isDragging }) => (isDragging ? "scale(1.15)" : "scale(1)")};
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.15) 4px 4px 4px;
  cursor: grab;

  &:hover ${DeleteIcon} {
    opacity: 1;
  }
`;

export const TicketText = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  text-align: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 500;
  padding: 4px;
`;
