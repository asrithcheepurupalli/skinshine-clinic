"use client";

import { Star, CheckCircle, Quote } from "lucide-react";

interface Review {
  name: string;
  location: string;
  treatment: string;
  source: "Practo Verified Patient" | "Google Review";
  comment: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    name: "Sowmya K.",
    location: "MVP Colony, Vizag",
    treatment: "Persistent Acne & Chemical Peels",
    source: "Practo Verified Patient",
    rating: 5,
    comment: "Dr. Jyothsna takes time to listen to your entire routine before prescribing anything. Her targeted acne treatment and peel sessions completely cleared my 3 year cystic acne without heavy oral side effects."
  },
  {
    name: "Ravi Teja V.",
    location: "Siripuram, Vizag",
    treatment: "Scalp PRP & Trichology",
    source: "Google Review",
    rating: 5,
    comment: "The clinic setup at VIP Towers is pristine. Doctor Jyothsna explained the real science behind my hair thinning instead of pushing fake guarantees. 4 months into GFC therapy and the density improvement is visible."
  },
  {
    name: "Deepika Ch.",
    location: "Seethammadhara, Vizag",
    treatment: "Melasma & Pigmentation",
    source: "Practo Verified Patient",
    rating: 5,
    comment: "I visited multiple clinics across Vizag for facial melasma with zero results. Dr. Jyothsna structured a customized laser toning and sunscreen protocol that reduced my pigmentation by 80% within 10 weeks."
  },
  {
    name: "M. Harish",
    location: "Waltair Uplands, Vizag",
    treatment: "USFDA Laser Hair Removal",
    source: "Google Review",
    rating: 5,
    comment: "Very professional laser suite with high-end cooling systems. Absolutely zero pain during beard shaping laser sessions. Highly recommended for men looking for clean grooming."
  },
  {
    name: "Pravallika N.",
    location: "Gajuwaka, Vizag",
    treatment: "Post-Acne Scar Revision",
    source: "Practo Verified Patient",
    rating: 5,
    comment: "Doctor's honesty is what sets Skinshine apart. She clearly laid out the timeline for microneedling RF and fractional resurfacing. Skin texture feels completely restored and smooth."
  },
  {
    name: "Venkata Raman",
    location: "Dwaraka Nagar, Vizag",
    treatment: "Skin Allergy & Eczema",
    source: "Practo Verified Patient",
    rating: 5,
    comment: "Accurate diagnosis on my severe chronic dermatitis on hands. Within one week of follow-up medication and barrier creams, the inflammation subsided completely."
  }
];

export default function ReviewWall() {
  return (
    <section className="py-24 bg-[#FAF9F6] border-t border-stone-200/80">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            <Star className="w-3.5 h-3.5 fill-gold" />
            <span>4.5 / 5 on Practo • 91% Patient Recommendation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-stone-900 mb-4">
            Patient stories anchored in real clinical results.
          </h2>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            Read firsthand accounts from patients across Visakhapatnam who trusted Dr. Mettu Jyothsna for clinical and aesthetic skin care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md hover:border-gold/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {review.source}
                  </span>
                </div>
                <p className="text-stone-700 text-xs md:text-sm leading-relaxed mb-6 font-normal">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-stone-900 text-sm">{review.name}</h4>
                  <span className="text-[11px] text-stone-400">{review.location}</span>
                </div>
                <span className="text-[11px] font-medium text-gold bg-gold/10 rounded-md px-2 py-1">
                  {review.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
