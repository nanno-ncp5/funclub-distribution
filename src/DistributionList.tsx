import React, { useEffect, useState } from "react";
import { getDistributionList } from "./lib/distributionHelpers";

interface Distribution {
  memberId: string;
  staffName: string;
  createdAt?: any; // Firestore Timestamp または Date
}

const DistributionList = () => {
  const [distributions, setDistributions] = useState<Distribution[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      const list = await getDistributionList();
      setDistributions(list);
    };
    fetchList();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "日時不明";

    try {
      const date =
        typeof timestamp.toDate === "function"
          ? timestamp.toDate()
          : new Date(timestamp);
      return date.toLocaleString();
    } catch {
      return "日時不明";
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">配布履歴</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">会員番号</th>
            <th className="border border-gray-300 px-4 py-2">スタッフ名</th>
            <th className="border border-gray-300 px-4 py-2">配布日時</th>
          </tr>
        </thead>
        <tbody>
          {distributions.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{item.memberId}</td>
              <td className="border border-gray-300 px-4 py-2">{item.staffName}</td>
              <td className="border border-gray-300 px-4 py-2">
                {formatDate(item.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistributionList;
