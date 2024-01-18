import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const modalStyle = isOpen ? 'flex' : 'hidden';

  return (
    <div style={{ marginBottom: '-39rem' ,marginRight: '-69rem' }}  className={`fixed  inset-0 z-50 flex items-center justify-center ${modalStyle}`}>
      <div
        onClick={onClose}
        style={{ backgroundColor: 'rgba(9, 0, 0, 0.5)' }}
      ></div>
      <div className="bg-dark p-4 rounded shadow-md">
        <div >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
