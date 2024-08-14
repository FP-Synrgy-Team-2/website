import { ButtonPrimary } from '@/components';
import { memo } from 'react';

const NextButton = () => {
  return (
    <ButtonPrimary
      type="submit"
      className="self-center rounded-lg"
      aria-label="Tombol lanjutkan"
    >
      {'Lanjutkan'}
    </ButtonPrimary>
  );
};

export default memo(NextButton);
