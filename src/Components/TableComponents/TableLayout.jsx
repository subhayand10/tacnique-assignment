import EditableRow from "./EditableRow";

const TableLayout = ({
  selectedRowIds,
  getTableProps,
  headerGroups,
  getTableBodyProps,
  page,
  prepareRow,
  editIndex,
  editSelected,
  updateSelected,
}) => {
  const selectedRows = Object.keys(selectedRowIds);
  console.log(page)

  return (
    <div className="overflow-x-auto ">
      <table
        className="min-w-full divide-y divide-gray-200 bg-transparent  "
        {...getTableProps()}
      >
        <thead className="">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className=" divide-y divide-gray-200" {...getTableBodyProps()}>
          {page.map((row, i) => {
            let s = i;
            if (row.index > 9) s = s + 10;
            prepareRow(row);
            console.log(row);
            console.log(s);
            return (
              <tr
                className={`px-6 py-4 whitespace-nowrap ${
                  selectedRows.includes(String(i)) ? "bg-gray-50" : ""
                }`}
                {...row.getRowProps()}
              >
                {/* Editable row */}
                {editIndex === s ? (
                  <EditableRow
                    row={row}
                    editSelected={editSelected}
                    updateSelected={updateSelected}
                  />
                ) : (
                  row.cells.map((cell) => {
                    return (
                      <td
                        className="px-6 py-4 text-lg text-gray-800"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableLayout;
