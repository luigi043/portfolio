import { render, screen } from "@testing-library/react";
import { ArchitectureVisual } from "@/components/architecture-visual";

function setReducedMotion(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: query.includes("prefers-reduced-motion") ? matches : false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
}

describe("hero architecture visual", () => {
  it("renders every architecture layer and a complete text alternative", () => {
    setReducedMotion(false);
    render(<ArchitectureVisual />);

    const visual = screen.getByRole("img", {
      name: /interface sends requests through an api and services layer to a database/i,
    });
    expect(visual).toHaveAttribute("data-motion", "animated");
    for (const layer of ["Interface", "API", "Services", "Database"]) {
      expect(screen.getByText(layer)).toBeInTheDocument();
    }
  });

  it("renders the final static state immediately when reduced motion is requested", () => {
    setReducedMotion(true);
    render(<ArchitectureVisual />);

    expect(screen.getByRole("img")).toHaveAttribute("data-motion", "static");
    expect(screen.getByText("Featured systems")).toBeInTheDocument();
  });
});
