import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`/api/employee/getEmployeeDetail/${id}`, {
        headers: { token: `Bearer ${token}` },
      });
      setEmployee(res.data.data);
    } catch (err) {
      console.error('Lỗi khi lấy thông tin nhân viên:', err);
      setError('Không thể tải thông tin nhân viên.');
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`/api/employee/update-employee/${id}`, employee, {
        headers: { token: `Bearer ${token}` },
      });
      alert('Cập nhật thành công!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Lỗi khi cập nhật:', err);
      alert('Không thể cập nhật nhân viên.');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!employee) return <div className="p-8 text-gray-600">Đang tải thông tin...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Sửa thông tin nhân viên</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          type="text"
          name="fullName"
          placeholder="Họ tên"
          value={employee.fullName}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={employee.phone}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="text"
          name="department"
          placeholder="Phòng ban"
          value={employee.department}
          onChange={handleChange}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="text"
          name="position"
          placeholder="Chức vụ"
          value={employee.position}
          onChange={handleChange}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Cập nhật
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
