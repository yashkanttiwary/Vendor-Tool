export const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const isValidCity = (city: string): boolean => {
  // Allow letters, spaces, hyphens, commas, periods. Max length 100.
  return /^[a-zA-Z\s,\.-]{0,100}$/.test(city);
};

export const isValidBudget = (budget: string): boolean => {
  // Allow numbers, commas, periods, currency symbols. Max length 50.
  return /^[\d\s,\.₹$€£]{0,50}$/.test(budget);
};

export const isValidTimeline = (timeline: string): boolean => {
  // Allow alphanumeric, spaces, hyphens, commas. Max length 100.
  return /^[a-zA-Z0-9\s,-]{0,100}$/.test(timeline);
};
