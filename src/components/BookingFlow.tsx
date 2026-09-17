"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ChevronLeft, Calendar as CalendarIcon, Clock, CheckCircle2, Sparkles, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { useBookingStore, ServiceSpec } from '@/store/useBookingStore';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

interface BookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceSpec;
}

type Step = 'service' | 'datetime' | 'details' | 'success';

const SERVICES: { id: ServiceSpec; name: string; desc: string; duration: string; fee: string }[] = [
  {
    id: 'Clinical Dermatology',
    name: 'Clinical Dermatology Consultation',
    desc: 'Severe acne, eczema, psoriasis, persistent allergies, rosacea, and skin infections',
    duration: '30 mins',
    fee: '₹600'
  },
  {
    id: 'Advanced Laser Treatments',
    name: 'USFDA Laser Therapy',
    desc: 'Triple-wavelength permanent hair reduction, laser toning, carbon peel, and tattoo removal',
    duration: '45 mins',
    fee: 'Custom'
  },
  {
    id: 'Trichology & Hair Restoration',
    name: 'Trichology & Hair Restoration',
    desc: 'Advanced GFC therapy, Autologous Hair PRP, computerized scalp analysis, and thinning triage',
    duration: '45 mins',
    fee: '₹600'
  },
  {
    id: 'Pigmentation & Scar Revision',
    name: 'Pigmentation & Scar Revision',
    desc: 'Targeted melasma correction, chemical peels, subcision, and MNRF fractional resurfacing',
    duration: '45 mins',
    fee: 'Custom'
  },
  {
    id: 'Anti-Aging & Medical Aesthetics',
    name: 'Medical Aesthetics & Medi-Facials',
    desc: 'Hydra-dermabrasion, collagen stimulation, skin brightening, and anti-aging regimens',
    duration: '60 mins',
    fee: 'Custom'
  },
  {
    id: 'General Dermatological Consultation',
    name: 'General Skin & Nail Assessment',
    desc: 'Full-body dermoscopy, fungal nail treatment, mole mapping, and preventive skin health',
    duration: '30 mins',
    fee: '₹600'
  },
];

const TIME_SLOTS = [
  '10:30 AM',
  '11:15 AM',
  '12:00 PM',
  '01:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM'
];

