import { CustomInputProps } from "../../types";

const CustomInput = ({
  titleLabel,
  inputType,
  handleChange,
  value,
  inputStyle,
  min,
  max,
  styleLabel,
  labelPosition = 'before',
  isChecked
}: CustomInputProps) => {
  return (
    <label className={styleLabel}>
      {labelPosition === 'before' && titleLabel}
      <input
        value={value}
        onChange={handleChange}
        type={inputType}
        className={inputStyle}
        min={min}
        max={max}
        checked={isChecked}
        />
        {labelPosition === 'after' && titleLabel}
    </label>
  );
};

export default CustomInput;
