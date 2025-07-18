import React, { useEffect, useState } from "react";
import { distributeReward, getDistributionCounts, checkDuplicate } from "./lib/distributionHelpers";

const Distribute = () => {
  const [memberId, setMemberId] = useState("");
  const [message, setMessage] = useState("");
  const [todayCount, setTodayCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const staffName = localStorage.getItem("staffName") || "";

  const fetchCounts = async () => {
    const { today, total } = await getDistributionCounts();
    setTodayCount(today);
    setTotalCount(total);
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const handleDistribute = async () => {
    if (!memberId) {
      setMessage("会員番号を入力してください");
      return;
    }

    // 重複チェック
    const already = await checkDuplicate(memberId);
    if (already) {
      setMessage("すでに配布済みです");
      return;
    }

    const success = await distributeReward(memberId, staffName);
    if (success) {
      setMessage("特典を配布しました！");
      setMemberId("");
      fetchCounts();
    } else {
      setMessage("処理中にエラーが発生しました");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 text-center">
      <h2 className="text-2xl font-bold">特典配布</h2>
      <input
        type="text"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        placeholder="会員番号を入力"
        className="border p-3 w-full text-lg rounded-md"
      />
      <button
        onClick={handleDistribute}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 w-full"
      >
        特典を配布
      </button>
      {message && <p className="text-lg font-semibold">{message}</p>}
      <div className="flex justify-around mt-4 text-lg">
        <div>今日の配布数: {todayCount}</div>
        <div>累計配布数: {totalCount}</div>
      </div>
    </div>
  );
};

export default Distribute;
