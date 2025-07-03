import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const [employeeList, setEmployeeList] = useState([]);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa nhân viên này?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`/api/employee/delete-employee/${id}`, {
        headers: { token: `Bearer ${token}` },
      });

      const result = await axios.get(`/api/employee/getAllEmployee?page=1&limit=10`, {
        headers: { token: `Bearer ${token}` },
      });
      setEmployeeList(result.data.data);
      alert('Đã xóa nhân viên thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
      alert('Không thể xóa nhân viên!');
    }
  };

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        throw new Error('Token hoặc userId không tồn tại');
      }

      const res = await axios.get(`/api/employee/getEmployeeByUser/${userId}`, {
        headers: { token: `Bearer ${token}` },
      });

      const result = await axios.get(`/api/employee/getAllEmployee?page=1&limit=10`, {
        headers: { token: `Bearer ${token}` },
      });

      setEmployeeList(result.data.data);
      setEmployee(res.data.data);
    } catch (err) {
      console.error('Lỗi khi lấy thông tin dashboard:', err);
      setError('Không thể tải dashboard. Vui lòng đăng nhập lại.');

      setTimeout(() => {
        localStorage.clear();
        window.location.href = '/';
      }, 10000);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  if (error) return <div className="p-8 text-red-600 font-semibold">{error}</div>;
  if (!employee) return <div className="p-8 text-gray-600">Đang tải dashboard...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header fullName={employee.fullName} avatar={employee.avatar} />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Trang quản trị</h1>
          <p>Chào mừng bạn đến với hệ thống quản lý nhân sự!</p>

          <div className="flex items-center justify-between mt-8">
            <h2 className="text-xl font-semibold">Danh sách nhân viên</h2>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
              onClick={() => navigate('/add-employee')}
            >
              + Thêm nhân viên
            </button>
          </div>

          <table className="w-full border border-collapse text-sm mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Mã Nv</th>
                <th className="border px-4 py-2">Họ tên</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phòng ban</th>
                <th className="border px-4 py-2">Chức vụ</th>
                <th className="border px-4 py-2">Ngày vào làm</th>
                <th className="border px-4 py-2">Ngày tháng năm sinh</th>
                <th className="border px-4 py-2">Số điện thoại</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 align-top break-words">{emp.employeeId}</td>
                  <td className="border px-4 py-2 align-top break-words">{emp.fullName}</td>
                  <td className="border px-4 py-2 align-top break-words">{emp.email}</td>
                  <td className="border px-4 py-2 align-top break-words">{emp.department}</td>
                  <td className="border px-4 py-2 align-top break-words">{emp.position}</td>
                  <td className="border px-4 py-2 align-top">
                    {new Date(emp.dateOfjoining).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 align-top">
                    {new Date(emp.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 align-top">{emp.phone}</td>
                  <td className="border px-4 py-2 align-top whitespace-nowrap">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                        onClick={() => handleEdit(emp._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        onClick={() => handleDelete(emp._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
