/**
 * Short recommendations from colleagues or managers — real quotes only, with their permission
 * (e.g. copied from LinkedIn recommendations). The section stays hidden while this list is empty.
 * Quotes are shown in their original language on every locale.
 */
export type Recommendation = {
  quote: string;
  name: string;
  role: string; // e.g. "Engineering Manager, Acme"
  url?: string; // e.g. LinkedIn profile or the recommendation itself
};

export const recommendations: Recommendation[] = [];
