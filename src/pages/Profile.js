import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');

      const res = await axios.get(`/api/employee/getEmployeeByUser/${userId}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });

      setEmployee(res.data.data);
    } catch (err) {
      console.error('Lỗi khi lấy thông tin nhân viên:', err);
      setError('Không thể tải thông tin. Vui lòng đăng nhập lại.');
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  if (error) {
    return <div className="p-8 text-red-600 font-semibold">{error}</div>;
  }

  if (!employee) {
    return <div className="p-8 text-gray-600">Không tìm thấy.</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Thông tin cá nhân</h1>

      <div className="flex items-center space-x-6 mb-8">
        <img
          src={employee.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border border-gray-300"
        />
        <div>
          <p className="text-xl font-semibold">{employee.fullName}</p>
          <p className="text-gray-600">{employee.email}</p>
        </div>
      </div>

      <ul className="space-y-2 text-lg">
        <li><strong>Mã nhân viên:</strong> {employee.employeeId}</li>
        <li><strong>Giới tính:</strong> {employee.gender}</li>
        <li><strong>Điện thoại:</strong> {employee.phone}</li>
        <li><strong>Phòng ban:</strong> {employee.department}</li>
        <li><strong>Chức vụ:</strong> {employee.position}</li>
        <li><strong>Lương:</strong> {employee.salary.toLocaleString()} VNĐ</li>
        <li><strong>Ngày sinh:</strong> {new Date(employee.dateOfBirth).toLocaleDateString()}</li>
        <li><strong>Ngày vào làm:</strong> {new Date(employee.dateOfjoining).toLocaleDateString()}</li>
      </ul>
    </div>
  );
};

export default Profile;
