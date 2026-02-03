import { berries } from "@/lib/data/berries";
import { BerryCard } from "./berry-card";

export function BerryList() {
  if (berries.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        きのみデータがありません。
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {berries.map((berry) => (
        <BerryCard key={berry.id} berry={berry} />
      ))}
    </div>
  );
}
