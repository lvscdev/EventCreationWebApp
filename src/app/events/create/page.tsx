'use client';

import React, { useMemo, useState } from "react";
import Image from "next/image";

type PaymentRow = {
  id: string;
  name: string;
  currency: string;
  amount: string;
};

type EventPayload = {
  id: string;
  name: string;
  description: string;
  category?: string;
  capacity?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  paymentsEnabled: boolean;
  payments: PaymentRow[];
  bannerPreview?: string | null;
  createdAt: string;
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function CreateEventPage() {
  const timezone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return "UTC";
    }
  }, []);

  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [capacity, setCapacity] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [location, setLocation] = useState("");
  const [paymentsEnabled, setPaymentsEnabled] = useState(false);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerFileName, setBannerFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simple client-side validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handlers
  const handleAddPayment = () => {
    setPayments((p) => [...p, { id: uid(), name: "", currency: "NGN", amount: "" }]);
  };

  const handleRemovePayment = (id: string) => {
    setPayments((p) => p.filter((r) => r.id !== id));
  };

  const handlePaymentChange = (id: string, key: keyof PaymentRow, value: string) => {
    setPayments((rows) => rows.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerFileName(file.name);
    const url = URL.createObjectURL(file);
    setBannerPreview(url);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name || name.trim().length < 3) errs.name = "Event name must be at least 3 characters";
    if (!startDate) errs.startDate = "Start date/time required";
    if (!endDate) errs.endDate = "End date/time required";
    if (paymentsEnabled) {
      payments.forEach((p, i) => {
        if (!p.name || p.name.trim().length === 0) errs[`payment_${p.id}_name`] = "Payment name required";
        if (!p.amount || p.amount.trim().length === 0) errs[`payment_${p.id}_amount`] = "Amount required";
      });
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault?.();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setIsSubmitting(true);

    try {
      // create event payload (local only)
      const payload: EventPayload = {
        id: uid(),
        name,
        description,
        category,
        capacity,
        startDate,
        endDate,
        location,
        paymentsEnabled,
        payments,
        bannerPreview,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage (simple persistence)
      const existing = localStorage.getItem("lively_events_v1");
      const arr: EventPayload[] = existing ? JSON.parse(existing) : [];
      arr.unshift(payload);
      localStorage.setItem("lively_events_v1", JSON.stringify(arr));

      // show simple success (replace with toast if you like)
      alert("Event created locally. Check browser localStorage under key: lively_events_v1");

      // reset or navigate as needed
      // reset form (optional)
      setName("");
      setDescription("");
      setCategory("");
      setCapacity("");
      setStartDate("");
      setEndDate("");
      setLocation("");
      setPaymentsEnabled(false);
      setPayments([]);
      setBannerPreview(null);
      setBannerFileName(null);
    } catch (err) {
      console.error(err);
      alert("Could not save event locally.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen px-8 lg:px-20 py-12 bg-[#0b0202] text-white font-urbanist relative">
      {/* background layer behind everything */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/default_bckground.png"
          alt="background"
          fill
          className="object-cover opacity-70 pointer-events-none select-none"
        />
      </div>

      <div className="relative z-10">
        {/* Title */}
        <section className="mb-8">
          <h1 className="font-fraunces text-3xl lg:text-4xl leading-tight">Event Creation</h1>
          <p className="text-sm text-white/60 mt-2">Fill in the details to start creating your own events</p>
        </section>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10">
            {/* LEFT: cover upload + small controls */}
            <div>
              <div className="relative w-[280px] sm:w-[320px] h-[320px] rounded-xl overflow-hidden bg-white/10">
                {bannerPreview ? (
                  // preview via normal img because it's a blob url
                  // next/image can't be used for blob preview reliably
                  // in production you'd display the server URL via next/image
                  // but for local preview using <img> is OK.
                  // keep styling consistent with design
                  <img src={bannerPreview} alt="banner preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/40">Cover Image</div>
                )}

                <label className="absolute bottom-3 right-3 p-2 bg-black/70 rounded-full cursor-pointer hover:bg-black/90 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <input type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
                </label>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button type="button" className="bg-[#2b1919] px-3 py-2 rounded-md text-sm text-white/90 border border-white/5">
                  Personal Calendar ▾
                </button>

                <div className="ml-auto px-3 py-2 bg-white/10 rounded-md text-sm text-white/80">
                  {timezone}
                </div>
              </div>
            </div>

            {/* RIGHT: form fields */}
            <div className="space-y-6">
              {/* Event title */}
              <div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Event Name"
                  className="w-full text-3xl lg:text-4xl font-fraunces bg-transparent outline-none border-none placeholder-white/30"
                />
                {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
              </div>

              {/* Date/time rows */}
              <div className="space-y-3">
                <div className="flex gap-4 items-start">
                  <div className="flex-1 p-3 bg-white/5 rounded-md flex items-center justify-between">
                    <div className="w-full">
                      <div className="text-sm text-white/60">Start Date &amp; Time</div>
                      <div className="text-sm text-white/90 mt-1">
                        <input
                          type="datetime-local"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="bg-transparent outline-none text-white w-full"
                        />
                      </div>
                    </div>
                    <div className="ml-4 p-3 bg-black/60 rounded-md text-xs text-white/80">
                      {timezone}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-1 p-3 bg-white/5 rounded-md flex items-center justify-between">
                    <div className="w-full">
                      <div className="text-sm text-white/60">End Date &amp; Time</div>
                      <div className="text-sm text-white/90 mt-1">
                        <input
                          type="datetime-local"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="bg-transparent outline-none text-white w-full"
                        />
                      </div>
                    </div>
                    <div className="ml-4 p-3 bg-black/60 rounded-md text-xs text-white/80">
                      {timezone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <div className="text-sm text-white/60 mb-2">Add Event Location</div>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Offline location or virtual link"
                  className="w-full px-4 py-3 bg-white/10 rounded-md outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <div className="text-sm text-white/60 mb-2">Event Description</div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Type in your description"
                  rows={5}
                  className="w-full px-4 py-4 bg-white/10 rounded-md outline-none placeholder-white/40"
                />
              </div>

              <div className="border-t border-white/5 pt-6" />

              {/* Category + Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-white/60 mb-2">Category of Event</div>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-white/10 rounded-md outline-none">
                    <option value="">Select Category</option>
                    <option value="music">Music</option>
                    <option value="conference">Conference</option>
                    <option value="meetup">Meetup</option>
                  </select>
                </div>

                <div>
                  <div className="text-sm text-white/60 mb-2">Capacity of Event</div>
                  <select value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full px-4 py-3 bg-white/10 rounded-md outline-none">
                    <option value="">Select Capacity</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                  </select>
                </div>
              </div>

              {/* Payments toggle */}
              <div className="pt-2">
                <div className="text-sm text-white/60 mb-2">Payments</div>
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => setPaymentsEnabled((v) => !v)}
                    className={`w-[56px] h-[28px] rounded-full p-1 flex items-center cursor-pointer transition ${paymentsEnabled ? "bg-[#FF6A3D]" : "bg-white/15"}`}
                  >
                    <div className={`w-[22px] h-[22px] bg-white rounded-full transition-transform ${paymentsEnabled ? "translate-x-[28px]" : "translate-x-0"}`} />
                  </div>

                  <div className="text-sm text-white/70">Yes</div>
                  <div className="text-sm text-white/40">No</div>
                </div>
              </div>

              {/* Payment rows */}
              {paymentsEnabled && (
                <div className="space-y-3">
                  <div className="text-sm text-white/60 mb-2">Payment Category</div>

                  {payments.length === 0 && (
                    <div className="text-sm text-white/50">No payment rows yet — add one below.</div>
                  )}

                  <div className="space-y-3">
                    {payments.map((p) => (
                      <div key={p.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                        <input value={p.name} onChange={(e) => handlePaymentChange(p.id, "name", e.target.value)} placeholder="Payment Name" className="w-full px-4 py-3 bg-white/10 rounded-md" />
                        <input value={p.currency} onChange={(e) => handlePaymentChange(p.id, "currency", e.target.value)} placeholder="NGN (₦)" className="w-full px-4 py-3 bg-white/10 rounded-md" />
                        <div className="flex gap-2 items-center">
                          <input value={p.amount} onChange={(e) => handlePaymentChange(p.id, "amount", e.target.value)} placeholder="00.00" className="w-full px-4 py-3 bg-white/10 rounded-md" />
                          <button type="button" onClick={() => handleRemovePayment(p.id)} className="px-3 py-2 bg-black/50 rounded-md border border-white/5">Remove</button>
                        </div>
                        {/* error for this row */}
                        {errors[`payment_${p.id}_name`] && <p className="text-red-400 text-sm">{errors[`payment_${p.id}_name`]}</p>}
                      </div>
                    ))}

                    <div>
                      <button type="button" onClick={handleAddPayment} className="text-sm text-[#FF6825] hover:underline">+ Add another payment category</button>
                    </div>

                    <div className="mt-3">
                      <button type="button" className="px-5 py-2 rounded-md bg-[#4b2b18] text-[#FFCFB8]">Save</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* bottom buttons */}
          <div className="flex gap-6 items-center">
            <button type="button" onClick={() => window.history.back()} className="flex-1 py-4 rounded-md border border-white/10 text-white/70">Cancel</button>

            <button type="submit" disabled={isSubmitting} className="flex-1 py-4 rounded-md bg-gradient-to-r from-[#D94B38] to-[#C13927] text-white shadow">
              {isSubmitting ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
