import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders the page heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: "Group Gifts" })
    ).toBeInTheDocument();
  });
});
