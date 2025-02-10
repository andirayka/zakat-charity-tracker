import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ZakatForm from "../ZakatForm";
import { useZakatStore } from "@/store/zakatStore";
import jsPDF from "jspdf";

jest.mock("@/store/zakatStore");

describe("ZakatForm", () => {
  const mockAddEntry = jest.fn();

  beforeEach(() => {
    (useZakatStore as unknown as jest.Mock).mockReturnValue({
      addEntry: mockAddEntry,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calculates zakat correctly when total assets are above nisab threshold", async () => {
    render(<ZakatForm />);

    await userEvent.type(screen.getByLabelText(/annual income/i), "5000");
    await userEvent.type(screen.getByLabelText(/total savings/i), "1000");

    fireEvent.submit(screen.getByRole("button", { name: /calculate/i }));

    // Total assets: 6000, above nisab (5100)
    // Expected zakat: 6000 * 0.025 = 150
    expect(screen.getByText(/150/)).toBeInTheDocument();
    expect(mockAddEntry).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 150,
      })
    );
  });

  it("shows message when total assets are below nisab threshold", async () => {
    render(<ZakatForm />);

    await userEvent.type(screen.getByLabelText(/annual income/i), "2000");
    await userEvent.type(screen.getByLabelText(/total savings/i), "1000");

    fireEvent.submit(screen.getByRole("button", { name: /calculate/i }));

    // Total assets: 3000, below nisab (5100)
    expect(screen.getByText(/below the Nisab threshold/)).toBeInTheDocument();
    expect(mockAddEntry).not.toHaveBeenCalled();
  });

  it("validates input fields", async () => {
    render(<ZakatForm />);

    await userEvent.type(screen.getByLabelText(/annual income/i), "invalid");
    await userEvent.type(screen.getByLabelText(/total savings/i), "1000");

    fireEvent.submit(screen.getByRole("button", { name: /calculate/i }));

    expect(screen.getByText(/enter valid numbers/i)).toBeInTheDocument();
    expect(mockAddEntry).not.toHaveBeenCalled();
  });

  it("generates PDF when export button is clicked", async () => {
    render(<ZakatForm />);

    await userEvent.type(screen.getByLabelText(/annual income/i), "5000");
    await userEvent.type(screen.getByLabelText(/total savings/i), "1000");
    await userEvent.type(
      screen.getByLabelText(/additional notes/i),
      "Test note"
    );

    fireEvent.submit(screen.getByRole("button", { name: /calculate/i }));

    const exportButton = screen.getByRole("button", { name: /export to pdf/i });
    fireEvent.click(exportButton);

    expect(jsPDF).toHaveBeenCalled();
    const mockPdfInstance = (jsPDF as unknown as jest.Mock).mock.results[0]
      .value;
    expect(mockPdfInstance.save).toHaveBeenCalledWith("zakat-calculation.pdf");
  });
});
