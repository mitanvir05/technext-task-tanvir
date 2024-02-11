import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer"
import Swal from "sweetalert2";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    suite: "",
    city: "",
    companyName: "",
    image: null,
  });
  const [showForm, setShowForm] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      id: Math.floor(Math.random() * 1000) + 1,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: { address: formData.address },
      suite: { address: formData.suite },
      city: { address: formData.city },
      company: { name: formData.companyName },
      image: formData.image ? URL.createObjectURL(formData.image) : null,
    };

    setUsers([...users, newUser]);

    Swal.fire("Success", "User added successfully", "success");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      suite: "",
      city: "",
      companyName: "",
      image: null,
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
      <Navbar></Navbar>
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
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {showForm ? "Close Form" : "Add User"}
          </button>
        </div>
        {showForm && (
          <form
            className="bg-white shadow-md rounded md:w-2/4 lg:w-1/4 mx-auto px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Avatar
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                type="file"
                name="image"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <strong className="text-lg mb-4">Address:</strong>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Street
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Street"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="suite"
              >
                Suite
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="suite"
                type="text"
                placeholder="Suite"
                name="suite"
                value={formData.suite}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="companyName"
              >
                Company Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="companyName"
                type="text"
                placeholder="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add User
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 mx-5">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <div className="text-center">
              <div className="relative">
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <Link to={`/user/${user.id}`}>
                  <div className="absolute top-0 right-0 p-4 text-indigo-800 font-bold text-lg">
                    <p><strong>User name : {""}</strong>{user.username}</p>
                  </div>
                </Link>
              </div>
              <div className="text-gray-600 text-sm mt-1">
                <strong>First Name :</strong>{" "}{user.firstName} <br /> <strong>Last Name:</strong>{" "}{user.lastName}
              </div>
              <p className="text-gray-600 text-sm mt-1"> <strong>Email:</strong>{" "}{user.email}</p>
              <div className="mt-1 text-sm">
                <div className="text-gray-800">
                  <strong className="text-gray-800 text-lg">Address :{" "}</strong>
                  <p className="mb-1">
                    <strong>Street:</strong>{" "}{user.address?.address}, <strong>Suit:</strong>{" "}{user?.address?.suite ? user?.address?.suite : 'n/a'},<strong>City:</strong>{" "}
                    {" "}{user.address?.city}
                  </p>
                </div>
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