export default function BookingFlow({ isOpen, onClose, initialService }: BookingFlowProps) {
  const [step, setStep] = useState<Step>(initialService ? 'datetime' : 'service');
  const [selectedService, setSelectedService] = useState<ServiceSpec | null>(initialService || null);

  // Next 7 days
  const today = new Date();
  const nextDays = Array.from({ length: 7 }).map((_, i) => addDays(today, i + 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  const addBooking = useBookingStore((state) => state.addBooking);

  const reset = () => {
    setStep('service');
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setName('');
    setPhone('');
    setNote('');
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 400);
  };

  const handleBook = () => {
    if (!selectedService || !selectedDate || !selectedTime || !name.trim() || !phone.trim()) return;

    addBooking({
      patientName: name.trim(),
      phone: phone.trim(),
      service: selectedService,
      date: selectedDate.toISOString().split('T')[0],
      timeKey: selectedTime,
      note: note.trim() || undefined,
    });
    setStep('success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed bottom-0 left-0 right-0 z-[70] md:max-w-xl md:mx-auto md:bottom-auto md:top-[6%] md:rounded-3xl md:max-h-[88vh] h-[92vh] bg-white rounded-t-[2rem] shadow-2xl flex flex-col overflow-hidden border border-stone-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-stone-100 shrink-0 bg-stone-50/70">
              {step !== 'service' && step !== 'success' ? (
                <button
                  onClick={() =>
                    setStep(step === 'details' ? 'datetime' : 'service')
                  }
                  className="p-2 -ml-2 rounded-full hover:bg-stone-200/70 active:scale-95 transition-transform text-stone-700"
                  aria-label="Go back"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              ) : (
                <div className="w-9" />
              )}
              <div className="text-center">
                <span className="text-[10px] uppercase font-semibold tracking-widest text-gold block">
                  Skinshine Skin and Hair Clinic
                </span>
                <h3 className="font-serif text-lg text-stone-900">
                  {step === 'service' && 'Select Consultation'}
                  {step === 'datetime' && 'Preferred Slot'}
                  {step === 'details' && 'Patient Registration'}
                  {step === 'success' && 'Consultation Reserved'}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="p-2 -mr-2 rounded-full bg-stone-100 hover:bg-stone-200 active:scale-95 transition-transform text-stone-700"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
              <AnimatePresence mode="wait">
                {step === 'service' && (
                  <motion.div
                    key="service"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.22 }}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-stone-500 uppercase tracking-widest font-medium">
                        Select clinical domain
                      </p>
                      <span className="text-xs text-gold font-medium">
                        Consultation fee: ₹600
                      </span>
                    </div>

                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSelectedService(s.id);
                          setStep('datetime');
                        }}
                        className="text-left p-4.5 rounded-2xl border border-stone-200 hover:border-gold hover:shadow-md hover:shadow-gold/10 transition-all active:scale-[0.99] group bg-white relative"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm md:text-base text-stone-900 group-hover:text-gold transition-colors">
                            {s.name}
                          </h4>
                          <span className="text-[11px] font-medium text-stone-500 bg-stone-100 rounded-full px-2.5 py-0.5 shrink-0 ml-2">
                            {s.duration}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 leading-relaxed pr-4">
                          {s.desc}
                        </p>
                      </button>
                    ))}

                    <div className="mt-3 p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200/80 flex items-start gap-3 text-xs text-stone-600">
                      <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>
                        All clinical diagnostics and treatments are conducted directly by Dr. Mettu Jyothsna (MBBS, MD DVL) with 18+ years of expertise.
                      </span>
                    </div>
                  </motion.div>
                )}

                {step === 'datetime' && (
                  <motion.div
                    key="datetime"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.22 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Selected Service Card */}
                    <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase font-semibold tracking-wider">
                          Selected Domain
                        </span>
                        <span className="font-medium text-stone-900">{selectedService}</span>
                      </div>
                      <button
                        onClick={() => setStep('service')}
                        className="text-gold hover:underline font-medium text-xs"
                      >
                        Change
                      </button>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-medium text-stone-900 text-sm mb-3">
                        <CalendarIcon className="w-4 h-4 text-gold" /> Choose Appointment Date
                      </h4>
                      <div className="flex gap-2.5 overflow-x-auto pb-3 snap-x hide-scrollbar">
                        {nextDays.map((date, i) => {
                          const isSelected =
                            selectedDate?.toISOString().split('T')[0] ===
                            date.toISOString().split('T')[0];
                          return (
                            <button
                              key={i}
                              onClick={() => setSelectedDate(date)}
                              className={cn(
                                'flex flex-col items-center justify-center min-w-[72px] h-[86px] rounded-2xl border transition-all active:scale-95 snap-start shrink-0',
                                isSelected
                                  ? 'border-gold bg-gold/10 text-stone-900 shadow-sm ring-1 ring-gold'
                                  : 'border-stone-200 text-stone-500 hover:border-stone-300 bg-white'
                              )}
                            >
                              <span className="text-[11px] font-medium uppercase tracking-wider">
                                {format(date, 'EEE')}
                              </span>
                              <span
                                className={cn(
                                  'text-xl font-serif mt-0.5',
                                  isSelected ? 'text-gold font-bold' : 'text-stone-900'
                                )}
                              >
                                {format(date, 'd')}
                              </span>
                              <span className="text-[10px] text-stone-400">
                                {format(date, 'MMM')}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      className={cn(
                        'transition-opacity',
                        !selectedDate && 'opacity-40 pointer-events-none'
                      )}
                    >
                      <h4 className="flex items-center gap-2 font-medium text-stone-900 text-sm mb-3">
                        <Clock className="w-4 h-4 text-gold" /> Select Available Time
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              'py-3 rounded-xl border text-xs font-medium transition-all active:scale-95 text-center',
                              selectedTime === time
                                ? 'border-gold bg-stone-900 text-white shadow-sm'
                                : 'border-stone-200 text-stone-700 hover:border-stone-300 bg-white'
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => setStep('details')}
                      className="mt-2 w-full py-3.5 rounded-xl bg-stone-900 text-white text-sm font-medium disabled:opacity-40 disabled:active:scale-100 active:scale-[0.98] transition-all shadow-md"
                    >
                      Proceed to Patient Details
                    </button>
                  </motion.div>
                )}

                {step === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.22 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 text-xs text-stone-600">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-stone-900">{selectedService}</span>
                        <span className="text-gold font-medium">Slot Held</span>
                      </div>
                      <p className="text-stone-500">
                        {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-stone-700">Patient Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ananya Varma"
                        className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-stone-700">WhatsApp Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 99499 71818"
                        className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                      <span className="text-[11px] text-stone-400">
                        Instant booking receipt and directions sent via WhatsApp.
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-stone-700">Primary Skin or Hair Concern (Optional)</label>
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g. Hormonal acne, melasma, hair fall, laser consultation"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                    </div>

                    <div className="p-3.5 bg-cream rounded-xl border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
                      <span>Doctor Consultation Fee</span>
                      <span className="font-semibold text-stone-900">₹600 (Payable at Clinic)</span>
                    </div>

                    <button
                      disabled={!name.trim() || !phone.trim()}
                      onClick={handleBook}
                      className="mt-2 w-full py-4 rounded-xl bg-stone-900 text-white text-sm font-medium disabled:opacity-40 disabled:active:scale-100 active:scale-[0.98] transition-all shadow-lg"
                    >
                      Confirm Reservation
                    </button>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center h-full py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-stone-900 text-gold flex items-center justify-center mb-4 shadow-lg shadow-gold/10">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-stone-900 mb-2">
                      Consultation Confirmed
                    </h3>
                    <p className="text-xs text-stone-500 mb-6 max-w-[320px] leading-relaxed">
                      We look forward to seeing you at Skinshine Clinic on{' '}
                      <span className="text-stone-900 font-medium">
                        {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                      </span>{' '}
                      at <span className="text-stone-900 font-medium">{selectedTime}</span>.
                    </p>

                    <div className="w-full bg-[#FAF9F6] p-4 rounded-2xl border border-stone-200/80 text-left text-xs text-stone-600 mb-6 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Chief Dermatologist</span>
                        <span className="font-medium text-stone-900">Dr. Mettu Jyothsna (MD DVL)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Location</span>
                        <span className="font-medium text-stone-900 text-right">#209 VIP Towers, Siripuram, Vizag</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Clinic Helpline</span>
                        <span className="font-medium text-stone-900">+91 99499 71818</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Status</span>
                        <span className="font-medium text-emerald-700">Verified & Added to Queue</span>
                      </div>
                    </div>

                    <button
                      onClick={handleClose}
                      className="w-full py-3.5 rounded-xl bg-stone-900 text-white text-sm font-medium active:scale-[0.98] transition-all"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
