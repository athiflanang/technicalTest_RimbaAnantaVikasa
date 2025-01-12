import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toastify from "toastify-js";
import SearchBar from "../components/searchBar";

export default function Homepage({ url }) {
  const [userData, setUserData] = useState([]);
  const [searchedUser, setSearchedUser] = useState(null);
  const [searchUuid, setSearchUuid] = useState("");

  async function fetchAllProduct() {
    try {
      const { data } = await axios.get(`${url}/user`);
      console.log(data, "<<<<<<<< ini data");
      console.log(data.fetchAllUser, "<<<<<<<< ini data fetch all user");

      setUserData(data.fetchAllUser);
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  async function deleteUser(id) {
    try {
      const response = await axios.delete(`${url}/user/${id}`);
      console.log(response);

      await fetchAllProduct();
      Toastify({
        text: `id ${id} success to delete`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response?.data?.error || "Error fetching user data",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  function handleInputData(uuid) {
    setSearchUuid(uuid);
  }

  function handleOutputData(user) {
    setSearchedUser(user);
  }

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <>
      <div className="w-full h-screen bg-slate-200 text-black">
        <table className="table table-md">
          <thead className="text-black">
            <tr>
              <th>UUID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {searchedUser ? (
              <tr key={searchedUser.id}>
                <td>{searchedUser.id}</td>
                <td>{searchedUser.name}</td>
                <td>{searchedUser.email}</td>
                <td>{searchedUser.age}</td>
                <td className="flex gap-2">
                  <Link to={`/edit/${searchedUser.id}`}>
                    <button className="btn btn-sm btn-primary">Edit</button>
                  </Link>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => deleteUser(searchedUser.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ) : (
              userData?.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td className="flex gap-2">
                    <Link to={`/edit/${user.id}`}>
                      <button className="btn btn-sm btn-primary">Edit</button>
                    </Link>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="items-center justify-items-center mt-4 grid grid-cols-2">
          <Link to="/add">
            <button className="btn btn-success">Add User</button>
          </Link>
          <div className="w-full">
            <SearchBar
              inputData={handleInputData}
              outputData={handleOutputData}
            />
          </div>
        </div>
      </div>
    </>
  );
}
