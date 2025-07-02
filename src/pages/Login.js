import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/user/login', {
        username,
        password,
      });

      const { access_token, user } = res.data;

      // Lưu vào localStorage
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userId', user._id);

      alert('Đăng nhập thành công!');

      // Chuyển trang theo quyền
      if (user.role === 'admin') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/profile';
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Đăng nhập thất bại';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập hệ thống</h2>

        {error && (
          <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block font-medium mb-1">Tên đăng nhập</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Nhập username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Mật khẩu</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded font-semibold"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
