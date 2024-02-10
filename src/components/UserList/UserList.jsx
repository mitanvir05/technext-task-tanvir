import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 mx-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <div className="text-center">
              <img
                src={user.image}
                alt={user.firstName}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />

              <Link to={`/user/${user.id}`}>
                <p className="font-bold text-lg text-blue-500">
                  {user.firstName} {user.lastName}
                </p>
              </Link>
              <p className="text-gray-600 text-sm">Email :{user.email}</p>
              <div className="mt-2 text-sm">
                <p className="mb-1">
                  <strong className="text-gray-800">Address:</strong>{" "}
                  {user.address?.address}, {user.address?.suite},{" "}
                  {user.address?.city}
                </p>
                <p className="mb-1">
                  <strong className="text-gray-800">Company:</strong>{" "}
                  {user.company?.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserList;
