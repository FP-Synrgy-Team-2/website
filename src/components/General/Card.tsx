import { FC, ReactNode, CSSProperties } from 'react';

interface CardProps {
  color?: string;
  htmlOptions?: {
    id?: string;
    title?: string;
    className?: string;
    style?: CSSProperties;
  };
  children: ReactNode;
}

const Card: FC<CardProps> = ({
  color = 'white',
  htmlOptions = {},
  children,
}) => {
  const { className, ...rest } = htmlOptions;
  return (
    <div className={`bg-${color} rounded-lg p-4 ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Card;
