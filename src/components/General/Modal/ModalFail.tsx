import ModalBase from './ModalBase';
import { FC } from 'react';

type ModalFailType = {
  modalFor: string;
  description: string[];
  redirectTo: string;
};

const ModalFail: FC<ModalFailType> = ({
  modalFor,
  description,
  redirectTo,
}) => {
  return (
    <ModalBase
      icon="/images/icons/x-circle-fill.svg"
      mainText={`${modalFor} Gagal`}
      text={description}
      redirectInMs={5000}
      redirectTo={redirectTo}
    />
  );
};

export default ModalFail;
