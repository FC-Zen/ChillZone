import React from 'react';
import { ButtonModal, Header } from '@components/atoms';

type ModalHeaderProps = {
  title: string;
  onClose: () => void;
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
}) => {

  return (
    <div className="flex items-center justify-center mb-4">
      <Header title={title}/>
      <ButtonModal onClick={onClose} />
    </div>
  );
};
