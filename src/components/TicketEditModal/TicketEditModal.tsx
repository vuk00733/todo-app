import React, { useState } from "react";
import {
  ModalOverlay,
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalFooter,
  SaveButton,
  CancelButton,
  TicketInput,
  ValidationMessage,
} from "./TicketEditModal.styles";

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
