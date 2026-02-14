import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RankPokemonList from "@/components/islands/rank-pokemon-list";
import type { SnorlaxRank } from "@/lib/schemas/island";

const emptyPokemon = { うとうと: [], すやすや: [], ぐっすり: [] };

const mockRanks: SnorlaxRank[] = [
  {
    rankTier: "ノーマル",
    rankNumber: 1,
    requiredEnergy: 0,
    dreamShards: 0,
    newPokemon: { うとうと: [172], すやすや: [25], ぐっすり: [] },
  },
  {
    rankTier: "ノーマル",
    rankNumber: 2,
    requiredEnergy: 3118,
    dreamShards: 35,
    newPokemon: { うとうと: [], すやすや: [39], ぐっすり: [] },
  },
  {
    rankTier: "スーパー",
    rankNumber: 1,
    requiredEnergy: 23385,
    dreamShards: 69,
    newPokemon: emptyPokemon,
  },
];

const mockPokemonMap = new Map([
  [172, { id: 172, name: "ピチュー" }],
  [25, { id: 25, name: "ピカチュウ" }],
  [39, { id: 39, name: "プリン" }],
]);

describe("RankPokemonList", () => {
  it("should render rank headings in tier+number format", () => {
    render(<RankPokemonList ranks={mockRanks} pokemonMap={mockPokemonMap} />);

    expect(screen.getByText("ノーマル 1")).toBeInTheDocument();
    expect(screen.getByText("ノーマル 2")).toBeInTheDocument();
    expect(screen.getByText("スーパー 1")).toBeInTheDocument();
  });

  it("should display pokemon names", () => {
    render(<RankPokemonList ranks={mockRanks} pokemonMap={mockPokemonMap} />);

    expect(screen.getByText("ピチュー")).toBeInTheDocument();
    expect(screen.getByText("ピカチュウ")).toBeInTheDocument();
    expect(screen.getByText("プリン")).toBeInTheDocument();
  });

  it("should link pokemon names to pokemon detail pages", () => {
    render(<RankPokemonList ranks={mockRanks} pokemonMap={mockPokemonMap} />);

    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));

    expect(hrefs).toContain("/pokemon/172");
    expect(hrefs).toContain("/pokemon/25");
    expect(hrefs).toContain("/pokemon/39");
  });

  it("should show 'なし' for ranks with no new pokemon", () => {
    render(<RankPokemonList ranks={mockRanks} pokemonMap={mockPokemonMap} />);

    const noneTexts = screen.getAllByText("なし");
    expect(noneTexts).toHaveLength(1); // スーパー 1 only
  });

  it("should render sleep type column headers for ranks with pokemon", () => {
    render(<RankPokemonList ranks={mockRanks} pokemonMap={mockPokemonMap} />);

    expect(screen.getAllByText("うとうと").length).toBeGreaterThan(0);
    expect(screen.getAllByText("すやすや").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ぐっすり").length).toBeGreaterThan(0);
  });
});
