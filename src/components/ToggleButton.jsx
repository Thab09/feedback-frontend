import { Switch } from "@headlessui/react";
function ToggleButton({ checked, onChange }) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${checked ? "bg-primary-500" : "bg-primary-300"}
        border-transparent relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out `}
    >
      <span
        aria-hidden="true"
        className={`${checked ? "translate-x-4" : "translate-x-0"}
          pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white-100 shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}

export default ToggleButton;
