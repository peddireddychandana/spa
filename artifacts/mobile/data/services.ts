export type Service = {
  id: string;
  name: string;
  icon: string;
  gradientColors: [string, string];
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  options: string[];
};

export const SERVICES: Service[] = [
  {
    id: "hair",
    name: "Hair Styling",
    icon: "scissors",
    gradientColors: ["#8B6914", "#C9A84C"],
    description: "Expert cuts, colour treatments, and styling for every occasion.",
    longDescription:
      "Our master stylists craft bespoke hair experiences tailored to your unique features. From precision cuts to transformative colour journeys, every session is an art form.",
    price: "From AED 150",
    duration: "60–120 min",
    options: [
      "Haircut & Blow Dry",
      "Hair Colour",
      "Balayage & Highlights",
      "Keratin Treatment",
      "Hair Extensions",
      "Deep Conditioning",
    ],
  },
  {
    id: "makeup",
    name: "Makeup & Beauty",
    icon: "star",
    gradientColors: ["#7B3F5E", "#B76E79"],
    description: "Flawless looks from soft glam to full editorial artistry.",
    longDescription:
      "Our beauty artists combine technique with intuition, creating looks that feel as beautiful as they appear. Using only luxury professional-grade products.",
    price: "From AED 250",
    duration: "45–90 min",
    options: [
      "Natural Day Look",
      "Evening Glam",
      "Airbrush Makeup",
      "HD Makeup",
      "Lash Application",
      "Brow Sculpting",
    ],
  },
  {
    id: "bridal",
    name: "Bridal Packages",
    icon: "heart",
    gradientColors: ["#6D3B47", "#C9A84C"],
    description: "Complete transformations for the most important day of your life.",
    longDescription:
      "Your wedding day deserves nothing less than perfection. Our bridal team accompanies you from trial to wedding day, ensuring every detail is flawless.",
    price: "From AED 800",
    duration: "3–6 hours",
    options: [
      "Bridal Trial",
      "Wedding Day Makeup",
      "Bridal Hair",
      "Mehendi Application",
      "Pre-Bridal Skincare",
      "On-Location Service",
    ],
  },
  {
    id: "spa",
    name: "Spa & Massage",
    icon: "wind",
    gradientColors: ["#2C4A3E", "#4A8C7A"],
    description: "Therapeutic massages to restore, rejuvenate, and realign.",
    longDescription:
      "Step into a sanctuary of stillness. Our therapists blend ancient techniques with modern wellness science for a deeply restorative experience.",
    price: "From AED 350",
    duration: "60–120 min",
    options: [
      "Swedish Massage",
      "Deep Tissue",
      "Hot Stone Therapy",
      "Aromatherapy",
      "Couples Massage",
      "Foot Reflexology",
    ],
  },
  {
    id: "skincare",
    name: "Skincare Treatments",
    icon: "droplet",
    gradientColors: ["#3D5A80", "#6B9CC4"],
    description: "Advanced facials and skin rituals for luminous, healthy skin.",
    longDescription:
      "Combining cutting-edge technology with luxurious formulations, our skincare specialists design personalised protocols for transformative results.",
    price: "From AED 300",
    duration: "60–90 min",
    options: [
      "Hydrating Facial",
      "Anti-Ageing Treatment",
      "Chemical Peel",
      "Microdermabrasion",
      "LED Light Therapy",
      "Oxygen Infusion",
    ],
  },
  {
    id: "nails",
    name: "Manicure & Pedicure",
    icon: "feather",
    gradientColors: ["#6B4F6E", "#A67FA6"],
    description: "Luxurious nail care with impeccable artistry and lasting results.",
    longDescription:
      "Indulge in an elevated nail experience. From classic elegance to intricate nail art, our technicians transform your hands and feet into works of art.",
    price: "From AED 120",
    duration: "45–90 min",
    options: [
      "Classic Manicure",
      "Gel Manicure",
      "Classic Pedicure",
      "Spa Pedicure",
      "Nail Art",
      "Shellac Application",
    ],
  },
  {
    id: "waxing",
    name: "Waxing & Grooming",
    icon: "zap",
    gradientColors: ["#7A5C3A", "#C9A84C"],
    description: "Smooth, precise hair removal in a private, luxurious setting.",
    longDescription:
      "Using premium waxes and expert technique, our therapists deliver flawlessly smooth results with minimal discomfort, in fully private treatment rooms.",
    price: "From AED 80",
    duration: "20–60 min",
    options: [
      "Full Body Wax",
      "Brazilian Wax",
      "Upper Lip & Chin",
      "Eyebrow Threading",
      "Full Face Threading",
      "Arms & Legs",
    ],
  },
];

export const BRIDAL_PACKAGES = [
  {
    id: "essentials",
    name: "Bridal Essentials",
    price: "AED 800",
    tag: "Perfect Start",
    color: "#C9A84C",
    includes: [
      "Bridal Makeup",
      "Bridal Hairstyling",
      "Pre-Bridal Facial",
      "Eyebrow Shaping",
      "Nail Polish",
    ],
  },
  {
    id: "signature",
    name: "Signature Bride",
    price: "AED 1,800",
    tag: "Most Popular",
    color: "#B76E79",
    includes: [
      "Everything in Essentials",
      "Bridal Trial Session",
      "Full Body Wax",
      "Mehendi Application",
      "Bridal Pedicure",
      "Airbrush Makeup Upgrade",
      "False Lash Application",
    ],
  },
  {
    id: "premier",
    name: "Premier Experience",
    price: "AED 3,500",
    tag: "Ultimate Luxury",
    color: "#8B6914",
    includes: [
      "Everything in Signature",
      "2x Trial Sessions",
      "On-Location Service",
      "Gold Facial Treatment",
      "Full Body Massage",
      "Crystal Nail Art",
      "Day-After Touch-Up",
      "Dedicated Bridal Team",
    ],
  },
];
