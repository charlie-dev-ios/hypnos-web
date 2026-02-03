import { BerryList } from "@/components/berries/berry-list";

export default function BerriesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">きのみ情報</h1>
        <p className="text-muted-foreground mt-2">
          ポケモンスリープのきのみ一覧です。各きのみの基礎エナジーを確認できます。
        </p>
      </div>
      <BerryList />
    </div>
  );
}
