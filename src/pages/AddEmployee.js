import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: '',
    gender: '',
    dateOfBirth: '',
    dateOfjoining: '',
    avatar: '',
    username: '',
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('/api/employee/create-employee', employee, {
        headers: {
          token: `Bearer ${token}`,
        },
      });

      alert('Thêm nhân viên thành công!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Lỗi khi thêm nhân viên:', error);
      alert('Không thể thêm nhân viên. Hãy kiểm tra lại thông tin!');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-6">Thêm nhân viên mới</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input type="text" name="employeeId" placeholder="Mã nhân viên" value={employee.employeeId} onChange={handleChange} className="border px-3 py-2 rounded" required />
        <input type="text" name="fullName" placeholder="Họ tên" value={employee.fullName} onChange={handleChange} className="border px-3 py-2 rounded" required />
        <input type="email" name="email" placeholder="Email" value={employee.email} onChange={handleChange} className="border px-3 py-2 rounded" required />
        <input type="text" name="phone" placeholder="Số điện thoại" value={employee.phone} onChange={handleChange} className="border px-3 py-2 rounded" required />
        <input type="text" name="department" placeholder="Phòng ban" value={employee.department} onChange={handleChange} className="border px-3 py-2 rounded" required />
        <input type="text" name="position" placeholder="Chức vụ" value={employee.position} onChange={handleChange} className="border px-3 py-2 rounded" required />
        <input type="number" name="salary" placeholder="Lương" value={employee.salary} onChange={handleChange} className="border px-3 py-2 rounded" required />
        <select name="gender" value={employee.gender} onChange={handleChange} className="border px-3 py-2 rounded" required>
          <option value="">Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
        <input type="date" name="dateOfBirth" value={employee.dateOfBirth} onChange={handleChange} className="border px-3 py-2 rounded" required />
        <input type="date" name="dateOfjoining" value={employee.dateOfjoining} onChange={handleChange} className="border px-3 py-2 rounded" required />
        <input type="text" name="avatar" placeholder="Link ảnh đại diện" value={employee.avatar} onChange={handleChange} className="border px-3 py-2 rounded" required />
        <input type="text" name="username" placeholder="Tên người dùng liên kết" value={employee.username} onChange={handleChange} className="border px-3 py-2 rounded" required />

        <div className="col-span-2 flex gap-3 justify-end mt-4">
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Thêm nhân viên
          </button>
          <button type="button" onClick={handleCancel} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
