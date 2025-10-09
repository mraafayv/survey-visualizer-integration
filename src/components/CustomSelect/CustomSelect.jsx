import "./CustomSelect.css";

export const CustomSelect = ({
  label,
  options = [],
  handleChange,
  disabled,
}) => {
  return (
    <div className="custom-select">
      <label htmlFor={label} className="custom-label">
        {label}
      </label>
      <select
        name={label}
        className="custom-dropdown"
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
      >
        <option value={0}>All</option>
        {options?.map((option) => (
          <option key={option.id} value={option?.id}>
            {option?.name}
          </option>
        ))}
      </select>
    </div>
  );
};
