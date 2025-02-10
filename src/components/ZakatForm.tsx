"use client";

import { useState } from "react";
import { useZakatStore } from "@/store/zakatStore";

export default function ZakatForm() {
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [notes, setNotes] = useState("");
  const addEntry = useZakatStore((state) => state.addEntry);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!income || !savings) return;

    const totalAssets = parseFloat(income) + parseFloat(savings);
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

    setIncome("");
    setSavings("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="income" className="block text-sm font-medium mb-1">
          Annual Income
        </label>
        <input
          type="number"
          id="income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
          required
          min="0"
          step="0.01"
          placeholder="Enter your annual income"
        />
      </div>

      <div>
        <label htmlFor="savings" className="block text-sm font-medium mb-1">
          Total Savings
        </label>
        <input
          type="number"
          id="savings"
          value={savings}
          onChange={(e) => setSavings(e.target.value)}
          className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
          required
          min="0"
          step="0.01"
          placeholder="Enter your total savings"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-1">
          Additional Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
          rows={3}
          placeholder="Add any additional notes"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-foreground text-background py-2 px-4 rounded-md hover:bg-foreground/90 transition-colors"
      >
        Calculate & Add Zakat Entry
      </button>
    </form>
  );
}
