import { Text } from "../atomic";

type Props = {
  label: string;
  value?: string | number;
};

export default function InfoItem({ label, value }: Props) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <Text className="text-gray-500 text-sm">{label}</Text>
      <Text className="font-semibold text-gray-800 text-sm">{value ?? "—"}</Text>
    </div>
  );
}
