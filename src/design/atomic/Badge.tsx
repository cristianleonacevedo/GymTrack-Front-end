type Props = {
  text: string;
};

export default function Badge({ text }: Props) {
  const getColor = () => {
    switch (text.toUpperCase()) {
      case "RESERVADA":
        return "bg-blue-100 text-blue-700";

      case "ASISTIO":
        return "bg-green-100 text-green-700";

      case "CANCELADA":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded ${getColor()}`}>
      {text}
    </span>
  );
}
