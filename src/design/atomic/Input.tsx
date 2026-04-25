import "tailwindcss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input({ className = "", ...props }: InputProps) {
  return <input {...props} className={`bg-gray-300 border-2 rounded ${className}`} />;
}

export default Input;
