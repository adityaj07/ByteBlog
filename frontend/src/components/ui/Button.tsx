import { FC } from 'react'

interface ButtonProps {
  text: string;
  className: string;
}

const Button: FC<ButtonProps> = ({ text, className }) => {
  return (
    <div>
      <button className={`px-4 py-2 ${className}`}>{text}</button>
    </div>
  );
};

export default Button;
