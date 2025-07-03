import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Đảm bảo bạn có file logo tại src/assets/logo.png

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="w-64 bg-indigo-900 text-white h-screen p-6 flex flex-col shadow-lg">
      {/* Logo + Tiêu đề */}
      <div className="flex flex-col items-center mb-10">
        <img src={logo} alt="logo" className="w-16 h-16 rounded-full mb-2 border border-white" />
        <div className="text-xl font-bold tracking-wide text-center">Quản lý nhân sự</div>
      </div>

      {/* Menu */}
      <nav className="space-y-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="block w-full text-left hover:bg-indigo-800 px-4 py-2 rounded"
        >
          Nhân viên
        </button>
        <button
          onClick={() => navigate('/stats')}
          className="block w-full text-left hover:bg-indigo-800 px-4 py-2 rounded"
        >
          Thống kê
        </button>
        <button
          onClick={handleLogout}
          className="block w-full text-left hover:bg-red-600 mt-auto px-4 py-2 rounded bg-red-500"
        >
          Đăng xuất
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
