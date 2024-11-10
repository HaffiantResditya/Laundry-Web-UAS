import clsx from "clsx";

export default function Input({
  icon,
  placeholder,
  val,
  onChange,
  onKeyDown, // Tambahkan prop onKeyDown
  isPassword = false,
}) {
  return (
    <div
      className={clsx(
        "flex items-center h-[55px] border-b-2 mb-5",
        val.length > 0 ? "border-[#541E50]" : "border-gray-200"
      )}
    >
      <span
        className={clsx(
          "w-[50px] flex justify-start text-[20px] pl-2",
          val.length > 0 ? "text-[#541E50]" : "text-gray-300"
        )}
      >
        {icon}
      </span>
      <input
        value={val}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown} // Tambahkan event onKeyDown pada input
        type={isPassword ? "password" : "text"}
        placeholder={placeholder}
        className="outline-none text-[16px] h-full"
      />
    </div>
  );
}
