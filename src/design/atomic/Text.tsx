type Props = {
  children: string | number;
  className?: string;
};

export default function Text({ children, className }: Props) {
  return <p className={className}>{children}</p>;
}
