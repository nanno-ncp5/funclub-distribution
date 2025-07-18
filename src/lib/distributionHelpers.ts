// distributionHelpers.ts

import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

// 重複チェック関数を追加
export const checkDuplicate = async (memberId: string) => {
  const q = query(collection(db, "distributed"), where("memberId", "==", memberId));
  const snap = await getDocs(q);
  return !snap.empty; // データが存在すれば true（配布済み）
};

// 既存の配布処理
export const distributeReward = async (memberId: string, staffName: string) => {
  const now = Timestamp.now();
  await addDoc(collection(db, "distributed"), {
    memberId,
    staffName,
    createdAt: now,
  });
  return true;
};

// 配布履歴を取得
export const getDistributionList = async () => {
  const snap = await getDocs(collection(db, "distributed"));
  return snap.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .sort((a, b) => a.memberId.localeCompare(b.memberId));
};

// 今日と累計の配布数を取得
export const getDistributionCounts = async () => {
  const snap = await getDocs(collection(db, "distributed"));
  const all = snap.docs.map((doc) => doc.data());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayCount = all.filter((d) => {
    const date = d.createdAt?.toDate?.() || new Date();
    return date >= today;
  }).length;

  return { today: todayCount, total: all.length };
};
