import styled from "styled-components";
import { lightenColor } from "../../utils/ligthenColor";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalWrapper = styled.div`
  background: white;
  width: 400px;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1001;
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  color: black;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const ModalBody = styled.div`
  width: 100%;
  margin: 16px 0;
`;

export const ModalFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const SaveButton = styled.button<{ disabled: boolean }>`
  padding: 8px 16px;
  color: ${({ disabled }) => (disabled ? "gray" : "black")};
  border: 1px solid gray;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  background-color: ${({ disabled }) => (disabled ? "#f0f0f0" : "white")};
`;

export const CancelButton = styled.button`
  padding: 8px 16px;
  color: black;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export const TicketInput = styled.input<{ color: string; isInvalid: boolean }>`
  width: 100%;
  height: 50%;
  padding: 8px;
  font-size: 20px;
  font-weight: 500;
  border-color: white;
  background-color: ${({ color }) => lightenColor(color, 50)};
  color: white;
  text-align: center;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: white;
    box-shadow: 0 0 4px white;
  }
`;

export const ValidationMessage = styled.div`
  color: red;
  font-size: 15px;
  margin-top: 8px;
  text-align: center;
`;
