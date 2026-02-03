import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Berry } from "@/lib/schemas/berry";
import { typeColors, typeTextColors } from "@/lib/schemas/pokemon-type";
import { cn } from "@/lib/utils";

interface BerryCardProps {
  berry: Berry;
}

export function BerryCard({ berry }: BerryCardProps) {
  const bgColor = typeColors[berry.type];
  const textColor = typeTextColors[berry.type];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          {/* タイプバッジ（アイコン代わり） */}
          <span
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold",
              bgColor,
              textColor,
            )}
          >
            {berry.type.slice(0, 2)}
          </span>
          <CardTitle className="text-lg">{berry.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              bgColor,
              textColor,
            )}
          >
            {berry.type}
          </span>
          <div className="text-right">
            <span className="text-muted-foreground text-xs">基礎エナジー</span>
            <p className="text-xl font-bold">{berry.energy}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
