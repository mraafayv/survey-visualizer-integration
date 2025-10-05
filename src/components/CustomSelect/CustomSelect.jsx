import "./CustomSelect.css";

export const CustomSelect = ({ label, options = [] }) => {
  return (
    <div className="custom-select">
      <label htmlFor={label} className="custom-label">{label}</label>
      <select name={label} className="custom-dropdown">
        {options?.map((option) => (
          <option key={option.id} value={option?.name}>
            {option?.name}
          </option>
        ))}
      </select>
    </div>
  );
};
