// endpoint for sdl

export default function SDLInput({
  onChange,
  value,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) {
  return (
    <input
      type="text"
      name="sdl"
      id="sdl"
      value={value}
      onChange={onChange}
      placeholder="SDL Endpoint"
      className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
    />
  );
}
