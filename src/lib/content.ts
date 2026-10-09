export const contact = {
  phone: '+91 93937 76776', tel: '+919393776776', whatsapp: '919393776776',
  email: 'rk@bestmark.in', address: '1510, 15th Floor, Vasavi Sky City, Gachibowli, Hyderabad',
};
// Project facts adapted from the official URLs supplied on 6 October 2026.
export const projects = [
  {
    slug: 'fortune-towers', name: 'Fortune Towers', type: 'Residences',
    location: 'Mallampet', corridor: 'West Hyderabad', exit: 'ORR Exit 4A',
    image: '/images/fortune-towers.webp', developer: 'See official project information',
    tagline: 'A little more room for life.',
    description: 'A gated community near Mallampet’s ORR Exit 4A. Five acres bring together 2 and 3 BHK apartments, landscaped recreation areas and a dedicated clubhouse.',
    details: ['2 & 3 BHK · 1,000–2,000 sq.ft.', '5 acres · 5 towers', '430 apartments · Stilt + 5 floors', '39,000+ sq.ft. indoor & outdoor amenities'],
    focus: 'Connected community living',
  },
  {
    slug: 'lios-premium-villas', name: 'LIOS Premium Villas', type: 'Villas',
    location: 'Tukkuguda', corridor: 'South Hyderabad', exit: 'ORR Exit 14',
    image: '/images/lios-villas.webp', developer: 'Grupe Nayan',
    tagline: 'Space to live exceptionally.',
    description: 'Grupe Nayan’s luxury villa community in Tukkuguda pairs high-ceilinged interiors and generous balconies with landscaped pathways and a clubhouse, close to the airport corridor.',
    details: ['Luxury villas by Grupe Nayan', 'Tukkuguda · ORR Exit 14', 'High ceilings · Wide balconies', 'Clubhouse · Landscaped outdoor spaces'],
    focus: 'Private, spacious villa living',
  },
  {
    slug: 'the-harvest', name: 'The Harvest', type: 'Commercial',
    location: 'Kokapet', corridor: 'West Hyderabad', exit: 'ORR Exit 1',
    image: '/images/harvest.webp', developer: 'Pooja Crafted Homes',
    tagline: 'A new perspective on business.',
    description: 'Pooja Crafted Homes’ Grade-A commercial address in Kokapet combines a gold-toned façade, generous office floors and landscaped shared spaces near the Financial District and Kokapet Lake.',
    details: ['Grade-A commercial office space', '1.6 million sq.ft. · 35 floors*', 'Floor plates: 46,000–55,000 sq.ft.*', 'Kokapet · Near ORR Exit 1'],
    focus: 'A well-connected business address',
  },
] as const;
export type Project = typeof projects[number];
export const insights = [
  { slug: 'west-hyderabad', category: 'CORRIDOR GUIDE', title: 'The west. Where the city moves forward.', summary: 'A closer look at Kokapet, Gachibowli and the established business corridor.', paragraphs: ['West Hyderabad brings together employment centres, established residential neighbourhoods and an evolving commercial landscape. Kokapet, Gachibowli and the Financial District each offer a different starting point for a property search.', 'Location is only the beginning. Compare access routes, daily commute, surrounding infrastructure and the actual stage of development. Two properties in the same corridor can offer very different experiences.', 'Our approach starts with your purpose: a home to live in, an office to use, or a property to hold. We then help you compare project documents, developer information and the suitability of the location.'] },
  { slug: 'south-hyderabad', category: 'LOCATION PERSPECTIVE', title: 'The south. A longer view of opportunity.', summary: 'Understanding Tukkuguda, the airport corridor and the importance of context.', paragraphs: ['South Hyderabad’s property landscape is shaped by the airport, Outer Ring Road and expanding neighbourhoods such as Tukkuguda. It offers a different setting from the established western business district.', 'Assess what exists today alongside what is proposed. Road access, civic services and the maturity of the surrounding neighbourhood deserve as much attention as a master plan.', 'A longer holding horizon does not remove the need for careful due diligence. Check title documents, applicable approvals, project registration and the practical fit with your plans before deciding.'] },
  { slug: 'choosing-a-property', category: 'THE BESTMARK APPROACH', title: 'A good decision starts with better questions.', summary: 'A practical framework for your next property conversation.', paragraphs: ['Start with purpose. How will you use the property, what budget is comfortable, and how long do you expect to hold it? Clear answers make the shortlist more useful.', 'Ask for the current price sheet, payment schedule, project registration where applicable, approved plans and possession information. Review the full commitment, including charges beyond the base price.', 'Visit the site and its surroundings. Speak to the team about the developer, connectivity and documentation. Take independent legal or financial advice where appropriate, and allow yourself time to make a considered decision.'] },
] as const;
