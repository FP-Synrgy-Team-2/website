import { FC, memo } from 'react';
import { FieldError } from 'react-hook-form';

type TextFieldErrorMsgProps = {
  fieldError: FieldError;
};

const TextFieldErrorMsg: FC<TextFieldErrorMsgProps> = ({ fieldError }) => {
  return (
    <p className="text-sm leading-8 text-danger" role="alert">
      {fieldError.message}
    </p>
  );
};

export default memo(TextFieldErrorMsg);
