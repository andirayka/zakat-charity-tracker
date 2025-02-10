"use client";

import { useState } from "react";
import { useZakatStore } from "@/store/zakatStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculate Zakat</CardTitle>
      </CardHeader>
      <CardContent>
        {result && (
          <div
            className={`mb-4 p-4 rounded-md ${
              result.type === "success"
                ? "bg-green-50 text-green-900"
                : "bg-blue-50 text-blue-900"
            }`}
          >
            <p className="text-sm font-medium">{result.message}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="income" className="text-sm font-medium">
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

          <div className="space-y-2">
            <label htmlFor="savings" className="text-sm font-medium">
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

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Additional Notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              rows={3}
              placeholder="Add any additional notes"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md transition-colors"
          >
            Calculate & Add Zakat Entry
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
