export default function Button({
    children,
    variant = "primary",
    size = "medium",
    onClick,
    disabled = false,
  }: {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger";
    size?: "small" | "medium" | "large";
    onClick?: () => void;
    disabled?: boolean;
  }) {
    const baseStyle = "rounded-md font-semibold transition";
    const variantStyles = {
      primary: "bg-aquaBlue text-white hover:bg-hoverBlue",
      secondary: "bg-gray-200 text-black hover:bg-gray-300",
      danger: "bg-red-500 text-white hover:bg-red-600",
    };
    const sizeStyles = {
      small: "px-2 py-1 text-sm",
      medium: "px-4 py-2",
      large: "px-6 py-3 text-lg",
    };
  
    return (
      <button
        onClick={onClick}
        className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  