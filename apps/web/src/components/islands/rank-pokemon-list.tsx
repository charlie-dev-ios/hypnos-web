import Link from "next/link";
import type { SleepType, SnorlaxRank } from "@/lib/schemas/island";

export interface RankPokemonListProps {
  ranks: SnorlaxRank[];
  pokemonMap: Map<number, { id: number; name: string }>;
}

const SLEEP_TYPES: SleepType[] = ["うとうと", "すやすや", "ぐっすり"];

export default function RankPokemonList({
  ranks,
  pokemonMap,
}: RankPokemonListProps) {
  return (
    <div className="space-y-4">
      {ranks.map((rank) => {
        const hasAny = SLEEP_TYPES.some(
          (st) => rank.newPokemon[st].length > 0,
        );

        return (
          <div key={`${rank.rankTier}-${rank.rankNumber}`}>
            <h3 className="font-semibold mb-2">
              {rank.rankTier} {rank.rankNumber}
            </h3>
            {!hasAny ? (
              <p className="text-sm text-muted-foreground">なし</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {SLEEP_TYPES.map((sleepType) => (
                  <div key={sleepType}>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {sleepType}
                    </p>
                    {rank.newPokemon[sleepType].length === 0 ? (
                      <p className="text-sm text-muted-foreground">-</p>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {rank.newPokemon[sleepType].map((pokemonId) => {
                          const pokemon = pokemonMap.get(pokemonId);
                          return (
                            <Link
                              key={pokemonId}
                              href={`/pokemon/${pokemonId}`}
                              className="text-sm px-2 py-1 rounded-md bg-muted hover:bg-accent transition-colors"
                            >
                              {pokemon?.name ?? `#${pokemonId}`}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
