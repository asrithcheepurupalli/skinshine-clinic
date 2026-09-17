"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Star,
  Award,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  Microscope,
  Stethoscope,
  HeartHandshake,
  Activity,
  ArrowRight,
} from "lucide-react";
import BookingFlow from "@/components/BookingFlow";
import GalleryTour from "@/components/GalleryTour";
import ReviewWall from "@/components/ReviewWall";
import { ServiceSpec } from "@/store/useBookingStore";

const TREATMENTS: {
  title: string;
  category: string;
  image: string;
  desc: string;
  serviceKey: ServiceSpec;
  benefits: string[];
}[] = [
  {
    title: "Clinical Dermatology & Severe Acne",
    category: "Medical Care",
    image: "/assets/svc-acne.webp",
    desc: "Targeted medical management for cystic acne, hormonal breakouts, rosacea, and recurring skin inflammation.",
    serviceKey: "Clinical Dermatology",
    benefits: ["Root cause hormone & microbiome analysis", "Zero long-term scarring protocols", "Evidence-based topicals & oral regimen"]
  },
  {
    title: "USFDA Laser Hair Reduction",
    category: "Laser Aesthetics",
    image: "/assets/svc-laser.webp",
    desc: "Triple-wavelength laser technology with dynamic contact cooling for safe, permanent hair reduction on Indian skin tones.",
    serviceKey: "Advanced Laser Treatments",
    benefits: ["Painless contact cooling technology", "Effective on fine and coarse hair", "Zero downtime between sessions"]
  },
  {
    title: "Advanced Trichology & Hair PRP/GFC",
    category: "Hair Restoration",
    image: "/assets/svc-hair.webp",
    desc: "Autologous Growth Factor Concentrate (GFC) and Hair PRP therapies for androgenetic alopecia and telogen effluvium.",
    serviceKey: "Trichology & Hair Restoration",
    benefits: ["Computerized scalp densitometry", "Concentrated autologous growth factors", "Noticeable hair follicle revival"]
  },
  {
    title: "Melasma & Stubborn Pigmentation",
    category: "Clinical Brightening",
    image: "/assets/svc-pigmentation.webp",
    desc: "Targeted laser toning, dermatological chemical peels, and tyrosinase inhibitors for deep epidermal & dermal melasma.",
    serviceKey: "Pigmentation & Scar Revision",
    benefits: ["Q-Switched Nd:YAG laser toning", "Customized medical chemical peels", "Relapse-prevention sun protection plan"]
  },
  {
    title: "Post-Acne Scar Revision & MNRF",
    category: "Skin Resurfacing",
    image: "/assets/svc-scars.webp",
    desc: "Combination therapy utilizing Microneedling Radiofrequency (MNRF), subcision, and TCA Cross for boxcar and icepick scars.",
    serviceKey: "Pigmentation & Scar Revision",
    benefits: ["Deep collagen remodeling", "Subcision for tethered rolling scars", "Minimally invasive with rapid recovery"]
  },
  {
    title: "Anti-Aging & Collagen Induction",
    category: "Medical Aesthetics",
    image: "/assets/svc-antiaging.webp",
    desc: "Non-surgical skin tightening, fine line smoothing, and cellular rejuvenation protocols tailored to age-related volume loss.",
    serviceKey: "Anti-Aging & Medical Aesthetics",
    benefits: ["Natural, unexaggerated facial harmony", "Dermal elasticity restoration", "Personalized long-term maintenance"]
  },
  {
    title: "Medical Medi-Facials & Glow Therapy",
    category: "Aesthetic Wellness",
    image: "/assets/svc-cosmetic.webp",
    desc: "Clinical-grade hydra-infusion, oxygenation, and antioxidant delivery for immediate luminosity before events.",
    serviceKey: "Anti-Aging & Medical Aesthetics",
    benefits: ["Deep pore vacuum extraction", "Hyaluronic acid and peptide infusion", "Instant barrier hydration"]
  },
  {
    title: "Eczema, Psoriasis & Chronic Allergies",
    category: "Clinical Care",
    image: "/assets/svc-allergy.webp",
    desc: "Long-term disease management, biological therapy guidance, and barrier repair for allergic contact dermatitis.",
    serviceKey: "Clinical Dermatology",
    benefits: ["Accurate patch test assessments", "Steroid-sparing maintenance plans", "Relief from chronic itch and flares"]
  },
  {
    title: "Precision Mole, Wart & Tag Removal",
    category: "Dermatosurgery",
    image: "/assets/svc-moles.webp",
    desc: "Radiofrequency electrocautery and precision excision for benign skin growths with zero stitch marks.",
    serviceKey: "General Dermatological Consultation",
    benefits: ["Single-session radiofrequency excision", "Minimal to no scar formation", "Histopathology testing when indicated"]
  }
];

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceSpec | undefined>(undefined);

  const openBookingWithService = (service?: ServiceSpec) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-stone-200">
      {/* Top Notification Bar */}
      <div className="bg-stone-900 text-stone-300 py-2.5 px-6 text-xs text-center border-b border-stone-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-stone-300 font-normal">
              Dr. Mettu Jyothsna is consulting today at VIP Towers, Siripuram.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-stone-400">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold" /> +91 99499 71818
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold" /> 10:30 AM to 08:30 PM
            </span>
            <Link
              href="/admin"
              className="text-[11px] text-gold hover:underline font-medium"
            >
              Clinic Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold/40 shadow-sm bg-white p-1">
              <Image
                src="/assets/favicon.png"
                alt="Skinshine Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <span className="font-serif text-xl tracking-tight text-stone-900 block font-normal">
                Skinshine
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-gold block -mt-1">
                Skin and Hair Clinic
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-stone-600">
            <a href="#about" className="hover:text-stone-900 transition-colors">
              About Dr. Jyothsna
            </a>
            <a href="#treatments" className="hover:text-stone-900 transition-colors">
              Clinical Treatments
            </a>
            <a href="#facility" className="hover:text-stone-900 transition-colors">
              Clinic Tour
            </a>
            <a href="#reviews" className="hover:text-stone-900 transition-colors">
              Patient Reviews
            </a>
            <a href="#location" className="hover:text-stone-900 transition-colors">
              Directions
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919949971818"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-stone-500" />
              <span>Call Clinic</span>
            </a>
            <button
              onClick={() => openBookingWithService()}
              className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium tracking-wide shadow-sm hover:shadow active:scale-95 transition-all"
            >
              Book Consultation (₹600)
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium mb-6">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>18+ Years Experience • 4.5/5 Practo Verified</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 tracking-tight leading-[1.15] mb-6 font-normal">
                Clinical precision meets aesthetic mastery for your skin and hair.
              </h1>

              <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-xl mb-8 font-light">
                Led personally by <strong className="text-stone-900 font-medium">Dr. Mettu Jyothsna</strong> (MBBS, MD DVL). We combine rigorous medical dermatology with world-class USFDA laser technology at VIP Towers, Siripuram.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
                <button
                  onClick={() => openBookingWithService()}
                  className="px-7 py-4 rounded-full bg-stone-900 text-white text-xs md:text-sm font-medium tracking-wide shadow-lg hover:bg-stone-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>Reserve Consultation • ₹600</span>
                </button>
                <a
                  href="#treatments"
                  className="px-6 py-4 rounded-full bg-white border border-stone-200 text-stone-800 text-xs md:text-sm font-medium hover:bg-stone-50 active:scale-[0.98] transition-all text-center"
                >
                  Explore Treatment Protocols
                </a>
              </div>

              {/* Trust Metric Badges */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-200 w-full max-w-lg">
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-medium text-stone-900 block">
                    18+
                  </span>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block mt-0.5">
                    Years in Vizag
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-medium text-stone-900 block">
                    15,000+
                  </span>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block mt-0.5">
                    Treated Patients
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-medium text-stone-900 block">
                    91%
                  </span>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block mt-0.5">
                    Recommendation
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Doctor Portrait Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                {/* Decorative Frame */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-gold/20 via-stone-200/50 to-gold/10 -z-10 blur-sm" />

                <div className="rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-xl relative">
                  <div className="relative aspect-[3/4] w-full bg-stone-100">
                    <Image
                      src="/assets/dr-jyothsna.webp"
                      alt="Dr. Mettu Jyothsna"
                      fill
                      priority
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                    {/* Floating Experience Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200 shadow-sm flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-gold" />
                      <span className="text-[11px] font-semibold text-stone-900">
                        18+ Years Specialist
                      </span>
                    </div>

                    {/* Bottom Bio in Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-serif text-xl font-medium text-white">
                        Dr. Mettu Jyothsna
                      </h3>
                      <p className="text-xs text-stone-300 font-light mt-0.5">
                        MBBS, MD (Dermatology, Venereology & Leprosy)
                      </p>
                      <p className="text-[11px] text-gold mt-1 font-medium">
                        Chief Dermatologist, Trichologist & Cosmetologist
                      </p>
                    </div>
                  </div>

                  {/* Quick Card Details */}
                  <div className="p-5 bg-white flex items-center justify-between text-xs border-t border-stone-100">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                        Location
                      </span>
                      <span className="font-medium text-stone-800">
                        VIP Towers, Siripuram
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                        Consultation
                      </span>
                      <span className="font-medium text-stone-900">
                        ₹600 Direct with Doctor
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Doctor & Philosophy */}
      <section id="about" className="py-20 bg-white border-y border-stone-200/80">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 aspect-[4/5] shadow-lg">
                <Image
                  src="/assets/gallery-chamber.webp"
                  alt="Doctor Consultation Suite"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold block mb-1">
                    Clinical Chamber
                  </span>
                  <p className="text-xs text-stone-200">
                    Equipped with high-resolution digital dermoscopy for accurate diagnosis of skin and scalp layers.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold block mb-3">
                Clinical Leadership
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight mb-6">
                Root-cause medical analysis before aesthetic intervention.
              </h2>
              <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-6 font-light">
                With over 18 years of specialized dermatology practice in Visakhapatnam, <strong className="text-stone-900 font-medium">Dr. Mettu Jyothsna</strong> has built Skinshine Skin & Hair Clinic as a trusted destination for patients dealing with complex dermatoses, hair thinning, and stubborn pigmentation.
              </p>
              <p className="text-stone-600 text-sm leading-relaxed mb-8 font-light">
                We believe skin health is deeply personal. Rather than one-size-fits-all packages or aggressive upselling, every treatment protocol begins with a comprehensive medical evaluation of your skin barrier, hormonal profile, and lifestyle triggers.
              </p>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-stone-200/80">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 text-gold flex items-center justify-center mb-3">
                    <Microscope className="w-4 h-4" />
                  </div>
                  <h4 className="font-medium text-stone-900 text-sm mb-1">
                    Diagnostic Precision
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Digital dermoscopy and clinical tests to identify exact pathological causes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-stone-200/80">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 text-gold flex items-center justify-center mb-3">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="font-medium text-stone-900 text-sm mb-1">
                    USFDA Laser Fleet
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Internationally approved laser wavelengths optimized specifically for Indian skin.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-stone-200/80">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 text-gold flex items-center justify-center mb-3">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <h4 className="font-medium text-stone-900 text-sm mb-1">
                    Direct Doctor Oversight
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Dr. Jyothsna personally supervises every consultation and laser energy calibration.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-stone-200/80">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 text-gold flex items-center justify-center mb-3">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <h4 className="font-medium text-stone-900 text-sm mb-1">
                    Honest Timelines
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Clear recovery expectations with zero exaggerated claims or unnecessary sessions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Portfolio */}
      <section id="treatments" className="py-24 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold block mb-3">
                Clinical and Aesthetic Domains
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-stone-900 mb-4">
                Specialized dermatological care tailored to you.
              </h2>
              <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                Explore our comprehensive clinical and aesthetic therapies performed with medical sterility and precision.
              </p>
            </div>
            <button
              onClick={() => openBookingWithService()}
              className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium tracking-wide shrink-0 active:scale-95 transition-transform self-start md:self-auto"
            >
              Consult Dr. Jyothsna
            </button>
          </div>

          {/* Treatments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {TREATMENTS.map((treatment, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:border-gold/60 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={treatment.image}
                      alt={treatment.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-stone-800 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-200 shadow-sm">
                        {treatment.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-lg text-stone-900 group-hover:text-gold transition-colors mb-2">
                      {treatment.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {treatment.desc}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-stone-100">
                      {treatment.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-[11px] text-stone-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => openBookingWithService(treatment.serviceKey)}
                    className="w-full py-2.5 rounded-xl bg-stone-50 hover:bg-stone-900 hover:text-white border border-stone-200 text-stone-800 text-xs font-medium transition-all flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>Reserve Treatment</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility & Technology Tour */}
      <GalleryTour />

      {/* Patient Reviews */}
      <ReviewWall />

      {/* Location, Contact & Hours Section */}
      <section id="location" className="py-24 bg-white border-t border-stone-200/80">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Info */}
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold block mb-3">
                Visit Skinshine Clinic
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight mb-6">
                Centrally located in Siripuram, Visakhapatnam.
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed mb-8 font-light">
                Our clinic is conveniently situated on the 2nd Floor of VIP Towers on VIP Road, right beside Paradise Hotel, providing ample parking and discreet private access.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200/80">
                  <div className="w-10 h-10 rounded-xl bg-stone-900 text-gold flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 text-sm mb-1">
                      Clinic Address
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      #209, 2nd Floor, VIP Towers, VIP Road, beside Paradise Hotel, Siripuram / Dwaraka Nagar, Visakhapatnam, Andhra Pradesh 530003
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200/80">
                  <div className="w-10 h-10 rounded-xl bg-stone-900 text-gold flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 text-sm mb-1">
                      Consultation Hours
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      <strong className="text-stone-900">Monday to Saturday:</strong> 10:30 AM to 01:30 PM & 05:00 PM to 08:30 PM
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                      <strong className="text-stone-900">Sunday:</strong> 11:00 AM to 01:00 PM (Prior Appointment Only)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200/80">
                  <div className="w-10 h-10 rounded-xl bg-stone-900 text-gold flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 text-sm mb-1">
                      Helplines and WhatsApp
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Mobile & WhatsApp: <a href="tel:+919949971818" className="text-stone-900 font-medium hover:underline">+91 99499 71818</a>
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Landline: <a href="tel:08912718181" className="text-stone-900 font-medium hover:underline">0891-2718181</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <a
                  href="https://maps.google.com/?q=Skinshine+Skin+and+Hair+Clinic+VIP+Towers+Siripuram+Visakhapatnam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium tracking-wide shadow-md active:scale-95 transition-all inline-flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
                <a
                  href="https://wa.me/919949971818?text=Hello%20Dr.%20Jyothsna%2C%20I%20would%20like%20to%20inquire%20about%20a%20skin%20consultation%20at%20Skinshine%20Clinic."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium tracking-wide shadow-md active:scale-95 transition-all inline-flex items-center gap-2"
                >
                  <span>WhatsApp Clinic</span>
                </a>
              </div>
            </div>

            {/* Right Booking Callout Box */}
            <div className="lg:col-span-6 bg-stone-900 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden border border-stone-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

              <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold block mb-3">
                Seamless Patient Registration
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-4">
                Reserve your consultation with Dr. Mettu Jyothsna today.
              </h3>
              <p className="text-stone-400 text-xs md:text-sm leading-relaxed mb-8">
                Select your preferred date and time slot. Our team verifies appointments instantly and shares direct clinic instructions over WhatsApp.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-xs text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Personal 30 to 45 min consultation with Dr. Jyothsna</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Standard transparent consultation fee of ₹600</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Zero waiting queue with reserved slot priority</span>
                </div>
              </div>

              <button
                onClick={() => openBookingWithService()}
                className="w-full py-4 rounded-xl bg-gold hover:bg-gold-light text-stone-950 font-semibold text-xs md:text-sm tracking-wide shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Reserve Appointment Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800 text-xs">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold/40 bg-white p-0.5">
                  <Image
                    src="/assets/favicon.png"
                    alt="Skinshine Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-serif text-lg text-white font-normal">
                  Skinshine Skin & Hair Clinic
                </span>
              </div>
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed mb-4">
                Premier clinical dermatology, advanced USFDA laser therapies, and trichology in Visakhapatnam led by Dr. Mettu Jyothsna (MBBS, MD DVL).
              </p>
              <div className="text-[11px] text-stone-500">
                #209, 2nd Floor, VIP Towers, VIP Road, Siripuram, Visakhapatnam
              </div>
            </div>

            <div>
              <h5 className="text-white text-xs uppercase font-semibold tracking-wider mb-4">
                Clinical Domains
              </h5>
              <ul className="space-y-2 text-stone-400 text-xs">
                <li><a href="#treatments" className="hover:text-white transition-colors">Clinical Acne & Eczema</a></li>
                <li><a href="#treatments" className="hover:text-white transition-colors">USFDA Laser Hair Removal</a></li>
                <li><a href="#treatments" className="hover:text-white transition-colors">Hair PRP & GFC Scalp Care</a></li>
                <li><a href="#treatments" className="hover:text-white transition-colors">Melasma & Scar Revision</a></li>
                <li><a href="#treatments" className="hover:text-white transition-colors">Medi-Facials & Glow</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white text-xs uppercase font-semibold tracking-wider mb-4">
                Clinic Portal
              </h5>
              <ul className="space-y-2 text-stone-400 text-xs">
                <li>
                  <Link href="/admin" className="text-gold hover:underline">
                    Reception Triage Dashboard
                  </Link>
                </li>
                <li>
                  <a href="tel:+919949971818" className="hover:text-white transition-colors">
                    Emergency Helpline (+91 99499 71818)
                  </a>
                </li>
                <li>
                  <a href="tel:08912718181" className="hover:text-white transition-colors">
                    Desk: 0891-2718181
                  </a>
                </li>
                <li>
                  <a href="mailto:dr.jyothsna@gmail.com" className="hover:text-white transition-colors">
                    dr.jyothsna@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
            <div>
              © {new Date().getFullYear()} Skinshine Skin and Hair Clinic. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-stone-400">
              <span>Crafted for clinical excellence by</span>
              <a
                href="https://made-by-ac.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline font-medium"
              >
                made. by ac
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal Flow */}
      <BookingFlow
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
