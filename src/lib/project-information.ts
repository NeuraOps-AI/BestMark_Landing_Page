export type ProjectImage = { src: string; caption: string; kind: string };
export type ProjectInformation = {
  source: string; logo: string; logoAlt: string; logoLabel: string;
  address: string; directions: string; mapEmbed?: string; mapImage?: string;
  amenities: string[]; connections: { place: string; time: string }[];
  gallery: ProjectImage[]; floorPlans?: ProjectImage[];
  registrations?: { label: string; value: string }[];
  factsNote?: string; connectionNote?: string;
};
export const projectInformation: Record<string, ProjectInformation> = {
  'the-harvest': {
    source: 'https://theharvestkokapet.in/', logo: '/images/harvest-logo.webp', logoAlt: 'Pooja Crafted Homes logo', logoLabel: 'DEVELOPED BY',
    address: 'The Harvest by Pooja Crafted Homes, C83J+3FC, Kokapet, Hyderabad, Telangana 500075',
    directions: 'https://www.google.com/maps/search/?api=1&query=17.4025278%2C78.3319722',
    mapEmbed: 'https://maps.google.com/maps?q=17%C2%B024%2709.1%22N%2078%C2%B019%2755.1%22E&t=m&z=15&output=embed&iwloc=near',
    factsNote: '*Scale and floor plates as listed on the supplied project website. Ask for current approved plans and specifications.',
    amenities: ['Fitness centre', 'Cafeteria', 'Business centre', 'Conference rooms', 'Landscaped outdoor spaces', 'Parking & EV charging', 'Security & access control', 'Wellness spaces'],
    connections: [{place:'ORR access',time:'~2 km'},{place:'Financial District',time:'~7 km'},{place:'HITEC City',time:'~12 km'},{place:'RGI Airport',time:'~25 km'}],
    connectionNote: 'Approximate distances published on the project’s connectivity page. Actual routes and travel times vary.',
    gallery: [
      {src:'/images/harvest.webp',caption:'Gold-toned office tower',kind:'Architectural render · Official brochure'},
      {src:'/images/harvest-cover.webp',caption:'The Harvest brochure cover',kind:'Official project brochure'},
      {src:'/images/harvest-amenities.webp',caption:'Shared spaces & amenities',kind:'Architectural renders · Official brochure'},
    ],
    floorPlans: [
      {src:'/images/harvest-master-plan.webp',caption:'Site plan',kind:'Official brochure · Not to scale'},
      {src:'/images/harvest-typical-plan.webp',caption:'Typical office floor',kind:'Official brochure · Not to scale'},
    ],
  },
  'fortune-towers': {
    source: 'https://fortunetowers.co.in/', logo: '/images/fortune-logo.webp', logoAlt: 'Fortune Towers official logo', logoLabel: 'PROJECT IDENTITY',
    address: 'Near ORR Exit 4A, Mallampet, Hyderabad, Telangana',
    directions: 'https://www.google.com/maps/search/?api=1&query=Fortune%20Towers%20Sharpline%20LLP%20Mallampet',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4512.0678515748195!2d78.3532754757818!3d17.564376697681055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8dbff5c4d533%3A0xf6d18e24efb4103a!2sFortune%20Towers-%20Sharpline%20LLP%20-%20Mallampet!5e1!3m2!1sen!2sin!4v1779278648004!5m2!1sen!2sin',
    amenities: ['Swimming pool', 'Gym & indoor games', 'Library & wellness spaces', 'Multipurpose hall', 'Gardens & jogging track', 'Children’s play area', 'Box cricket & sports courts', 'EV charging provision'],
    connections: [{place:'ORR Exit 4A',time:'4 min'},{place:'Bachupally / Bollaram',time:'10 min'},{place:'HITEC City',time:'30 min'},{place:'Financial District',time:'30 min'}],
    registrations: [{label:'TS RERA',value:'P01100010672'},{label:'HMDA reference',value:'G1/131/GPM/23062023'}],
    gallery: [
      {src:'/images/fortune-towers.webp',caption:'Community aerial view',kind:'Architectural render'},
      {src:'/images/fortune-night.webp',caption:'Residential block at dusk',kind:'Architectural render'},
      {src:'/images/fortune-clubhouse.webp',caption:'Club Fortune',kind:'Architectural render'},
      {src:'/images/fortune-site.webp',caption:'Site progress',kind:'Site photograph · Official gallery'},
    ],
    floorPlans: ['a','b','c','d','e'].map(block=>({src:`/images/fortune-plan-${block}.webp`,caption:`Tower ${block.toUpperCase()}`,kind:'Official floor plan'})),
  },
  'lios-premium-villas': {
    source: 'https://grupenayan.com/', logo: '/images/grupe-nayan-logo.webp', logoAlt: 'Grupe Nayan official logo', logoLabel: 'DEVELOPED BY',
    address: 'Tukkuguda, near ORR Exit 14, Hyderabad. The developer’s location plan places the site on the 100 Feet Road near Fab City Road.',
    directions: 'https://www.google.com/maps/search/?api=1&query=LIOS%20Grupe%20Nayan%20Tukkuguda',
    mapImage: '/images/lios-location.webp',
    amenities: ['Swimming pool', 'Indoor games', 'Banquet hall', 'Gym', 'Co-working spaces', 'Guest rooms', 'Café', 'Landscaped walks & shaded seating'],
    connections: [{place:'ORR Exit 14',time:'2 min'},{place:'Fab City',time:'3 min'},{place:'RGI Airport / Wonderla',time:'10 min'},{place:'Financial District / Gachibowli',time:'25 min'}],
    gallery: [
      {src:'/images/lios-villas.webp',caption:'Villa exterior',kind:'Architectural render'},
      {src:'/images/lios-street.webp',caption:'Villa streetscape',kind:'Architectural render'},
      {src:'/images/lios-clubhouse.webp',caption:'LIOS Sport clubhouse',kind:'Architectural render'},
      {src:'/images/lios-pool.webp',caption:'Clubhouse entrance',kind:'Architectural render'},
      {src:'/images/lios-landscape.webp',caption:'Landscaped outdoor spaces',kind:'Architectural render'},
    ],
  },
};
