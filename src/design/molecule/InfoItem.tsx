import { Text } from "../atomic";

type Props = {
  label: string;
  value?: string | number;
};

export default function InfoItem({ label, value }: Props) {
  return (
    <div className="">
      <Text className="text-gray-500">{label}</Text>
      <Text className="font-semibold">{value ?? "N/A"}</Text>
    </div>
  );
}
