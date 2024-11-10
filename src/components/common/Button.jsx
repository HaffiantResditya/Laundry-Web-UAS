import clsx from "clsx";

export default function Button({
  className,
  label = "button",
  icon = null,
  onClick = null,
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "p-3 px-5 border shadow text-[14px] md:text-[16px] bg-[#541E50] text-white w-[100px] justify-center items-center flex rounded-lg",
        className
      )}
    >
      {icon}
      {label}
    </button>
  );
}
