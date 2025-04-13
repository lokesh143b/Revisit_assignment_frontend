import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./CategoryForm.css";

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", itemCount: "", image: null });
  const token = localStorage.getItem("token");
  const url = "https://revisit-assignment-backend.onrender.com"


  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const res = await axios.get(`${url}/api/categories/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFormData({
            name: res.data.name,
            itemCount: res.data.itemCount,
            image: null,
          });
        } catch (err) {
          console.error("Failed to load category", err);
        }
      };
      fetchCategory();
    }
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("itemCount", formData.itemCount);
    if (formData.image) data.append("image", formData.image);

    try {
      if (id) {
        await axios.put(`${url}/api/categories/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post( url + "/api/categories", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate("/categories");
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <h2>{id ? "Edit Category" : "Add Category"}</h2>
      <input
        type="text"
        name="name"
        placeholder="Category Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="itemCount"
        placeholder="Item Count"
        value={formData.itemCount}
        onChange={handleChange}
        required
      />
      <input type="file" name="image" accept="image/*" onChange={handleChange} />
      <button type="submit">{id ? "Update" : "Add"} Category</button>
    </form>
  );
};

export default CategoryForm;
