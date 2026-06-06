type Props = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({ children, className, hover = false }: Props) {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-sm border border-gray-100
        ${hover ? "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer" : "hover:shadow-md"}
        transition-all duration-300 p-6 mb-6
        ${className ?? ""}
      `}
    >
      {children}
    </div>
  );
}
