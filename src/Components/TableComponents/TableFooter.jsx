import { useState } from "react";
import Pagination from "./Pagination";
const TableFooter = ({
  addData,
  deleteSelected,
  selectedRowIds,
  ...paginationProps
}) => {
  console.log(selectedRowIds);
  const selectedRows = Object.keys(selectedRowIds);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
  });
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    //e.preventDefault(); // Prevent the default form submission behavior
    // Call the addData function with formData
    addData(formData);
    closeModal();
  };

  return (
    <div className="flex-col justify-start align-top md:flex md:justify-between md:m-5">
      <div className="">
        <button
          className="btn bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 m-2"
          onClick={() => deleteSelected(selectedRows)}
          disabled={selectedRows.length === 0}
        >
          Delete Selected
        </button>
        <button
          className="btn bg-red-500 text-white hover:bg-red-600"
          onClick={() => openModal()}
        >
          Add Data
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className=" fixed inset-0 bg-black opacity-60"></div>
            <div className="modal bg-blend-darken  text-white rounded-lg p-6 z-50">
              <span
                className="close absolute top-0 right-0 mt-4 mr-4 cursor-pointer"
                onClick={closeModal}
              >
                &times;
              </span>
              <h2 className="text-lg font-bold mb-4">Add Data</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-lg font-bold mb-1">ID:</label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold mb-1">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold mb-1">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold mb-1">
                    Department:
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
                <button
                  type="submit"
                  className="btn bg-blue-500 text-white hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Pagination {...paginationProps} />
    </div>
  );
};

export default TableFooter;
