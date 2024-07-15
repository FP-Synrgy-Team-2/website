import ModalBase from './ModalBase';
import checkCircleFill from '../assets/check-circle-fill.svg';
import { FC } from 'react';

type ModalSuccessType = {
  modalFor: string;
  description: string[];
  redirectTo: string;
};

const ModalSuccess: FC<ModalSuccessType> = ({
  modalFor,
  description,
  redirectTo,
}) => {
  return (
    <ModalBase
      icon={checkCircleFill}
      mainText={`${modalFor} Berhasil`}
      text={description}
      redirectInMs={5000}
      redirectTo={redirectTo}
    />
  );
};

export default ModalSuccess;
