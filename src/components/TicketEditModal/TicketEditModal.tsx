import React, { useState } from "react";
import styled from "styled-components";
import { lightenColor } from "../../utils/ligthenColor";

interface ModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onSave: () => void;
  onContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color: string;
}

const TicketEditModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  content,
  onClose,
  onSave,
  onContentChange,
  color,
}) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleSave = () => {
    if (content.trim()) {
      onSave();
    } else {
      setIsTouched(true);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <ModalBody>
          <TicketInput
            value={content}
            color={color}
            onChange={(e) => {
              setIsTouched(true);
              onContentChange(e);
            }}
            isInvalid={isTouched && !content.trim()}
          />
          {isTouched && !content.trim() && (
            <ValidationMessage>
              Ticket content cannot be empty.
            </ValidationMessage>
          )}
        </ModalBody>
        <ModalFooter>
          <SaveButton onClick={handleSave} disabled={!content.trim()}>
            Save
          </SaveButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ModalFooter>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default TicketEditModal;

const ModalOverlay = styled.div`
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

const ModalWrapper = styled.div`
  background: white;
  width: 400px;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1001;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: black;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ModalBody = styled.div`
  width: 100%;
  margin: 16px 0;
`;

const ModalFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const SaveButton = styled.button<{ disabled: boolean }>`
  padding: 8px 16px;
  color: ${({ disabled }) => (disabled ? "gray" : "black")};
  border: 1px solid gray;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  background-color: ${({ disabled }) => (disabled ? "#f0f0f0" : "white")};
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  color: black;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const TicketInput = styled.input<{ color: string; isInvalid: boolean }>`
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

const ValidationMessage = styled.div`
  color: red;
  font-size: 15px;
  margin-top: 8px;
  text-align: center;
`;
