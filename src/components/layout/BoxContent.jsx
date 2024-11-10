import clsx from "clsx";

export default function BoxContent({ children, className }) {
  return (
    <div className={clsx("w-full min-h-[500px] bg-white mt-5", className)}>
      {children}
    </div>
  );
}
