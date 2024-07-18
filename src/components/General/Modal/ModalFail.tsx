import ModalBase from './ModalBase';
import xCircleFill from '@/assets/x-circle-fill.svg';
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
      icon={xCircleFill}
      mainText={`${modalFor} Gagal`}
      text={description}
      redirectInMs={5000}
      redirectTo={redirectTo}
    />
  );
};

export default ModalFail;
