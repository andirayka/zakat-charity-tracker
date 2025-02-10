import { useState } from "react";
import { useZakatStore } from "@/store/zakatStore";

export default function ZakatForm() {
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const addEntry = useZakatStore((state) => state.addEntry);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    addEntry({
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      notes,
    });

    setAmount("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium mb-1">
          Amount (in your currency)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-1">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-foreground text-background py-2 px-4 rounded-md hover:bg-foreground/90 transition-colors"
      >
        Add Zakat Entry
      </button>
    </form>
  );
}
