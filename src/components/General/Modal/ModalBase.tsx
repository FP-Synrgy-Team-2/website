import { FC, useEffect, ReactNode, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

type ModalBaseProps = {
  mainText: string | ReactNode;
  text: string[];
  icon?: string;
  redirectTo?: string;
  redirectInMs?: number;
};

const ModalBase: FC<ModalBaseProps> = ({
  mainText,
  text,
  icon,
  redirectTo,
  redirectInMs,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectTo && redirectInMs)
      setTimeout(() => navigate(redirectTo), redirectInMs);
  }, [navigate, redirectTo, redirectInMs]);

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <dialog className="fixed inset-0 flex flex-col items-center justify-center gap-5 rounded-lg p-8">
        {icon && (
          <img
            src={icon}
            alt={`${mainText}'s icon`}
            className={'w-42 self-center'}
          />
        )}
        <h2
          className="self-center font-bold leading-10"
          style={{ fontSize: '1.875rem' }}
        >
          {mainText}
        </h2>
        <p
          className="self-center text-center text-sm text-grey"
          // style={{ lineHeight: '2rem', fontSize: '1.5rem' }}
        >
          {text.map((t, index) => (
            <Fragment key={index}>
              {t}
              <br />
            </Fragment>
          ))}
        </p>
      </dialog>
    </>
  );
};

export default ModalBase;
