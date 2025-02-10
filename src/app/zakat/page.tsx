"use client";

import ZakatForm from "@/components/ZakatForm";
import { useZakatStore } from "@/store/zakatStore";

export default function ZakatPage() {
  const { entries, totalAmount } = useZakatStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">Zakat Calculator</h1>

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div>
          <ZakatForm />
        </div>

        <div className="space-y-6">
          <div className="bg-foreground/5 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Total Zakat</h2>
            <p className="text-2xl font-bold">{totalAmount.toLocaleString()}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">History</h2>
            {entries.length === 0 ? (
              <p className="text-foreground/60">No entries yet</p>
            ) : (
              <div className="space-y-3">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-foreground/5 p-4 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-semibold">
                        {entry.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-foreground/60">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-foreground/80">
                        {entry.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
