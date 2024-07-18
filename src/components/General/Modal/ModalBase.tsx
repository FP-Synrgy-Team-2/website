import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ModalBaseProps = {
  mainText: string;
  text: string[];
  icon: string;
  redirectTo: string;
  redirectInMs: number;
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
    setTimeout(() => navigate(redirectTo), redirectInMs);
  }, []);

  return (
    <dialog className="modal">
      <img
        src={icon}
        alt={`${mainText}'s icon`}
        className="h-42 w-42 self-center"
      />
      <h2
        className="self-center font-bold leading-10"
        style={{ fontSize: '1.875rem' }}
      >
        {mainText}
      </h2>
      <p
        className="w-140 self-center text-center text-grey"
        style={{ lineHeight: '2rem', fontSize: '1.5rem' }}
      >
        {text.map((t) => (
          <>
            {t}
            <br />
          </>
        ))}
      </p>
    </dialog>
  );
};

export default ModalBase;
