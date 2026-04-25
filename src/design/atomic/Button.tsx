type Buttonprop = {
  text: string;
};

function Button({ text }: Buttonprop) {
  return (
    <button className="font-bold block mx-auto mb-2 bg-blue-500 px-1.5 py-1 rounded hover:bg-indigo-500">
      {text}
    </button>
  );
}

export default Button;
