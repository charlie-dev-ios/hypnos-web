import type { Metadata } from "next";
import IslandList from "@/components/islands/island-list";
import Breadcrumb from "@/components/navigation/breadcrumb";
import { getAllIslands } from "@/lib/data/islands";

export const metadata: Metadata = {
  title: "フィールド | ポケモンスリープ攻略サイト",
  description:
    "ポケモンスリープの全フィールド一覧。各フィールドのとくいきのみやカビゴン評価の情報を確認できます。",
};

export default async function IslandsPage() {
  const islands = await getAllIslands();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "フィールド" }]} />

      <h1 className="text-4xl font-bold mb-8">フィールド</h1>

      <IslandList islands={islands} />
    </div>
  );
}
