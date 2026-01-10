import Breadcrumb from '@/components/navigation/breadcrumb';

export default function RecipesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '料理情報' }]} />

      <h1 className="text-4xl font-bold mb-8">料理情報</h1>

      <p className="text-muted-foreground">
        料理情報のコンテンツは準備中です。後ほど追加されます。
      </p>
    </div>
  );
}
