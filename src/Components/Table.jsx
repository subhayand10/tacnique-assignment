import { useState, useMemo } from "react";
import TableInstance from "./TableInstance";

const Table = ({ data }) => {
  const [newData, setNewData] = useState(data);

  function updateData(updatedData) {
    setNewData(updatedData);
  }

  function deleteSelected(selectedRowIds) {
    const updatedData = newData.filter((_, id) => {
      return !selectedRowIds.includes(String(id));
    });
    console.log(data)
    // console.log(selectedRowIds)
    console.log(updatedData)
    updateData(updatedData);
  }
  console.log(data)
  console.log(newData);
function addData(formData) {
  const updatedData = [...newData, formData];
  updateData(updatedData);
}

  function updateSelected(values, rowId) {
    const updatedData = newData.map((row) => {
      if (rowId === row.id) {
        return values;
      }
      return row;
    });

    updateData(updatedData);
  }

  const [columns, tableData] = useMemo(() => {
    const columns = [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Department",
        accessor: "department",
      },
    ];
    return [columns, newData];
  }, [newData]);

  return (
    <TableInstance
      columns={columns}
      data={tableData}
      deleteSelected={deleteSelected}
      addData={addData}
      updateSelected={updateSelected}
    />
  );
};

export default Table;
