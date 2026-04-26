type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  className?: string;
};

function Button({
  text,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-xl font-semibold transition duration-200";

  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 shadow-md",
    secondary:
      "bg-white text-orange-500 border border-orange-500 hover:bg-orange-50",
  };

  return (
    <div className="flex justify-center">
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
