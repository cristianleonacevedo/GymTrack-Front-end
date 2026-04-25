import { Text } from "../atomic";
import { Badge } from "../atomic";

type Props = {
  name: string;
  time: string;
  status?: string;
};

export default function ClassItem({ name, time, status }: Props) {
  return (
    <div>
      <div>
        <Text className="">{name}</Text>
        <Text className="">{time}</Text>
      </div>

      {status && <Badge text={status} />}
    </div>
  );
}
