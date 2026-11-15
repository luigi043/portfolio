import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("identifies Luiz as a computer engineer and software developer", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", {
      name: "Computer Engineer & Software Developer",
    }),
  ).toBeInTheDocument();
});
