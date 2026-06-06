type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

function Button({
  text,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  size = "md",
}: ButtonProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40",
    secondary:
      "bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-50 active:bg-orange-100",
    danger:
      "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-lg shadow-red-500/25",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200",
  };

  return (
    <div className="flex justify-center">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          ${sizeStyles[size]} 
          ${variants[variant]} 
          rounded-xl font-semibold tracking-wide
          transition-all duration-200 
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          active:scale-[0.98]
          ${className}
        `}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
