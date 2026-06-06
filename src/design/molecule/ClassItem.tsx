import { Text } from "../atomic";
import { Badge } from "../atomic";

type Props = {
  name: string;
  time: string;
  status?: string;
};

export default function ClassItem({ name, time, status }: Props) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <div>
        <Text className="text-sm font-medium text-gray-800">{name}</Text>
        <Text className="text-xs text-gray-400">{time}</Text>
      </div>
      {status && <Badge text={status} />}
    </div>
  );
}
