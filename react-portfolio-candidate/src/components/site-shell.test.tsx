import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "@/app/page";

describe("portfolio homepage shell", () => {
  it("renders semantic navigation and the approved section order", () => {
    render(<Home />);

    const navigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    expect(
      within(navigation)
        .getAllByRole("link")
        .map((link) => link.textContent),
    ).toEqual([
      "Home",
      "About",
      "Projects",
      "Android",
      "Skills",
      "Credentials",
      "Contact",
    ]);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: "Android Projects" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Featured engineering work" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Skills backed by project work" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Credentials & continued learning" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Experience & education" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "About me" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Contact" }),
    ).toBeInTheDocument();
  });

  it("keeps the CV action hidden until an approved English CV is supplied", () => {
    render(<Home />);

    expect(
      screen.queryByRole("link", { name: /cv|résumé|resume/i }),
    ).not.toBeInTheDocument();
  });

  it("opens and closes the mobile navigation from the keyboard", () => {
    render(<Home />);
    const menuButton = screen.getByRole("button", { name: "Open navigation" });

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(menuButton, { key: "Escape" });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(menuButton).toHaveFocus();
  });

  it("links to the approved public profiles safely", () => {
    render(<Home />);

    for (const label of ["GitHub", "LinkedIn"]) {
      const links = screen.getAllByRole("link", { name: label });
      expect(links[0]).toHaveAttribute("target", "_blank");
      expect(links[0]).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(
      screen.queryByRole("link", { name: "YouTube" }),
    ).not.toBeInTheDocument();
  });

  it("groups skills without arbitrary proficiency percentages", () => {
    const { container } = render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Languages" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Frameworks" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Tools & Systems" }),
    ).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\b\d{1,3}%\b/);
  });

  it("shows verified certificates and labels XP as learning progress", () => {
    render(<Home />);

    expect(
      screen.getByRole("link", { name: /verify google ux design/i }),
    ).toHaveAttribute(
      "href",
      "https://www.coursera.org/verify/professional-cert/4JB4IY80RAIT",
    );
    expect(
      screen.getByRole("link", { name: /verify \.net fullstack developer/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Foundational Programming")).toBeInTheDocument();
    expect(screen.getByText("767 / 1000 XP")).toBeInTheDocument();
    expect(
      screen.getByText(/XP records learning-platform progress/i),
    ).toBeInTheDocument();
  });

  it("includes the supplied internship, education, and additional work history", () => {
    render(<Home />);

    expect(
      screen.getByText("Redshift III Innovation, Lda · Beja, Portugal"),
    ).toBeInTheDocument();
    expect(screen.getByText("EQF Level 6")).toBeInTheDocument();
    expect(screen.getAllByText("JNCQUOI Beach Club · Comporta")).toHaveLength(
      2,
    );
    expect(
      screen.getByText("BK Portugal, S.A. · Burger King"),
    ).toBeInTheDocument();
  });

  it("presents all featured project statuses and honest visual labels", () => {
    render(<Home />);

    expect(
      screen.getByText("Pilot scope · not production ready"),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Interface concept").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Feature visualization").length).toBeGreaterThan(
      0,
    );
  });
});
