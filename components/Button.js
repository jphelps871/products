export default function Button({ value, active, noHover, handleActiveBtn }) {
  let activeBtnClass = active ? "text-white bg-dark-blue" : "";
  let hoverClass = noHover ? "cursor-default" : "hover:bg-hover";

  return (
    <button onClick={handleActiveBtn} className={`bg-cream rounded-lg px-4 py-2 text-dark-blue ${hoverClass} ${activeBtnClass}`}>
      <p className="text-sm font-bold">{value}</p>
    </button>
  );
}
