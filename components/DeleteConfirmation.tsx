// Modal.tsx
import React from 'react';

interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 onConfirm: () => void;
 title: string;
 children: React.ReactNode;
}

const DeleteConfirmation: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
 if (!isOpen) return null;

 return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-dark-background p-4 rounded-lg max-w-lg max-h-full overflow-auto">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        {children}
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Confirm
          </button>
        </div>
      </div>
    </div>
 );
};

export default DeleteConfirmation;
