import axios from "axios";
import Toastify from "toastify-js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UpdateUser({ url }) {
  const [dataUser, setDataUser] = useState({ name: "", email: "", age: 0 });
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${url}/user/${id}`);
      setDataUser(data.fetchUserById);
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

  useEffect(() => {
    fetchUser();
  }, []);

  async function submitNewUserData(e, name, email, age) {
    e.preventDefault();
    try {
      const { name, email, age } = dataUser;
      const newDataUser = { name, email, age };
      await axios.put(`${url}/user/${id}`, newDataUser);

      Toastify({
        text: "Success update user",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
      navigate("/");
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

  function handleInputChange(e) {
    const { id, value } = e.target;
    setDataUser((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  return (
    <>
      <div className="min-h-screen w-full bg-slate-200">
        <form className="max-w-sm mx-auto" onSubmit={submitNewUserData}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black pt-40">
              Name
            </label>
            <input
              value={dataUser.name}
              onChange={handleInputChange}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-red-500 dark:focus:border-red-500"
              placeholder="enter your name"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Email
            </label>
            <input
              value={dataUser.email}
              onChange={handleInputChange}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-red-500 dark:focus:border-red-500"
              placeholder="enter your email"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Age
            </label>
            <input
              value={dataUser.age}
              onChange={handleInputChange}
              type="Number"
              id="Age"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-red-500 dark:focus:border-red-500"
              placeholder="enter your Age"
              required
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="btn btn-outline">
              Submit
            </button>
            <Link to={"/"}>
              <button className="btn btn-outline">Back to Homepage</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
