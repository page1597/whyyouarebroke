import React from "react";
import { Button } from "./button";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

type ModalComponent = React.FC<ModalProps> & {
  Header: React.FC<{ children: React.ReactNode }>;
  Body: React.FC<{ children: React.ReactNode }>;
  Footer: React.FC<{ children: React.ReactNode }>;
  Close: React.FC<{ onClose: () => void }>;
};

const Modal: ModalComponent = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      <div className="fixed rounded left-[50%] top-[50%] z-50 grid w-full max-w-sm md:max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        <div>{children}</div>
      </div>
    </div>
  );
};

const ModalHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mt-5 text-base grid grid-cols-3 text-center rounded text-zinc-700">{children}</div>;
};

const ModalBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="grid grid-cols-302 gap-5 border border-zinc-300 rounded p-8 mt-3">{children}</div>;
};

const ModalFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="text-sm flex flex-col gap-3 mt-3">{children}</div>;
};

const ModalClose: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Button
      id="cancel_order"
      className="bg-transparent text-zinc-900 border border-zinc-800 hover:bg-zinc-100"
      onClick={onClose}
    >
      주문취소
    </Button>
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Close = ModalClose;

export default Modal;
