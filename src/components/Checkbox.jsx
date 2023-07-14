function Checkbox({ label, value, onChange }) {
  return (
    <label
      className={`${
        value ? "bg-black-700 text-white-100" : "bg-white-100 text-black-500"
      }   cursor-pointer rounded-sm p-1.5 text-xs`}
    >
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="hidden"
      />
      Switch to {label}
    </label>
  );
}
export default Checkbox;
