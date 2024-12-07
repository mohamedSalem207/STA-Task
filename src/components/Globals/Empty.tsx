export default function Empty({ msg }: { msg: string }) {
  return (
    <div className="flex items-center justify-center">
      <p className="text-gray-500">{msg}</p>
    </div>
  );
}
