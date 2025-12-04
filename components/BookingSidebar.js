"use client";

import { useState } from "react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DURATIONS = ["1h", "2h", "3h", "4h"];

export default function BookingSidebar({ pavilion }) {
  const [step, setStep] = useState(1);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [lighting, setLighting] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const price = Number(pavilion.price_per_hour || 0);
  const extrasPrice = (lighting ? 5000 : 0) + (backdrop ? 3000 : 0);

  const hours = (() => {
    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
    const diff = eh * 60 + em - (sh * 60 + sm);
    return diff > 0 ? diff / 60 : 0;
  })();

  const total = hours * price + extrasPrice;

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!date || !startTime || !endTime || !name || !phone) {
      setError("Please fill in required fields.");
      return;
    }

    if (hours <= 0) {
      setError("End time must be after start time.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pavilionId: pavilion.id,
          date, // уже строка YYYY-MM-DD
          start_time: startTime,
          end_time: endTime,
          customer_name: name,
          phone,
          email,
          notes,
          extras: {
            lighting,
            backdrop,
          },
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          data?.error ||
            data?.message ||
            "This time slot is not available. Please choose another time."
        );
      } else {
        setMessage("Booking request sent successfully.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const stepTitle = step === 1 ? "Date & Time" : "Your information";
  const stepSubtitle =
    step === 1
      ? "Choose a suitable date and time for your shoot."
      : "Tell us how we can contact you.";

  return (
    <div className="w-full max-w-[580px] shrink-0 lg:mr-10">
      <div className="sticky top-[112px] max-h-[calc(100vh-140px)] overflow-y-auto rounded-[32px] shadow-[0_32px_80px_rgba(15,23,42,0.8)] z-30">
        <div className="flex w-full rounded-[32px] overflow-hidden border border-slate-900 bg-slate-900">
          {/* ЛЕВАЯ ТЁМНАЯ КОЛОНКА */}
          <aside className="w-60 bg-slate-800 text-slate-100 flex flex-col justify-between py-6 px-5">
            <div className="space-y-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                  Date &amp; Time
                </p>
              </div>

              <nav className="space-y-2">
                <StepNavItem
                  index={1}
                  active={step === 1}
                  done={step > 1}
                  label="Date & Time"
                  onClick={() => setStep(1)}
                />
                <StepNavItem
                  index={2}
                  active={step === 2}
                  done={false}
                  label="Your Information"
                  onClick={() => setStep(2)}
                />
              </nav>

              <div className="pt-4 mt-2 border-t border-white/10 space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Studio
                </p>
                <p className="text-sm font-semibold leading-snug">
                  {pavilion.name}
                </p>
                {price ? (
                  <p className="text-xs text-slate-400">
                    {price.toLocaleString("en-US")} AMD / hour
                  </p>
                ) : null}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 text-xs text-slate-300 space-y-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Get in touch
              </p>
              <p>+374 94 000000</p>
              <p>appointment@anistudios.am</p>

              <button
                type="button"
                className="mt-4 inline-flex items-center justify-between w-full rounded-full border border-slate-600 px-3 py-1.5 text-[11px] text-slate-200 hover:border-pink-400 hover:text-pink-200 transition"
              >
                <span>Collapse menu</span>
                <span className="text-lg leading-none">➜</span>
              </button>
            </div>
          </aside>

          {/* ПРАВАЯ БЕЛАЯ ПАНЕЛЬ */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 bg-white text-slate-900 px-6 py-6 flex flex-col gap-5"
          >
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-semibold">{stepTitle}</h2>
              <p className="mt-1 text-xs text-slate-500">{stepSubtitle}</p>
            </div>

            {step === 1 ? (
              <StepDateTime
                date={date}
                setDate={setDate}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
                hours={hours}
                price={price}
              />
            ) : (
              <StepInfo
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                notes={notes}
                setNotes={setNotes}
                lighting={lighting}
                setLighting={setLighting}
                backdrop={backdrop}
                setBackdrop={setBackdrop}
                hours={hours}
                extrasPrice={extrasPrice}
                total={total}
              />
            )}

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            {message && (
              <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                {message}
              </p>
            )}

            <div className="pt-4 mt-2 border-t border-slate-200 flex items-center justify-between gap-3 text-xs">
              <div className="text-slate-500">
                Duration:{" "}
                <span className="font-semibold text-slate-800">
                  {hours > 0 ? `${hours} h` : "—"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition"
                  >
                    Back
                  </button>
                )}
                {step === 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-2 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(236,72,153,0.6)] hover:bg-pink-600 transition"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-2 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(236,72,153,0.6)] hover:bg-pink-600 disabled:opacity-60 transition"
                  >
                    {loading ? "Booking…" : "Confirm booking"}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ───────── вспомогательные компоненты ───────── */

function StepNavItem({ index, active, done, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left transition
        ${
          active
            ? "bg-white/10"
            : done
            ? "bg-emerald-500/10 hover:bg-emerald-500/20"
            : "hover:bg-white/5"
        }`}
    >
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold border
        ${
          active
            ? "border-pink-400 bg-pink-400 text-slate-900"
            : done
            ? "border-emerald-400 bg-emerald-400 text-slate-900"
            : "border-slate-500 bg-slate-900 text-slate-200"
        }`}
      >
        {done ? "✓" : index}
      </div>
      <span
        className={`text-xs ${
          active ? "text-white font-medium" : "text-slate-300"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

/* ───────── STEP 1: КАЛЕНДАРЬ ───────── */

function StepDateTime({
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  hours,
  price,
}) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [duration, setDuration] = useState("1h");

  // разбираем выбранную дату из строки YYYY-MM-DD
  let selectedY = null;
  let selectedM = null;
  let selectedD = null;
  if (date) {
    const parts = date.split("-");
    if (parts.length === 3) {
      selectedY = Number(parts[0]);
      selectedM = Number(parts[1]) - 1; // месяц 0–11
      selectedD = Number(parts[2]);
    }
  }

  function handleDurationChange(value) {
    setDuration(value);
    const baseStart = startTime || "10:00";
    const [h] = baseStart.split(":").map(Number);
    const dur = parseInt(value, 10) || 1;
    const newEndH = h + dur;
    const next = `${String(newEndH).padStart(2, "0")}:00`;
    setEndTime(next);
  }

  const calendarCells = buildCalendar(viewYear, viewMonth);

  function handlePrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function handleNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function handleSelectDay(day) {
    if (!day) return;
    // формируем строку YYYY-MM-DD вручную, без Date и без toISOString
    const iso = [
      String(viewYear),
      String(viewMonth + 1).padStart(2, "0"),
      String(day).padStart(2, "0"),
    ].join("-");
    setDate(iso);
  }

  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-center gap-3">
        <select
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
          value={viewMonth}
          onChange={(e) => setViewMonth(Number(e.target.value))}
        >
          {MONTHS.map((m, i) => (
            <option value={i} key={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
          value={viewYear}
          onChange={(e) => setViewYear(Number(e.target.value))}
        >
          {Array.from({ length: 5 }).map((_, idx) => {
            const y = today.getFullYear() + idx;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="h-9 w-9 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-50"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="h-9 w-9 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-50"
          >
            ›
          </button>
        </div>
      </div>

      <div>
        <select
          className="w-32 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
          value={duration}
          onChange={(e) => handleDurationChange(e.target.value)}
        >
          {DURATIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="grid grid-cols-7 text-[11px] text-center text-slate-500 mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs">
          {calendarCells.map((cell, idx) => {
            if (!cell.day) {
              return <div key={idx} className="h-8" />;
            }

            const isSelected =
              selectedY === viewYear &&
              selectedM === viewMonth &&
              selectedD === cell.day;

            const baseClasses =
              "h-8 flex items-center justify-center rounded border text-xs cursor-pointer";

            const stateClasses = isSelected
              ? "bg-pink-500 border-pink-500 text-white"
              : "bg-white border-slate-200 text-slate-700 hover:bg-pink-50 hover:border-pink-300";

            return (
              <button
                type="button"
                key={idx}
                onClick={() => handleSelectDay(cell.day)}
                className={`${baseClasses} ${stateClasses}`}
              >
                {cell.day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
        <div>
          <p>
            Duration:{" "}
            <span className="font-semibold">
              {hours > 0 ? `${hours} h` : "—"}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Studio rate
          </p>
          <p className="font-semibold">
            {price
              ? `${price.toLocaleString("en-US")} AMD / hour`
              : "Set by studio"}
          </p>
        </div>
      </div>
    </div>
  );
}

function buildCalendar(year, month) {
  const cells = [];
  const first = new Date(year, month, 1);
  let start = first.getDay();
  if (start === 0) start = 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i < start; i++) cells.push({ day: null });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d });
  while (cells.length < 42) cells.push({ day: null });
  return cells;
}

/* ───────── STEP 2: ИНФО ───────── */

function StepInfo({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  notes,
  setNotes,
  lighting,
  setLighting,
  backdrop,
  setBackdrop,
  hours,
  extrasPrice,
  total,
}) {
  return (
    <div className="space-y-4 text-sm">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Full name <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Phone <span className="text-pink-500">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="block text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="block text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Notes
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none"
            placeholder="Project type, number of people, special requests…"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-700">
          Extras (optional)
        </p>
        <label className="flex items-center gap-2 text-xs text-slate-700">
          <input
            type="checkbox"
            checked={lighting}
            onChange={(e) => setLighting(e.target.checked)}
            className="h-4 w-4 rounded border-slate-400 text-pink-500 focus:ring-pink-400"
          />
          Lighting package (+5 000 AMD)
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-700">
          <input
            type="checkbox"
            checked={backdrop}
            onChange={(e) => setBackdrop(e.target.checked)}
            className="h-4 w-4 rounded border-slate-400 text-pink-500 focus:ring-pink-400"
          />
          Extra paper backdrop (+3 000 AMD)
        </label>
      </div>

      <div className="border border-slate-200 rounded-xl px-3 py-3 text-xs space-y-1 bg-slate-50">
        <p>
          Total hours:{" "}
          <span className="font-semibold">
            {hours > 0 ? `${hours} h` : "—"}
          </span>
        </p>
        <p>
          Extras:{" "}
          <span className="font-semibold">
            {extrasPrice
              ? `${extrasPrice.toLocaleString("en-US")} AMD`
              : "0 AMD"}
          </span>
        </p>
        <p className="pt-1 text-sm">
          Total:{" "}
          <span className="font-semibold text-slate-900">
            {total
              ? `${total.toLocaleString("en-US")} AMD`
              : "select time"}
          </span>
        </p>
      </div>
    </div>
  );
}
