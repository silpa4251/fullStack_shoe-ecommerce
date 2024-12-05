import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, editProfile } from "../../features/profileSlice";
import getUserId from "../../utils/getUserId";
import axiosInstance from "../../api/axiosInstance";
// import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  const userId = getUserId();

  // Form state to manage inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    profileimg: null,
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile(userId));
    }
  }, [dispatch, userId]);

  // Update form state when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.userId?.username || "",
        email: profile.userId?.email || "",
        phone: profile?.phone || "",
        profileimg: profile.profileimg || null,
        address: {
          street: profile.address?.street || "",
          city: profile.address?.city || "",
          state: profile.address?.state || "",
          postalCode: profile.address?.postalCode || "",
          country: profile.address?.country || "",
        },
      });
      setPreviewImage(profile.profileimg || null);
    }
  }, [profile]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [field]: value },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileimg: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === "address") {
        for (const field in formData.address) {
          data.append(`address.${field}`, formData.address[field]);
        }
      } else {
        data.append(key, formData[key]);
      }
    }
    console.log(data);
    try {
      const response = await axiosInstance.post(
        `/profile/upload/${userId}`, // Backend route
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Profile updated:", response.data.profile);
    } catch (err) {
      console.error("Error updating profile:", err.message);
    }
    dispatch(editProfile({ userId, updatedData: formData }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) console.log(error.message)

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-700">
        Welcome, {formData.username || "Guest User"}
      </h1>
      <div className="flex justify-center mb-8">
        <label htmlFor="profileimg" className="cursor-pointer">profile Image</label>
        <input type="file" onChange={handleImageChange} />
          {previewImage && 
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover border"
            />}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Gender */}
          {/* <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div> */}
        </div>

        {/* Address */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-700 mb-2">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["street", "city", "state", "postalCode", "country"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={`address.${field}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  id={`address.${field}`}
                  name={`address.${field}`}
                  value={formData.address[field]}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 product-btn font-semibold rounded-md focus:outline-none"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
