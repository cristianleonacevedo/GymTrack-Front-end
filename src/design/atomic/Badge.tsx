type Props = {
  text: string;
};

export default function Badge({ text }: Props) {
  const getColor = () => {
    switch (text.toUpperCase()) {
      case "RESERVADA":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "ASISTIO":
      case "ACTIVO":
        return "bg-green-100 text-green-700 border border-green-200";
      case "CANCELADA":
        return "bg-red-100 text-red-700 border border-red-200";
      case "DISPONIBLE":
        return "bg-orange-100 text-orange-700 border border-orange-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getColor()}`}>
      {text}
    </span>
  );
}
