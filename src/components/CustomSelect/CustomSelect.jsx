import "./CustomSelect.css";

export const CustomSelect = ({ label, options = [], handleChange }) => {
  return (
    <div className="custom-select">
      <label htmlFor={label} className="custom-label">
        {label}
      </label>
      <select
        name={label}
        className="custom-dropdown"
        onChange={(e) => handleChange(e.target.value)}
      >
        {options?.map((option) => (
          <option key={option.id} value={option?.id}>
            {option?.name}
          </option>
        ))}
      </select>
    </div>
  );
};
