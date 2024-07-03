import React from 'react';

function Button({
  title,
  type = 'button',
  textColer = 'text-white',
  bgColor = 'bg-black',
  px = 'px-4',
  py = 'py-2',
  className = '',
  ...props
}) {
  return (
    <button
      className={`rounded-lg ${px} ${py} ${bgColor} ${textColer} ${className}`}
      {...props}
    >
      {title}
    </button>
  );
}

export default Button;
