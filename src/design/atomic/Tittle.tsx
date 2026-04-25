type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Tittle({ children, className }: Props) {
  return <h2 className={`font-bold ${className ?? ""}`}>{children}</h2>;
}
