import React from 'react';

const Header = ({ fullName, avatar }) => {
  return (
    <div className="bg-white shadow flex items-center justify-between px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-700">Xin chào, {fullName}</h2>
      <img
        src={avatar}
        alt="avatar"
        className="w-10 h-10 rounded-full border"
      />
    </div>
  );
};

export default Header;
