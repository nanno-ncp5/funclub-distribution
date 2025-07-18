import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffLogin: React.FC = () => {
  const [staffName, setStaffName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!staffName.trim()) {
      alert("スタッフ名を入力してください");
      return;
    }
    // スタッフ名を localStorage に保存
    localStorage.setItem("staffName", staffName);
    navigate("/distribute"); // 特典配布ページへ移動
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">スタッフログイン</h1>
      <input
        type="text"
        placeholder="スタッフ名を入力"
        value={staffName}
        onChange={(e) => setStaffName(e.target.value)}
        className="border p-2 rounded mb-4"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ログイン
      </button>
    </div>
  );
};

export default StaffLogin;
