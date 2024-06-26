import { useQuery } from "react-query";
import { API } from "./config";

import Table from "./Components/Table";

const App = () => {
const { isLoading, error, data } = useQuery("repoData", () =>
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      const filteredData = data.map(({ name, email, id, company }) => ({
        name,
        email,
        id,
        department: company.bs,
      }));
      return filteredData;
    })
);
console.log(data)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500
    "
        ></div>
      </div>
    );
  }

  if (error) {
    console.error(error);
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      <Table data={data} />
    </div>
  );
};

export default App;
