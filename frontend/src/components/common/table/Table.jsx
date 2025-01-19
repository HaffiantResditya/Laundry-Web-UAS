import { useTable } from "react-table";

const LoadingComponent = () => {
  return (
    <div>
      <section className="h-[40px] bg-gray-100 ">
        <div className=" bg-gray-200 h-[40px] flex-1 border"></div>
      </section>
      <section className="h-[50px] bg-gray-100  flex gap-2 p-2">
        <div className=" bg-gray-200 flex-1 border"></div>
        <div className=" bg-gray-200 flex-1 border"></div>
        <div className=" bg-gray-200 flex-1 border"></div>
        <div className=" bg-gray-200 flex-1 border"></div>
      </section>
      <section className="h-[50px] bg-gray-100  flex gap-2 p-2">
        <div className=" bg-gray-200 flex-1 border"></div>
        <div className=" bg-gray-200 flex-1 border"></div>
        <div className=" bg-gray-200 flex-1 border"></div>
        <div className=" bg-gray-200 flex-1 border"></div>
      </section>
      <section className="h-[50px] bg-gray-100  flex gap-2 p-2">
        <div className=" bg-gray-200 flex-1 border"></div>
        <div className=" bg-gray-200 flex-1 border"></div>
        <div className=" bg-gray-200 flex-1 border"></div>
        <div className=" bg-gray-200 flex-1 border"></div>
      </section>
      <section className="h-[50px] bg-gray-100  flex gap-2 p-2">
        <div className=" bg-gray-200 flex-1 border"></div>
        <div className=" bg-gray-200 flex-1 border"></div>
        <div className=" bg-gray-200 flex-1 border"></div>
        <div className=" bg-gray-200 flex-1 border"></div>
      </section>
    </div>
  );
};
const TableComponent = ({ data, columns, loading = false }) => {
  // Menggunakan hook useTable dari react-table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="overflow-x-auto w-[80vw] md:w-[90vw] lg:w-full">
      {loading ? (
        <LoadingComponent />
      ) : (
        <table
          {...getTableProps()}
          style={{ border: "solid 1px #E5E7EB", width: "100%" }}
          className="text-gray-700"
        >
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, k) => (
                  <th
                    key={k}
                    {...column.getHeaderProps()}
                    style={{
                      fontWeight: "bold",
                      padding: 10,
                      border: "solid 1px #E5E7EB",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, x) => {
              prepareRow(row);
              return (
                <tr
                  style={{
                    background: x % 2 === 0 ? "#F3F4F6" : "#fff",
                  }}
                  key={x}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell, e) => (
                    <td
                      key={e}
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        border: "solid 1px #E5E7EB",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableComponent;
