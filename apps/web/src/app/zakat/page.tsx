"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Page } from "@/components/ui/Page";

const RATE = 0.025;

export default function ZakatPage() {
  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [investments, setInvestments] = useState("");
  const [business, setBusiness] = useState("");
  const [receivables, setReceivables] = useState("");
  const [debts, setDebts] = useState("");
  const [nisab, setNisab] = useState("5000");

  const n = (v: string) => {
    const x = parseFloat(v);
    return Number.isFinite(x) ? x : 0;
  };

  const result = useMemo(() => {
    const assets = n(cash) + n(gold) + n(silver) + n(investments) + n(business) + n(receivables);
    const zakatable = Math.max(0, assets - n(debts));
    const threshold = n(nisab);
    const due = zakatable >= threshold && threshold > 0 ? zakatable * RATE : 0;
    return { assets, zakatable, due, aboveNisab: zakatable >= threshold && threshold > 0 };
  }, [cash, gold, silver, investments, business, receivables, debts, nisab]);

  return (
    <Page>
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Zakat</h1>
        <p className="mt-1 text-sm text-muted">A calculator, not a substitute for qualified advice.</p>
      </header>

      <Card className="flex flex-col gap-3">
        {[
          ["Cash", cash, setCash],
          ["Gold (value)", gold, setGold],
          ["Silver (value)", silver, setSilver],
          ["Investments", investments, setInvestments],
          ["Business assets", business, setBusiness],
          ["Receivables", receivables, setReceivables],
          ["Debts", debts, setDebts],
          ["Nisab (same currency)", nisab, setNisab],
        ].map(([label, value, set]) => (
          <label key={label as string} className="flex flex-col gap-1 text-sm">
            <span className="text-muted">{label as string}</span>
            <input
              type="number"
              step="any"
              min="0"
              value={value as string}
              onChange={(e) => (set as (v: string) => void)(e.target.value)}
              className="rounded-xl border border-stroke bg-background px-3 py-2"
            />
          </label>
        ))}
      </Card>

      <Card>
        <p className="text-sm text-muted">Zakatable wealth</p>
        <p className="mt-1 text-2xl font-semibold tabular-nums">{result.zakatable.toFixed(2)}</p>
        <p className="mt-4 text-sm text-muted">Estimated zakat (2.5%)</p>
        <p className="mt-1 text-2xl font-semibold tabular-nums text-accent">
          {result.aboveNisab ? result.due.toFixed(2) : "0.00"}
        </p>
        {!result.aboveNisab && (
          <p className="mt-2 text-sm text-muted">Below the nisab you entered, so no zakat is estimated.</p>
        )}
      </Card>

      <Card>
        <p className="text-sm font-medium">Methodology</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          This estimate uses 2.5% on wealth above a user-supplied nisab, after subtracting debts.
          Gold and silver nisab are traditionally 85g and 595g; convert those to your currency
          yourself. Madhhab differences, hawl, and asset classes are not modeled. Confirm with a
          qualified scholar or accountant.
        </p>
      </Card>
    </Page>
  );
}
