import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import axios from 'axios';

const Dashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');

      console.log('Token:', token);
      console.log('User ID:', userId);

      if (!token || !userId) {
        throw new Error('Token hoặc userId không tồn tại');
      }

      const res = await axios.get(`/api/employee/getEmployeeByUser/${userId}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });

      setEmployee(res.data.data);
    } catch (err) {
      console.error('Lỗi khi lấy thông tin dashboard:', err);
      setError('Không thể tải dashboard. Vui lòng đăng nhập lại.');

      // Xử lý logout tự động
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

  if (!employee) return <div className="p-8 text-gray-600">Đang tải Thống kê...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header fullName={employee.fullName} avatar={employee.avatar} />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Trang thống kê</h1>
          <p>Hiện tại chưa có thống kê nào</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
