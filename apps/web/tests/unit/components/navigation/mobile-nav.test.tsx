import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import MobileNav from "@/components/navigation/mobile-nav";

describe("MobileNav", () => {
  it("should render hamburger menu button", () => {
    render(<MobileNav />);

    const button = screen.getByRole("button", { name: /メニュー/i });
    expect(button).toBeInTheDocument();
  });

  it("should show menu when hamburger button is clicked", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    const button = screen.getByRole("button", { name: /メニュー/i });
    await user.click(button);

    expect(screen.getByText("ポケモン図鑑")).toBeInTheDocument();
    expect(screen.getByText("フィールド情報")).toBeInTheDocument();
    expect(screen.getByText("きのみ情報")).toBeInTheDocument();
    expect(screen.getByText("食材情報")).toBeInTheDocument();
    // 削除された項目が表示されないこと
    expect(screen.queryByText("ゲームメカニクス")).not.toBeInTheDocument();
    expect(screen.queryByText("睡眠戦略")).not.toBeInTheDocument();
  });

  it("should render all navigation links", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    const button = screen.getByRole("button", { name: /メニュー/i });
    await user.click(button);

    const pokemonLink = screen.getByRole("link", { name: /ポケモン図鑑/i });
    expect(pokemonLink).toHaveAttribute("href", "/pokemon");

    const fieldsLink = screen.getByRole("link", { name: /フィールド情報/i });
    expect(fieldsLink).toHaveAttribute("href", "/islands");

    const berriesLink = screen.getByRole("link", { name: /きのみ情報/i });
    expect(berriesLink).toHaveAttribute("href", "/berries");

    const ingredientsLink = screen.getByRole("link", { name: /食材情報/i });
    expect(ingredientsLink).toHaveAttribute("href", "/ingredients");
  });
});
