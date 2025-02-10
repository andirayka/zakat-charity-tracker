"use client";

import ZakatForm from "@/components/ZakatForm";
import { useZakatStore } from "@/store/zakatStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ZakatPage() {
  const { entries, totalAmount } = useZakatStore();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div>
          <ZakatForm />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Zakat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {totalAmount.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
            </CardHeader>
            <CardContent>
              {entries.length === 0 ? (
                <p className="text-muted-foreground">No entries yet</p>
              ) : (
                <div className="space-y-4">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 rounded-lg border bg-card/50 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-semibold text-lg">
                          {entry.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </p>
                      </div>
                      {entry.notes && (
                        <p className="text-sm text-muted-foreground">
                          {entry.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
