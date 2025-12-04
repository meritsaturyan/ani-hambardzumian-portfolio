"use client";

import { useMemo, useState } from "react";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";
import Alert from "../ui/Alert";

function generateTimeSlots() {
  const slots = [];
  for (let h = 8; h <= 22; h++) {
    const label = h.toString().padStart(2, "0") + ":00";
    slots.push(label);
  }
  return slots;
}

const SLOTS = generateTimeSlots();

export default function BookingForm({ pavilion, upcomingBookings }) {
  const [step, setStep] = useState(1);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("13:00");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [extras, setExtras] = useState({
    lightingPackage: false,
    extraBackdrop: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const hours = useMemo(() => {
    const start = Number(startTime.split(":")[0]);
    const end = Number(endTime.split(":")[0]);
    const diff = end - start;
    return diff > 0 ? diff : 0;
  }, [startTime, endTime]);

  const totalPrice = useMemo(() => {
    const base = Number(pavilion.price_per_hour || 0) * hours;
    let extra = 0;
    if (extras.lightingPackage) extra += 10000;
    if (extras.extraBackdrop) extra += 5000;
    return base + extra;
  }, [pavilion.price_per_hour, hours, extras]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!date || !customerName || !phone) {
      setError("Please fill in the required fields.");
      return;
    }
    if (!hours) {
      setError("Please choose a valid time range.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pavilionSlug: pavilion.slug,
          date,
          startTime,
          endTime,
          customerName,
          phone,
          email,
          notes,
          extras,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to create booking");
      } else {
        setSuccess("Booking request sent. We will contact you shortly.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const stepTitle =
    step === 1 ? "Choose date & time" : "Your information & extras";

  return (
    // ВНЕШНЯЯ КОЛОНКА БРОНИРОВАНИЯ
    <div className="relative z-[80] flex-none w-full max-w-[460px] lg:mr-10 lg:-ml-4 xl:-ml-6">
      {/* sticky, чтобы блок всегда был виден, скролл внутри, а не под фото */}
      <div className="sticky top-[112px] max-h-[calc(100vh-140px)] overflow-y-auto space-y-4">
        {/* Основной тёмный блок как на референсе */}
        <div className="flex flex-col md:flex-row rounded-3xl bg-slate-900 text-slate-50 shadow-[0_30px_80px_rgba(15,23,42,0.8)] border border-slate-800 overflow-hidden">
          {/* ЛЕВЫЙ САЙДБАР СО ШАГАМИ */}
          <div className="md:w-64 bg-slate-950/95 px-6 py-6 flex flex-col justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-pink-400 mb-5">
                Book a studio
              </p>

              <div className="space-y-4 text-xs">
                <StepItem
                  index={1}
                  active={step === 1}
                  done={step > 1}
                  label="Date & Time"
                />
                <StepItem
                  index={2}
                  active={step === 2}
                  done={false}
                  label="Your information"
                />
              </div>

              <div className="mt-6 space-y-1 text-[11px] text-slate-400">
                <p className="uppercase tracking-[0.16em] text-slate-500">
                  Studio
                </p>
                <p className="font-semibold text-slate-50 text-sm">
                  {pavilion.name}
                </p>
                <p>
                  {pavilion.price_per_hour
                    ? `${Number(pavilion.price_per_hour).toLocaleString(
                        "en-US"
                      )} AMD / hour`
                    : "Price on request"}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="uppercase tracking-[0.18em] text-slate-500">
                Get in touch
              </p>
              <p className="font-semibold text-slate-100">+374 94 000000</p>
              <p>appointment@anistudios.am</p>
            </div>
          </div>

          {/* ПРАВАЯ ЧАСТЬ — ФОРМА */}
          <div className="flex-1 px-6 py-6 md:px-8 md:py-7">
            <div className="mb-4">
              <h2 className="text-xs font-semibold tracking-[0.22em] uppercase text-pink-400 mb-1">
                {step === 1 ? "Step 1 · Date & Time" : "Step 2 · Your Details"}
              </h2>
              <p className="text-lg md:text-xl font-semibold">{stepTitle}</p>
            </div>

            {error && (
              <Alert variant="error" className="mb-3">
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="mb-3">
                {success}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="md:col-span-2">
                      <label className="block mb-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
                        Date
                      </label>
                      <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
                        Start time
                      </label>
                      <select
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-sm"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      >
                        {SLOTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
                        End time
                      </label>
                      <select
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-sm"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      >
                        {SLOTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/70 border-t border-white/10 pt-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-white/50">
                        Duration
                      </div>
                      <div className="font-semibold text-white">
                        {hours ? `${hours} h` : "—"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-white/50">
                        Rate
                      </div>
                      <div className="font-semibold text-white">
                        {pavilion.price_per_hour
                          ? `${Number(
                              pavilion.price_per_hour
                            ).toLocaleString("en-US")} AMD / hour`
                          : "—"}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full mt-2"
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="block mb-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
                        Name
                      </label>
                      <Input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
                        Phone
                      </label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
                        Notes
                      </label>
                      <textarea
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-sm min-h-[80px]"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Anything we should know about your shoot?"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-white/70">
                      Extras
                    </div>
                    <div className="flex flex-col gap-2 text-xs">
                      <Checkbox
                        checked={extras.lightingPackage}
                        onChange={(checked) =>
                          setExtras((prev) => ({
                            ...prev,
                            lightingPackage: checked,
                          }))
                        }
                        label="Lighting package (+10,000 AMD)"
                      />
                      <Checkbox
                        checked={extras.extraBackdrop}
                        onChange={(checked) =>
                          setExtras((prev) => ({
                            ...prev,
                            extraBackdrop: checked,
                          }))
                        }
                        label="Extra backdrop (+5,000 AMD)"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-3 text-sm">
                    <div>
                      <div className="text-xs text-white/60">Total hours</div>
                      <div className="text-sm font-semibold">
                        {hours} {hours === 1 ? "hour" : "hours"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/60">
                        Estimated total
                      </div>
                      <div className="text-lg font-semibold text-pink-400">
                        {new Intl.NumberFormat("hy-AM", {
                          style: "currency",
                          currency: "AMD",
                          maximumFractionDigits: 0,
                        }).format(totalPrice || 0)}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 rounded-xl border border-white/20 bg-transparent px-3 py-2 text-xs font-medium text-white hover:bg-white/5 transition"
                    >
                      Back
                    </button>
                    <Button type="submit" className="w-2/3" disabled={loading}>
                      {loading ? "Sending request..." : "Book studio"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Ближайшие брони ниже блока, внутри той же sticky-колонки */}
        {upcomingBookings && upcomingBookings.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-black/40 p-3 text-[11px] text-white/60 mt-4">
            <div className="font-semibold mb-1 text-xs text-white">
              Upcoming bookings (read-only)
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {upcomingBookings.map((b) => (
                <div key={b.id} className="flex justify-between gap-2">
                  <span>
                    {new Date(b.date).toLocaleDateString("en-GB")} ·{" "}
                    {b.start_time}–{b.end_time}
                  </span>
                  <span className="capitalize">{b.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepItem({ index, active, done, label }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold ${
          active
            ? "border-pink-400 bg-pink-400 text-slate-900 shadow-[0_0_0_4px_rgba(244,114,182,0.4)]"
            : done
            ? "border-emerald-400 bg-emerald-400 text-slate-900"
            : "border-slate-600 bg-slate-900 text-slate-300"
        }`}
      >
        {done ? "✓" : index}
      </div>
      <span
        className={`text-xs ${
          active ? "text-slate-50 font-medium" : "text-slate-300"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
