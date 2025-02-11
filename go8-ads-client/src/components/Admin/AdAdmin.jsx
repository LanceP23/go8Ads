import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdAdmin = () => {
  const [ads, setAds] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    mediaType: '',
    mediaUrl: null,
    duration: '',
    priority: 0,
    startDate: '',
    endDate: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ads');
      setAds(response.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, mediaUrl: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/ads/${editId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/ads/create', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchAds();
      setFormData({ title: '', mediaType: '', mediaUrl: null, duration: '', priority: 0, startDate: '', endDate: '' });
    } catch (error) {
      console.error('Error saving ad:', error);
    }
  };

  const handleEdit = (ad) => {
    setFormData({
      ...ad,
      mediaUrl: ad.mediaUrl || "", // Keep existing mediaUrl
      startDate: ad.startDate ? new Date(ad.startDate).toISOString().slice(0, 10) : "",
      endDate: ad.endDate ? new Date(ad.endDate).toISOString().slice(0, 10) : "",
    });
    setEditId(ad._id);
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/ads/${id}`);
      fetchAds();
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Ad Management</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} className="w-full p-2 border rounded" required />
        
        <select name="mediaType" value={formData.mediaType} onChange={handleInputChange} className="w-full p-2 border rounded" required>
          <option value="">Select Media Type</option>
          <option value="Image">Image</option>
          <option value="Video">Video</option>
        </select>

        <input type="file" name="mediaUrl" onChange={handleFileChange} className="w-full p-2 border rounded" required={!editId} />
        
        <input type="number" name="duration" placeholder="Duration (seconds)" value={formData.duration} onChange={handleInputChange} className="w-full p-2 border rounded" required />
        
        <input type="number" name="priority" placeholder="Priority" value={formData.priority} onChange={handleInputChange} className="w-full p-2 border rounded" />
        
        <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full p-2 border rounded" required />
        
        <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full p-2 border rounded" required />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">{editId ? 'Update Ad' : 'Create Ad'}</button>
      </form>

      <h2 className="text-xl font-semibold mt-6">Ads List</h2>
      <div className="overflow-x-auto">
        <table className="w-full mt-4 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">Media</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Priority</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">End Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="text-center">
                <td className="border p-2">{ad.title}</td>
                <td className="border p-2">
                  {ad.mediaType === 'Image' ? (
                    <img src={`http://localhost:5000/${ad.mediaUrl}`} alt="Ad" className="w-20 h-20 object-cover" />
                  ) : (
                    <video src={`http://localhost:5000/${ad.mediaUrl}`} className="w-20 h-20" controls />
                  )}
                </td>
                <td className="border p-2">{ad.duration}</td>
                <td className="border p-2">{ad.priority}</td>
                <td className="border p-2">{new Date(ad.startDate).toLocaleDateString()}</td>
                <td className="border p-2">{new Date(ad.endDate).toLocaleDateString()}</td>
                <td className="border p-2">
                  <button onClick={() => handleEdit(ad)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(ad._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdAdmin;
