"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

export default function PavilionFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [capacity, setCapacity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setCapacity(searchParams.get("capacity") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setType(searchParams.get("type") || "");
  }, [searchParams]);

  function applyFilters(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (capacity) params.set("capacity", capacity);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (type) params.set("type", type);
    const qs = params.toString();
    router.push(`/pavilions${qs ? "?" + qs : ""}`);
  }

  function resetFilters() {
    setCapacity("");
    setMaxPrice("");
    setType("");
    router.push("/pavilions");
  }

  return (
    <form
      onSubmit={applyFilters}
      className="flex flex-wrap gap-3 items-end bg-white/5 border border-white/10 rounded-2xl p-4"
    >
      <div className="flex flex-col gap-1 min-w-[140px]">
        <label className="text-[11px] uppercase tracking-[0.16em] text-white/50">
          Min capacity
        </label>
        <Input
          type="number"
          min={1}
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Any"
        />
      </div>
      <div className="flex flex-col gap-1 min-w-[140px]">
        <label className="text-[11px] uppercase tracking-[0.16em] text-white/50">
          Max price (AMD / hour)
        </label>
        <Input
          type="number"
          min={0}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Any"
        />
      </div>
      <div className="flex flex-col gap-1 min-w-[140px]">
        <label className="text-[11px] uppercase tracking-[0.16em] text-white/50">
          Type
        </label>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Any</option>
          <option value="photo">Photo</option>
          <option value="video">Video</option>
          <option value="content">Content</option>
        </Select>
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
