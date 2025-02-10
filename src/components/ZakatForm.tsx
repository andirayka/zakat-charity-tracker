"use client";

import { useState } from "react";
import { useZakatStore } from "@/store/zakatStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import jsPDF from "jspdf";

// Nisab threshold in USD (approximately 85 grams of gold at $60 per gram)
const NISAB_THRESHOLD = 5100;

export default function ZakatForm() {
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<{
    message: string;
    type: "success" | "info";
  } | null>(null);
  const addEntry = useZakatStore((state) => state.addEntry);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!income || !savings) return;

    const totalAssets = parseFloat(income) + parseFloat(savings);

    if (isNaN(totalAssets)) {
      setResult({
        message: "Please enter valid numbers for income and savings.",
        type: "info",
      });
      return;
    }

    if (totalAssets < NISAB_THRESHOLD) {
      setResult({
        message: `Your total wealth (${totalAssets.toLocaleString()}) is below the Nisab threshold (${NISAB_THRESHOLD.toLocaleString()}). Zakat is not required at this time.`,
        type: "info",
      });
      return;
    }

    const zakatAmount = totalAssets * 0.025; // 2.5% Zakat rate

    addEntry({
      amount: zakatAmount,
      date: new Date().toISOString(),
      notes: `Income: ${parseFloat(
        income
      ).toLocaleString()}, Savings: ${parseFloat(savings).toLocaleString()}${
        notes ? ` - ${notes}` : ""
      }`,
    });

    setResult({
      message: `Your Zakat amount is ${zakatAmount.toLocaleString()} (2.5% of ${totalAssets.toLocaleString()})`,
      type: "success",
    });

    setIncome("");
    setSavings("");
    setNotes("");
  };

  const handleExportPDF = () => {
    if (!result || result.type !== "success") return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.text("Zakat Calculation Report", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 20;

    // Financial Information
    doc.setFontSize(12);
    doc.text("Financial Information", margin, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.text(
      `Annual Income: ${parseFloat(income).toLocaleString()}`,
      margin,
      yPosition
    );
    yPosition += 8;
    doc.text(
      `Total Savings: ${parseFloat(savings).toLocaleString()}`,
      margin,
      yPosition
    );
    yPosition += 8;
    doc.text(
      `Total Assets: ${(
        parseFloat(income) + parseFloat(savings)
      ).toLocaleString()}`,
      margin,
      yPosition
    );
    yPosition += 15;

    // Zakat Details
    doc.setFontSize(12);
    doc.text("Zakat Details", margin, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.text(
      `Nisab Threshold: ${NISAB_THRESHOLD.toLocaleString()}`,
      margin,
      yPosition
    );
    yPosition += 8;
    doc.text(`Zakat Rate: 2.5%`, margin, yPosition);
    yPosition += 8;
    doc.text(result.message, margin, yPosition);

    // Add notes if present
    if (notes) {
      yPosition += 15;
      doc.setFontSize(12);
      doc.text("Additional Notes", margin, yPosition);
      yPosition += 10;
      doc.setFontSize(10);
      doc.text(notes, margin, yPosition);
    }

    // Add date
    yPosition += 15;
    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      margin,
      yPosition
    );

    doc.save("zakat-calculation.pdf");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculate Zakat</CardTitle>
      </CardHeader>
      <CardContent>
        {result && (
          <div
            className={`mb-6 p-5 rounded-lg ${
              result.type === "success"
                ? "bg-green-50/80 text-green-900 border border-green-200"
                : "bg-blue-50/80 text-blue-900 border border-blue-200"
            }`}
          >
            <p className="text-base font-medium leading-relaxed">
              {result.message}
            </p>
            {result.type === "success" && (
              <button
                onClick={handleExportPDF}
                className="mt-4 inline-flex items-center justify-center rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-primary border border-primary/20 hover:bg-primary hover:text-white h-10 px-6 py-2"
              >
                Export to PDF
              </button>
            )}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2.5">
            <label
              htmlFor="income"
              className="text-sm font-semibold text-foreground/90"
            >
              Annual Income
            </label>
            <Input
              type="number"
              id="income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
              min="0"
              step="0.01"
              placeholder="Enter your annual income"
            />
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="savings"
              className="text-sm font-semibold text-foreground/90"
            >
              Total Savings
            </label>
            <Input
              type="number"
              id="savings"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
              required
              min="0"
              step="0.01"
              placeholder="Enter your total savings"
            />
          </div>

          <div className="space-y-2.5">
            <label
              htmlFor="notes"
              className="text-sm font-semibold text-foreground/90"
            >
              Additional Notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 border border-input rounded-lg bg-background text-base transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              rows={3}
              placeholder="Add any additional notes"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 py-2 rounded-lg text-base font-semibold transition-all duration-200 hover:shadow-md"
          >
            Calculate & Add Zakat Entry
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
