import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    itemCount: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const url = "https://revisit-assignment-backend.onrender.com"


  const fetchCategories = async () => {
    try {
      const res = await axios.get(url + "/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
      if (editingId) {
        await axios.put(
          `${url}/api/categories/${editingId}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(url + "/api/categories", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setFormData({ name: "", itemCount: "", image: null });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      itemCount: category.itemCount,
      image: null,
    });
    setEditingId(category._id);
  };

  return (
    <div className="categories-container">
      <h2>Categories</h2>

      <button className="add-category" onClick={() => navigate("/category-form")}>Add Category</button>

      <div className="category-list">
        {categories.map((cat) => (
          <div key={cat._id} className="category-card">
            {cat.imageUrl && <img src={cat.imageUrl} alt={cat.name} />}
            <h4>{cat.name}</h4>
            <p>{cat.itemCount} items</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
