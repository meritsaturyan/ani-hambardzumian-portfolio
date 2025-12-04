"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function BookingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pavilionId, setPavilionId] = useState("");

  useEffect(() => {
    setFrom(searchParams.get("from") || "");
    setTo(searchParams.get("to") || "");
    setPavilionId(searchParams.get("pavilionId") || "");
  }, [searchParams]);

  function applyFilters(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (pavilionId) params.set("pavilionId", pavilionId);
    const qs = params.toString();
    router.push(`/admin/bookings${qs ? "?" + qs : ""}`);
  }

  function resetFilters() {
    setFrom("");
    setTo("");
    setPavilionId("");
    router.push("/admin/bookings");
  }

  return (
    <form
      onSubmit={applyFilters}
      className="flex flex-wrap gap-3 items-end bg-white/5 border border-white/10 rounded-2xl p-4 text-xs"
    >
      <div className="flex flex-col gap-1 min-w-[140px]">
        <label className="text-[11px] uppercase tracking-[0.16em] text-white/50">
          From date
        </label>
        <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
      </div>
      <div className="flex flex-col gap-1 min-w-[140px]">
        <label className="text-[11px] uppercase tracking-[0.16em] text-white/50">
          To date
        </label>
        <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>
      <div className="flex flex-col gap-1 min-w-[140px]">
        <label className="text-[11px] uppercase tracking-[0.16em] text-white/50">
          Pavilion ID
        </label>
        <Input
          type="number"
          min={1}
          value={pavilionId}
          onChange={(e) => setPavilionId(e.target.value)}
          placeholder="Any"
        />
      </div>
      <div className="flex gap-2 ml-auto">
        <Button type="submit" size="sm">
          Apply
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </form>
  );
}
