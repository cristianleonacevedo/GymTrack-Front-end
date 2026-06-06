import "tailwindcss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

function Input({ className = "", label, error, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`
          w-full bg-gray-50 border-2 rounded-xl px-4 py-3
          text-gray-800 placeholder-gray-400
          border-gray-200 focus:border-orange-400 focus:bg-white
          outline-none transition-all duration-200
          ${error ? "border-red-400 focus:border-red-400" : ""}
          ${className}
        `}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

export default Input;
