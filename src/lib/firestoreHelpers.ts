// src/lib/distributionHelpers.ts
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";

// 会員番号が既に配布済みかを確認し、未配布なら記録する
export const distributeReward = async (memberId: string, staffName: string) => {
  const ref = doc(db, "distributed", memberId);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return false; // 既に配布済み
  }

  await setDoc(ref, {
    memberId,
    staffName,
    timestamp: serverTimestamp(),
  });

  return true;
};

// 当日と累計の配布数を集計
export const getDistributionCounts = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const qToday = query(
    collection(db, "distributed"),
    where("timestamp", ">=", today)
  );
  const todaySnap = await getDocs(qToday);

  const allSnap = await getDocs(collection(db, "distributed"));

  return {
    todayCount: todaySnap.size,
    totalCount: allSnap.size,
  };
};
