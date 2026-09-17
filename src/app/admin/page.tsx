"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Phone,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronLeft,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Shield,
  Stethoscope
} from "lucide-react";
import { useBookingStore, Booking } from "@/store/useBookingStore";
import { format } from "date-fns";

export default function AdminDashboardPage() {
  const { bookings, updateStatus, clearBookings } = useBookingStore();
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === "All" || b.status === filterStatus;
    const matchesSearch =
      b.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "Confirmed").length;
  const todayStr = new Date().toISOString().split("T")[0];
  const todayCount = bookings.filter((b) => b.date === todayStr).length;

  return (
    <div className="min-h-screen bg-[#F5F4F0] text-stone-900 font-sans selection:bg-stone-200">
      {/* Top Header */}
      <header className="bg-stone-900 text-white border-b border-stone-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Clinic Site</span>
            </Link>
            <div className="h-6 w-px bg-stone-800" />
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold/40 bg-white p-0.5">
                <Image
                  src="/assets/favicon.png"
                  alt="Skinshine Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="font-serif text-base text-white font-normal">
                  Skinshine Patient Triage
                </h1>
                <span className="text-[10px] text-gold uppercase tracking-wider font-semibold block -mt-0.5">
                  Dr. Mettu Jyothsna (MD DVL) Chamber Queue
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+919949971818"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>+91 99499 71818</span>
            </a>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-medium">
              Live Sync Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-xs text-stone-500 font-medium block">
              Total Reservations
            </span>
            <span className="font-serif text-3xl font-medium text-stone-900 mt-1 block">
              {totalBookings}
            </span>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Stored locally on client
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-xs text-amber-700 font-medium block">
              Pending Verification
            </span>
            <span className="font-serif text-3xl font-medium text-amber-600 mt-1 block">
              {pendingCount}
            </span>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Requires confirmation call
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-xs text-emerald-700 font-medium block">
              Confirmed Appointments
            </span>
            <span className="font-serif text-3xl font-medium text-emerald-600 mt-1 block">
              {confirmedCount}
            </span>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Slot reserved on calendar
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-xs text-gold font-medium block">
              Today's Schedule
            </span>
            <span className="font-serif text-3xl font-medium text-stone-900 mt-1 block">
              {todayCount}
            </span>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Consultations for today
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient, phone or domain..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-[#FAF9F6]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {["All", "Pending", "Confirmed", "Cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 ${
                  filterStatus === status
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table / List */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-serif text-base text-stone-900">
              Consultation Queue ({filteredBookings.length})
            </h3>
            <span className="text-xs text-stone-400">
              Reception Fee: ₹600 per patient
            </span>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="py-16 text-center text-stone-400">
              <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30 text-stone-500" />
              <p className="text-sm font-medium text-stone-600">No consultation requests found</p>
              <p className="text-xs text-stone-400 mt-1">
                New submissions from the patient booking modal will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-6 hover:bg-stone-50/60 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-stone-900 text-base">
                        {b.patientName}
                      </h4>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          b.status === "Confirmed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : b.status === "Cancelled"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1.5 gap-x-4 text-xs text-stone-600 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>Date: <strong className="text-stone-800">{b.date}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>Slot: <strong className="text-stone-800">{b.timeKey}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>Phone: <strong className="text-stone-800">{b.phone}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[11px] font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-md border border-gold/20">
                        {b.service}
                      </span>
                      {b.note && (
                        <span className="text-stone-500 italic text-[11px]">
                          "{b.note}"
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <a
                      href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                        b.patientName
                      )}%2C%20this%20is%20from%20Dr.%20Mettu%20Jyothsna%27s%20Skinshine%20Skin%20and%20Hair%20Clinic%20regarding%20your%20consultation%20on%20${
                        b.date
                      }%20at%20${b.timeKey}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${b.phone}`}
                      className="px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>

                    {b.status !== "Confirmed" && (
                      <button
                        onClick={() => updateStatus(b.id, "Confirmed")}
                        className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Confirm Slot</span>
                      </button>
                    )}

                    {b.status !== "Cancelled" && (
                      <button
                        onClick={() => updateStatus(b.id, "Cancelled")}
                        className="px-3 py-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
