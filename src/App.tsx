import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Distribute from "./Distribute";
import StaffLogin from "./StaffLogin";
import DistributionList from "./DistributionList";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-green-50 text-gray-700 text-lg"> {/* 全体の文字サイズを大きめに */}
        {/* ナビゲーションバー */}
        <div className="p-4 flex gap-6 border-b border-green-200 bg-green-100 text-xl font-semibold">
          <Link to="/" className="text-gray-800 hover:text-green-700">
            スタッフログイン
          </Link>
          <Link to="/distribute" className="text-gray-800 hover:text-green-700">
            特典配布
          </Link>
          <Link to="/list" className="text-gray-800 hover:text-green-700">
            配布履歴
          </Link>
        </div>

        {/* 各ページ */}
        <div className="p-6 text-xl"> {/* ページ内テキストもさらに大きめ */}
          <Routes>
            <Route path="/" element={<StaffLogin />} />
            <Route path="/distribute" element={<Distribute />} />
            <Route path="/list" element={<DistributionList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
