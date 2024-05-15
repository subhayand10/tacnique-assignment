import { useState } from "react";
import Pagination from "./Pagination";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";

const TableFooter = ({
  data,
  addData,
  deleteSelected,
  selectedRowIds,
  ...paginationProps
}) => {
  console.log(selectedRowIds);
  const selectedRows = Object.keys(selectedRowIds);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (formData) => {
    const ids = data.map((obj) => obj.id);
    if (ids.includes(formData.id) || formData.id < 11) {
      alert("Invalid ID!!!!!!");
      return;
    }
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
            <div className="fixed inset-0 bg-black opacity-90"></div>
            <div className="modal bg-blend-darken text-white rounded-lg p-6 z-50">
              <span
                className="close absolute top-0 right-0 mt-4 mr-4 cursor-pointer"
                onClick={closeModal}
              >
                &times;
              </span>
              <h2 className="text-lg font-bold mb-4">Add Data</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-lg font-bold mb-1" htmlFor="id">
                    ID:
                  </label>
                  <input
                    type="text"
                    name="id"
                    id="id"
                    {...register("id", {
                      required: "ID is required",
                    })}
                    className={`input ${errors.id ? "border-black-500" : ""}`}
                  />
                  {errors.id && (
                    <span className="text-black-500">{errors.id.message}</span>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-lg font-bold mb-1"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className={`input ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-lg font-bold mb-1"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      validate: (value) =>
                        isEmail(value) || "Invalid email address",
                    })}
                    className={`input ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-lg font-bold mb-1"
                    htmlFor="department"
                  >
                    Department:
                  </label>
                  <input
                    type="text"
                    name="department"
                    id="department"
                    {...register("department", {
                      required: "Department is required",
                    })}
                    className={`input ${
                      errors.department ? "border-red-500" : ""
                    }`}
                  />
                  {errors.department && (
                    <span className="text-red-500">
                      {errors.department.message}
                    </span>
                  )}
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
