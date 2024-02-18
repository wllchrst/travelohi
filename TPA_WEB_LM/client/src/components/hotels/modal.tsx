import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div` 
    background-color: ${p => p.theme.primary};
    padding: 20px;
    border-radius: 8px;
    max-width: 800px;
    width: 100%;
`;

const CloseButton = styled.button`
    background: #ccc;
    border: none;
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const Modal = ({ isOpen, onClose, children } : ModalProps) => {
    if (!isOpen) return null;

    return (
        <Overlay>
        <ModalContainer>
            <CloseButton onClick={onClose}>Close</CloseButton>
            {children}
        </ModalContainer>
        </Overlay>
    );
};

export default Modal;
