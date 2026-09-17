"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Award, Microscope, Maximize2, X } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Sanctuary" | "Diagnostics" | "Laser Suite" | "Clinical Suites";
  image: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "reception",
    title: "Reception & Hospitality Lounge",
    subtitle: "VIP Towers, Siripuram",
    category: "Sanctuary",
    image: "/assets/gallery-reception.webp",
    description: "Designed for immediate serenity and unhurried consultation intake, maintaining strict patient discretion and hygiene."
  },
  {
    id: "chamber",
    title: "Chief Doctor Consultation Suite",
    subtitle: "Dr. Mettu Jyothsna's Chamber",
    category: "Diagnostics",
    image: "/assets/gallery-chamber.webp",
    description: "Equipped with computerized dermoscopy and clinical lighting for root-cause diagnosis of chronic dermatoses and scalp conditions."
  },
  {
    id: "laser",
    title: "Advanced Laser Procedure Theatre",
    subtitle: "USFDA Standard Laser Suite",
    category: "Laser Suite",
    image: "/assets/gallery-laser.webp",
    description: "Dedicated sterile zone housing USFDA-cleared multi-wavelength diode lasers, Q-Switched Nd:YAG, and fractional resurfacing platforms."
  },
  {
    id: "treatment",
    title: "Clinical Treatment & Medi-Facial Chamber",
    subtitle: "Aesthetic Procedure Suite",
    category: "Clinical Suites",
    image: "/assets/gallery-treatment.webp",
    description: "Individualized aesthetic bays tailored for hydra-dermabrasion, advanced chemical peels, and collagen induction protocols."
  },
  {
    id: "suite",
    title: "Trichology & Hair Restoration Room",
    subtitle: "Sterile Hair PRP & GFC Facility",
    category: "Clinical Suites",
    image: "/assets/gallery-suite.webp",
    description: "Centrifuge and micro-needling setup for autologous growth factor concentrate (GFC) and scalp biostimulation therapies."
  }
];

export default function GalleryTour() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = ["All", "Sanctuary", "Diagnostics", "Laser Suite", "Clinical Suites"];

  const filteredItems = activeTab === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-semibold block mb-3">
            State-of-the-Art Clinical Sanctuary
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white mb-4">
            A look inside our Siripuram facility.
          </h2>
          <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">
            Engineered to hospital-grade sterility standards while offering an unhurried, private aesthetic environment in the heart of Visakhapatnam.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4.5 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === cat
                  ? "bg-gold text-stone-900 font-semibold shadow-lg shadow-gold/20"
                  : "bg-stone-800/80 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden bg-stone-800/60 border border-stone-800 hover:border-gold/50 transition-all cursor-pointer shadow-xl flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-gold" />
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-stone-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-gold/20">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg text-white group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-400 font-medium mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
                <p className="text-xs text-stone-400 mt-3 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlights Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-stone-800 text-center">
          <div>
            <span className="font-serif text-3xl md:text-4xl text-gold font-light block">18+</span>
            <span className="text-xs text-stone-400 mt-1 block uppercase tracking-wider">Years of Practice</span>
          </div>
          <div>
            <span className="font-serif text-3xl md:text-4xl text-gold font-light block">15,000+</span>
            <span className="text-xs text-stone-400 mt-1 block uppercase tracking-wider">Treated Patients</span>
          </div>
          <div>
            <span className="font-serif text-3xl md:text-4xl text-gold font-light block">100%</span>
            <span className="text-xs text-stone-400 mt-1 block uppercase tracking-wider">USFDA Approved Tech</span>
          </div>
          <div>
            <span className="font-serif text-3xl md:text-4xl text-gold font-light block">4.5 / 5</span>
            <span className="text-xs text-stone-400 mt-1 block uppercase tracking-wider">Practo Verified Score</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl"
            >
              <div className="relative aspect-[16/10] w-full bg-stone-950">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-white active:scale-95 transition-transform"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 md:p-8 bg-stone-900">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="font-serif text-xl md:text-2xl text-white">
                    {selectedPhoto.title}
                  </h3>
                  <span className="text-xs text-gold uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
                    {selectedPhoto.category}
                  </span>
                </div>
                <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                  {selectedPhoto.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
