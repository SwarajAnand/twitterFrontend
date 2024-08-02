import { useState } from "preact/hooks";
import toast, { Toaster } from "react-hot-toast";
import apiClient from "../utils/apiClient";

const UserProfileForm = ({ userData, onClose, setPageRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: userData.bio || "",
    website: userData.website || "",
    location: userData.location || "",
    avatar: userData.avatar || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await apiClient.post("/users/update", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast(response.data.message || "Profile updated successfully!");
      onClose();
      setPageRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md text-black">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            maxLength="200"
          />
        </div>
        <div>
          <label className="block text-gray-700">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Avatar</label>
          <input
            type="file"
            name="avatar"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {loading ? <span className="loader"></span> : <span>Save</span>}
        </button>
      </form>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #1d9bf0",
            padding: "10px 30px",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "50px",
            background: "#1d9bf0",
            color: "white",
          },
        }}
      />
    </div>
  );
};

export default UserProfileForm;
