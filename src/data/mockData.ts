export const mockRequest = {
  id: "GU-2026-0142",
  category: "Vendor Procurement",
  city: "Lucknow",
  budget: 300000,
  timeline: "2 weeks",
  services: "Chair supply + delivery",
  quantity: "500 units",
  assumptions: [
    { id: 1, text: "Delivery within Lucknow city limits", confidence: "HIGH" },
    { id: 2, text: "Standard office chairs (not premium)", confidence: "HIGH" },
    { id: 3, text: "Payment terms: 50% advance, 50% delivery", confidence: "HIGH" }
  ],
  needsReview: [
    { id: 1, text: "Confirm: branded or generic chairs?" }
  ]
};

export const mockCandidates = [
  { id: "c1", name: "Sharma Furniture Co.", score: 87, quote: 240000, benchmark: "mid", risk: "low", source: "IndiaMart", shortlisted: true },
  { id: "c2", name: "Regal Event Supplies", score: 82, quote: 210000, benchmark: "low", risk: "medium", source: "Google Maps", shortlisted: true },
  { id: "c3", name: "Delhi Chair Mart", score: 79, quote: 280000, benchmark: "high", risk: "low", source: "Internal DB", shortlisted: true },
  { id: "c4", name: "Gupta Interiors", score: 74, quote: 260000, benchmark: "mid", risk: "medium", source: "IndiaMart", shortlisted: true },
  { id: "c5", name: "National Seating Corp.", score: 68, quote: 310000, benchmark: "high", risk: "high", source: "JustDial", shortlisted: false },
  { id: "c6", name: "Lucknow Office Needs", score: 85, quote: 235000, benchmark: "mid", risk: "low", source: "IndiaMart", shortlisted: true }
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
