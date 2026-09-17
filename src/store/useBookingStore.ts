import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ServiceSpec =
  | 'Clinical Dermatology'
  | 'Advanced Laser Treatments'
  | 'Trichology & Hair Restoration'
  | 'Anti-Aging & Medical Aesthetics'
  | 'Pigmentation & Scar Revision'
  | 'General Dermatological Consultation';

export interface Booking {
  id: string;
  patientName: string;
  phone: string;
  service: ServiceSpec;
  date: string;
  timeKey: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  note?: string;
  createdAt: number;
}

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  updateStatus: (id: string, status: Booking['status']) => void;
  clearBookings: () => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookings: [
        {
          id: 'demo-1',
          patientName: 'Radha Krishna M.',
          phone: '+91 98480 88219',
          service: 'Trichology & Hair Restoration',
          date: new Date().toISOString().split('T')[0],
          timeKey: '11:30 AM',
          status: 'Confirmed',
          note: 'PRP scalp consultation and hair thinning analysis',
          createdAt: Date.now() - 1000 * 60 * 120,
        },
        {
          id: 'demo-2',
          patientName: 'Pooja Varma',
          phone: '+91 99890 14522',
          service: 'Pigmentation & Scar Revision',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          timeKey: '04:15 PM',
          status: 'Pending',
          note: 'Stubborn melasma and post-acne pigmentation',
          createdAt: Date.now() - 1000 * 60 * 45,
        },
        {
          id: 'demo-3',
          patientName: 'Karthik Somayajula',
          phone: '+91 94401 56321',
          service: 'Advanced Laser Treatments',
          date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
          timeKey: '06:00 PM',
          status: 'Pending',
          note: 'Q-Switched Nd:YAG laser assessment for tattoo and spots',
          createdAt: Date.now() - 1000 * 60 * 15,
        },
      ],
      addBooking: (booking) =>
        set((state) => ({
          bookings: [
            {
              ...booking,
              id: `bk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
              status: 'Pending',
              createdAt: Date.now(),
            },
            ...state.bookings,
          ],
        })),
      updateStatus: (id, status) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status } : b
          ),
        })),
      clearBookings: () => set({ bookings: [] }),
    }),
    {
      name: 'skinshine-bookings-store',
    }
  )
);
