type Props = {
  tittle: string;
};

export default function SectionHeader({ tittle }: Props) {
  return <h2 className="text-lg font-semibold mb-2">{tittle}</h2>;
}
