import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/contact-form";

async function fillValidForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.selectOptions(screen.getByLabelText("Enquiry type"), "employment");
  await user.type(
    screen.getByLabelText("Message"),
    "I would like to discuss a software role.",
  );
  return user;
}

describe("contact form", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("focuses the first invalid field and associates visible errors", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send enquiry" }));

    expect(screen.getByLabelText("Name")).toHaveFocus();
    expect(screen.getByLabelText("Name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByText("Enter your name.")).toHaveAttribute(
      "id",
      "contact-name-error",
    );
  });

  it("clears the draft only after a successful submission", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    const user = await fillValidFormAfterRender();

    await user.click(screen.getByRole("button", { name: "Send enquiry" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Message sent");
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("preserves the draft and exposes email fallback when submission fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    const user = await fillValidFormAfterRender();

    await user.click(screen.getByRole("button", { name: "Send enquiry" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "could not send",
    );
    expect(screen.getByLabelText("Name")).toHaveValue("Ada Lovelace");
    expect(
      screen.getByRole("link", { name: "cluiz4003@outlook.pt" }),
    ).toHaveAttribute("href", "mailto:cluiz4003@outlook.pt");
  });

  it("disables duplicate submission while a request is pending", async () => {
    let resolveRequest: ((value: { ok: boolean }) => void) | undefined;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(
        () =>
          new Promise<{ ok: boolean }>((resolve) => {
            resolveRequest = resolve;
          }),
      ),
    );
    const user = await fillValidFormAfterRender();
    const submit = screen.getByRole("button", { name: "Send enquiry" });

    await user.click(submit);
    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
    expect(fetch).toHaveBeenCalledTimes(1);

    resolveRequest?.({ ok: true });
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Message sent"),
    );
  });
});

async function fillValidFormAfterRender() {
  render(<ContactForm />);
  return fillValidForm();
}
