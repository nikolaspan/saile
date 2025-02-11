export default function Input({
    type = "text",
    placeholder,
    value,
    onChange,
    label,
  }: {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
  }) {
    return (
      <div>
        {label && <label className="block text-sm font-medium text-black">{label}</label>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-aquaBlue focus:outline-none text-black"
        />
      </div>
    );
  }
  