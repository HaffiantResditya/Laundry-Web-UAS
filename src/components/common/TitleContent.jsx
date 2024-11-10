export default function TitleContent({ title }) {
  return (
    <div className="justify-between flex items-center">
      <h2 className="border-l-[5px] pl-4 border-[#541E50] border-opacity-50">
        {title}
      </h2>
      <p className="text-gray-600 text-[12px]"> Laundry / {title}</p>
    </div>
  );
}
