import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name"); 

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };
  const sortedUsers = users.slice().sort((a, b) => {
    if (sortBy === "name") {
      return (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName);
    } else if (sortBy === "email") {
      return a.email.localeCompare(b.email);
    } else if (sortBy === "company") {
      return a.company.name.localeCompare(b.company.name);
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar> </Navbar>
      <div className="m-5">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search by name"
            className="border mb-2 md:mb-0 md:mr-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 bg-white shadow-md"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            value={sortBy}
            onChange={handleSortBy}
            className="border mb-2 md:mb-0 md:mr-2 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 bg-white shadow-md"
            style={{ minWidth: "200px" }}
          >
            <option value="name">Sort by name</option>
            <option value="email">Sort by email</option>
            <option value="company">Sort by Company name</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 mx-5">
        {filteredUsers.map((user) => (
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
              <p className="font-bold text-lg text-blue-500">
                {user.firstName} {user.lastName}
              </p>
              <Link to={`/user/${user.id}`}>
                <p className="text-gray-600 font-bold text-lg">
                  {user.username}
                </p>
              </Link>
              <p className="text-gray-600 text-sm">{user.email}</p>
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
