import useAppStore from "../../store/store";

function Errors() {
  const error = useAppStore((state) => state.error);

  if (!error) return null;

  return (
    <div className="w-full p-4">
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">{error}</span>
      </div>
    </div>
  );
}

export default Errors;
