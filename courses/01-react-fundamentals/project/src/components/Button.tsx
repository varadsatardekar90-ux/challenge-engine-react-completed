import React from "react"

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' |'danger';
  disabled?: boolean;
  id?:string;
}

function Button({children, onClick, type='button', variant='primary',disabled,id}:ButtonProps){
  return(
    <button
    id={id}
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={'btn btn-${variant}'}
    >
      {children}
    </button>
  );
}

export default Button;