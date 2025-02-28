import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddProfile.css"

const AddProfile = ({ doctors, setDoctors }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingDoctor = location.state?.doctor || null; 

  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    city: "",
    specialty: "",
    institution: "",
    clinic: "",
    contact: "",
    image: "", 
  });

  useEffect(() => {
    if (editingDoctor) {
      setFormData({
        ...editingDoctor,
        contact: Array.isArray(editingDoctor.contact)
          ? editingDoctor.contact.join(", ")
          : editingDoctor.contact,
      });
    }
  }, [editingDoctor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    const updatedFormData = {
      ...formData,
      contact: formData.contact.includes(",") 
        ? formData.contact.split(",").map(c => c.trim()) 
        : [formData.contact],
    };

    if (editingDoctor) {
      setDoctors(doctors.map((doc) => (doc.rollNo === formData.rollNo ? updatedFormData : doc)));
    } else {
      
      if (doctors.some((doc) => doc.rollNo === formData.rollNo)) {
        alert("Roll Number already exists. Please use a unique Roll Number.");
        return;
      }
      setDoctors([...doctors, updatedFormData]);
    }

    navigate("/");
  };

  return (
    <div className="add-profile-container">
      <h2>{editingDoctor ? "Edit Doctor Profile" : "Add New Doctor"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="rollNo" placeholder="Roll No" value={formData.rollNo} onChange={handleChange} required={!editingDoctor} disabled={editingDoctor} />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="specialty" placeholder="Specialty" value={formData.specialty} onChange={handleChange} required />
        <input type="text" name="institution" placeholder="Institution" value={formData.institution} onChange={handleChange} required />
        <input type="text" name="clinic" placeholder="Clinic" value={formData.clinic} onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact (comma-separated)" value={formData.contact} onChange={handleChange} required />
        
        <label>Upload Profile Image (Optional)</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {formData.image && <img src={formData.image} alt="Profile Preview" className="profile-preview" />}

        <button type="submit">{editingDoctor ? "Update Profile" : "Add Profile"}</button>
      </form>
    </div>
  );
};

export default AddProfile;
