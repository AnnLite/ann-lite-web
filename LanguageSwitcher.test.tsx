import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => "/prayers",
  useRouter: () => ({ replace: vi.fn() }),
}));
vi.mock("next-intl", () => ({ useLocale: () => "ht" }));

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("renders all three supported locales", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole("button", { name: "Kreyòl" })).toHaveAttribute(
      "aria-current",
      "true"
    );
    expect(screen.getByRole("button", { name: "Français" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "English" })).toBeInTheDocument();
  });
});
