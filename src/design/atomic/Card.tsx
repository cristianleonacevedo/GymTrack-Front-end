type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 mb-8 ${className ?? ""}`}>
      {children}
    </div>
  );
}
