import React from 'react';

function Button({
  //   childern,
  type = 'button',
  textColer = 'text-white',
  bgColor = 'bg-black',
  className = '',
  ...props
}) {
  return (
    <button
      className={`rounded-lg px-4 py-2 ${bgColor} ${textColer} ${className}`}
      {...props}
    >
      {/* {childern} */}
    </button>
  );
}

export default Button;
