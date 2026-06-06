type Props = {
  tittle: string;
  subtitle?: string;
};

export default function SectionHeader({ tittle, subtitle }: Props) {
  return (
    <div className="mb-4">
      <h2 className="text-base font-bold text-gray-800 tracking-tight">{tittle}</h2>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
  );
}
