const InputBox = ({ type, placeholder, name, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      required
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default InputBox;
