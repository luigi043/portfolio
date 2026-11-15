import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectExplorer } from "@/components/project-explorer";

describe("secondary project explorer", () => {
  it("filters the approved projects and announces the visible count", async () => {
    const user = userEvent.setup();
    render(<ProjectExplorer />);

    expect(screen.getByRole("status")).toHaveTextContent("Showing 17 projects");
    await user.click(screen.getByRole("button", { name: "Mobile" }));

    expect(screen.getByRole("button", { name: "Mobile" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("status")).toHaveTextContent("Showing 1 project");
    expect(
      screen.getByRole("heading", { name: "Vitalis" }),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: "Insurex" }),
      ).not.toBeInTheDocument();
    });
  });

  it("expands a project summary with the required ARIA relationship", async () => {
    const user = userEvent.setup();
    render(<ProjectExplorer />);

    const trigger = screen.getByRole("button", { name: "More about Insurex" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls", "project-details-insurex");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("region", { name: "Insurex details" }),
    ).toHaveTextContent("repository private or unavailable");
  });

  it("uses honest external link labels for unavailable public code", () => {
    render(<ProjectExplorer />);

    const profileLinks = screen.getAllByRole("link", {
      name: "Explore GitHub profile",
    });
    expect(profileLinks).toHaveLength(10);
    expect(profileLinks[0]).toHaveAttribute("rel", "noopener noreferrer");
  });
});
