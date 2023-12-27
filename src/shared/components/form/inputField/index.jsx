import PropTypes from 'prop-types';
const InputField = ({
  type,
  placeholder,
  onChange,
  value,
  name,
  onBlur,
  className,
  isDisabled,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      className={`w-full border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-500 ${className}`}
      disabled={isDisabled}
    />
  );
};
InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: () => {},
  onBlur: () => {},
  className: '',
};

InputField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
};
export default InputField;
