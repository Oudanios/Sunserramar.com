import { Room, Review } from './types';

export const ROOMS: Room[] = [
  {
    id: 'doble-privado',
    name: 'Habitación Doble con Baño Privado',
    nameEn: 'Double Room with Private Bathroom',
    nameFr: 'Chambre Double avec Salle de Bain Privée',
    nameAr: 'غرفة مزدوجة مع حمام خاص',
    description: 'Nuestra habitación más solicitada para parejas. Presenta una decoración sencilla y acogedora con muebles de madera de pino, equipada con una cómoda cama doble, baño completo privado dentro de la habitación, climatización y suelo de baldosa tradicional.',
    descriptionEn: 'Our most popular room for couples. Features simple, welcoming decor with classic solid pine wood furniture, a comfortable double bed, a full en-suite private bathroom, climate control/fan, and traditional tiled flooring.',
    descriptionFr: 'Notre chambre la plus demandée pour les couples. Décoration simple et chaleureuse, mobilier classique en pin massif, lit double confortable, climatisation et salle de bain privée attenante.',
    descriptionAr: 'غرفتنا الأكثر شعبية للأزواج. تتميز بديكور بسيط وترحيبي مع أثاث كلاسيكي من خشب الصنوبر الصلب، وسرير مزدوج مريح، وحمام خاص كامل داخل الغرفة، ونظام تكييف، وأرضية بلاط تقليدية.',
    type: 'doble',
    bathroom: 'private',
    price: 58,
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145303248.jpg?k=5fbef33b7c58fee5b15b1cc2bca107fca5c96a551b08ccdc8eccac4a4c4bc78e&o=',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145303248.jpg?k=5fbef33b7c58fee5b15b1cc2bca107fca5c96a551b08ccdc8eccac4a4c4bc78e&o=',
      'https://www.serramarbenalmadena.com/wp-content/uploads/habitacion-bano-privado-serramar-benalmadena.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-1.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-2.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-6.jpg'
    ],
    amenities: ['Baño Privado', 'Aire Acondicionado', 'Smart TV', 'Wi-Fi Gratis', 'Muebles de Pino', 'Suelo de Baldosa', 'Ropa de Cama & Toallas', 'Armario'],
    amenitiesEn: ['Private Bathroom', 'Air Conditioning', 'Smart TV', 'Free Wi-Fi', 'Pine Wood Furniture', 'Tiled Floor', 'Bed Linens & Towels', 'Wardrobe'],
    amenitiesFr: ['Salle de Bain Privée', 'Climatisation', 'Smart TV', 'Wi-Fi Gratuit', 'Meubles en Pin', 'Sol en Carrelage', 'Draps & Serviettes', 'Armoire'],
    amenitiesAr: ['حمام خاص', 'تكييف هواء', 'تلفزيون ذكي', 'واي فاي مجاني', 'أثاث خشب الصنوبر', 'أرضية بلاط', 'بياضات ومناشف', 'خزانة ملابس'],
    maxGuests: 2,
    featured: true
  },
  {
    id: 'triple-privado',
    name: 'Habitación Triple con Baño Privado',
    nameEn: 'Triple Room with Private Bathroom',
    nameFr: 'Chambre Triple avec Salle de Bain Privée',
    nameAr: 'غرفة ثلاثية مع حمام خاص',
    description: 'Perfecta para pequeñas familias o grupo de tres amigos. Cuenta con tres cómodas camas individuales o una cama doble y una individual de pino español, abundante luz natural, decoración sencilla, baño privado completo y ventilador de techo o aire acondicionado.',
    descriptionEn: 'Perfect for small families or groups of three friends. Features three cozy single beds (or one double and one single) made of Spanish pine wood, abundant natural light, simple decor, a full private bathroom, and a ceiling fan or A/C.',
    descriptionFr: 'Idéal pour les petites familles ou les groupes de trois amis. Dispose de trois lits simples confortables (ou un double et un simple) en bois de pin espagnol, d\'une lumière naturelle généreuse et d\'une salle de bain privée.',
    descriptionAr: 'مثالية للعائلات الصغيرة أو مجموعة من ثلاثة أصدقاء. تحتوي على ثلاثة أسرة فردية مريحة أو سرير مزدوج وسرير فردي مصنّع من خشب الصنوبر الإسباني، وإضاءة طبيعية وافرة، وديكور بسيط، وحمام خاص كامل، ومروحة سقف أو تكييف.',
    type: 'triple',
    bathroom: 'private',
    price: 75,
    image: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-4.jpg',
    images: [
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-4.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-5.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-17.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/habitacion-bano-privado-serramar-benalmadena.jpg'
    ],
    amenities: ['Baño Privado', 'Aire Acondicionado', 'Smart TV', 'Wi-Fi Gratis', 'Muebles de Pino', 'Suelo de Baldosa', 'Ropa de Cama & Toallas', 'Escritorio'],
    amenitiesEn: ['Private Bathroom', 'Air Conditioning', 'Smart TV', 'Free Wi-Fi', 'Pine Wood Furniture', 'Tiled Floor', 'Bed Linens & Towels', 'Desk'],
    amenitiesFr: ['Salle de Bain Privée', 'Climatisation', 'Smart TV', 'Wi-Fi Gratuit', 'Meubles en Pin', 'Sol en Carrelage', 'Draps & Serviettes', 'Bureau'],
    amenitiesAr: ['حمام خاص', 'تكييف هواء', 'تلفزيون ذكي', 'واي فاي مجاني', 'أثاث خشب الصنوبر', 'أرضية بلاط', 'بياضات ومناشف', 'مكتب عمل'],
    maxGuests: 3,
    featured: true
  },
  {
    id: 'cuadruple-privado',
    name: 'Habitación Familiar Cuádruple (Baño Privado)',
    nameEn: 'Quadruple Family Room (Private Bathroom)',
    nameFr: 'Chambre Familiale Quadruple (Salle de Bain Privée)',
    nameAr: 'غرفة عائلية رباعية (حمام خاص)',
    description: 'Nuestra habitación más grande y espaciosa, ideal para familias. Dispone de camas individuales en madera de pino o distribuciones mixtas, ventilador de techo o climatización, gran armario rústico, suelo de baldosa y baño privado completo.',
    descriptionEn: 'Our largest and most spacious room, ideal for families. Features solid pine wood single beds or custom mixed bedding, ceiling fan or A/C, a large rustic pine wardrobe, classic tiles, and full private bathroom.',
    descriptionFr: 'Notre chambre la plus grande et la plus spacieuse, idéale pour les familles. Comprend des lits simples en pin espagnol massif, un grand placard rustique et une salle de bain privée complète.',
    descriptionAr: 'غرفتنا الأكبر والأكثر اتساعاً، وهي مثالية للعائلات. تتميز بأسرة فردية مصنوعة من خشب الصنوبر المتين أو توزيعات سريرية مختلطة، ومروحة سقف أو تكييف، وخزانة ملابس ريفية كبيرة، وحمام خاص كامل.',
    type: 'cuadruple',
    bathroom: 'private',
    price: 90,
    image: 'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-7.jpg',
    images: [
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-7.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-8.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-12.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/habitacion-bano-privado-serramar-benalmadena.jpg'
    ],
    amenities: ['Baño Privado', 'Aire Acondicionado', 'Smart TV', 'Wi-Fi Gratis', 'Suelo de Baldosa', 'Muebles de Pino', 'Ropa de Cama & Toallas'],
    amenitiesEn: ['Private Bathroom', 'Air Conditioning', 'Smart TV', 'Free Wi-Fi', 'Tiled Floor', 'Pine Wood Furniture', 'Bed Linens & Towels'],
    amenitiesFr: ['Salle de Bain Privée', 'Climatisation', 'Smart TV', 'Wi-Fi Gratuit', 'Sol en Carrelage', 'Meubles en Pin', 'Draps & Serviettes'],
    amenitiesAr: ['حمام خاص', 'تكييف هواء', 'تلفزيون ذكي', 'واي فاي مجاني', 'أرضية بلاط', 'أثاث خشب الصنوبر', 'بياضات ومناشف'],
    maxGuests: 4,
    featured: false
  },
  {
    id: 'doble-compartido',
    name: 'Habitación Doble Económica (Baño Compartido)',
    nameEn: 'Budget Double Room (Shared Bathroom)',
    nameFr: 'Chambre Double Économique (Salle de Bain Partagée)',
    nameAr: 'غرفة مزدوجة اقتصادية (حمام مشترك)',
    description: 'La opción con mejor relación calidad-precio. Disfruta de una acogedora cama doble con decoración sencilla, muebles tradicionales de pino, ventilador silencioso en el techo y acceso directo a baños compartidos impecables en el pasillo (con desinfección constante).',
    descriptionEn: 'Our best-value cozy option. Enjoy a comfortable double bed featuring simple decor, traditional pine wood furniture, a quiet ceiling fan, and direct access to pristine shared hallway bathrooms (cleaned and disinfected multiple times daily).',
    descriptionFr: 'L\'option au meilleur rapport qualité-prix. Dispose d\'un lit double confortable, d\'un ventilateur de plafond silencieux et d\'un accès rapide aux salles de bain communes impeccables situées dans le couloir (désinfection constante).',
    descriptionAr: 'الخيار الأنسب من حيث التكلفة والقيمة. استمتع بسرير مزدوج مريح مع ديكور بسيط، وأثاث صنوبر تقليدي، ومروحة سقف هادئة، ووصول مباشر إلى حمامات مشتركة نظيفة للغاية في الممر (مع تعقيم مستمر).',
    type: 'doble',
    bathroom: 'shared',
    price: 45,
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/733661797.jpg?k=8ac2f39a4cf8979cefa54ab1d5e19acfe31df654609e2c09619a665c54aaeaf2&o=',
    images: [
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/733661797.jpg?k=8ac2f39a4cf8979cefa54ab1d5e19acfe31df654609e2c09619a665c54aaeaf2&o=',
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/733639422.jpg?k=c62df67f362a12b949fec76c379928b91b98d7db0c02819e8e0c8b0efab9ab18&o=',
      'https://www.serramarbenalmadena.com/wp-content/uploads/habitacion-bano-compartito-serramar-benalmadena.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-10.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-11.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-3.jpg'
    ],
    amenities: ['Baño Compartido', 'Ventilador de Techo', 'Televisión', 'Wi-Fi Gratis', 'Muebles de Pino', 'Suelo de Baldosa', 'Ropa de Cama & Toallas', 'Espejo'],
    amenitiesEn: ['Shared Bathroom', 'Quiet Ceiling Fan', 'Television', 'Free Wi-Fi', 'Pine Wood Furniture', 'Tiled Floor', 'Bed Linens & Towels', 'Mirror'],
    amenitiesFr: ['Salle de Bain Partagée', 'Ventilateur de Plafond', 'Télévision', 'Wi-Fi Gratuit', 'Meubles en Pin', 'Sol en Carrelage', 'Draps & Serviettes', 'Miroir'],
    amenitiesAr: ['حمام مشترك', 'مروحة سقف', 'تلفزيون', 'واي فاي مجاني', 'أثاث خشب الصنوبر', 'أرضية بلاط', 'بياضات ومناشف', 'مرآة'],
    maxGuests: 2,
    featured: false
  },
  {
    id: 'individual-compartido',
    name: 'Habitación Individual Económica (Baño Compartido)',
    nameEn: 'Budget Single Room (Shared Bathroom)',
    nameFr: 'Chambre Individuelle Économique (Salle de Bain Partagée)',
    nameAr: 'غرفة فردية اقتصادية (حمام مشترك)',
    description: 'Perfecta para aventureros solitarios y profesionales. Habitación acogedora con cama individual, decoración sencilla, mesa auxiliar y armario de pino, ventilador silencioso de techo, Wi-Fi rápido y acceso a excelentes baños comunes siempre limpios.',
    descriptionEn: 'Perfect for solo travelers and business individuals. A cozy room featuring a single bed, simple decor, pine wood side table and wardrobe, a quiet ceiling fan, high-speed Wi-Fi, and access to immaculate shared bathrooms.',
    descriptionFr: 'Parfait pour les voyageurs en solo et les professionnels. Une chambre confortable comprenant un lit simple, un meuble en pin, un ventilateur de plafond silencieux, le Wi-Fi à haut débit et l\'accès aux salles de bain communes impeccables.',
    descriptionAr: 'مثالية للمسافرين المنفردين والمحترفين. غرفة مريحة تحتوي على سرير فردي، وديكور بسيط، وطاولة جانبية وخزانة ملابس من خشب الصنوبر، ومروحة سقف هادئة، وواي فاي سريع، ووصول إلى حمامات مشتركة ممتازة ودائمة النظافة.',
    type: 'individual',
    bathroom: 'shared',
    price: 32,
    image: 'https://www.serramarbenalmadena.com/wp-content/uploads/habitacion-economica-bano-compartido-serramar-benalmadena.jpg',
    images: [
      'https://www.serramarbenalmadena.com/wp-content/uploads/habitacion-economica-bano-compartido-serramar-benalmadena.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-13.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-15.jpg',
      'https://www.serramarbenalmadena.com/wp-content/uploads/serramar-benalmadena-16.jpg'
    ],
    amenities: ['Baño Compartido', 'Ventilador de Techo', 'Wi-Fi Gratis', 'Muebles de Pino', 'Suelo de Baldosa', 'Ropa de Cama & Toallas', 'Escritorio Pequeño'],
    amenitiesEn: ['Shared Bathroom', 'Quiet Ceiling Fan', 'Free Wi-Fi', 'Pine Wood Furniture', 'Tiled Floor', 'Bed Linens & Towels', 'Small Desk'],
    amenitiesFr: ['Salle de Bain Partagée', 'Ventilateur de Plafond', 'Wi-Fi Gratuit', 'Meubles en Pin', 'Sol en Carrelage', 'Draps & Serviettes', 'Petit Bureau'],
    amenitiesAr: ['حمام مشترك', 'مروحة سقف', 'واي فاي مجاني', 'أثاث خشب الصنوبر', 'أرضية بلاط', 'بياضات ومناشف', 'مكتب صغير'],
    maxGuests: 1,
    featured: false
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Manuel J. García',
    rating: 5,
    date: '2026-05-18',
    comment: 'Una excelente sorpresa. El Hostal está súper limpio, huele genial al entrar. Arroyo de la Miel tiene mucha vida y la estación de tren está literal a 3 minutos andando, lo que hace comodísimo ir a Málaga o al aeropuerto. Volveré sin duda.',
    commentEn: 'An absolute great surprise. The hostel is super clean and smells amazing when you walk in. Arroyo de la Miel has plenty of life and the train station is literally a 3-minute walk away, which makes it very convenient. I will definitely repeat.',
    roomType: 'Doble con Baño Privado',
    origin: 'Spain'
  },
  {
    id: 'rev-2',
    author: 'Charlotte Harrison',
    rating: 5,
    date: '2026-06-02',
    comment: 'Exceptional stay! Beautiful rooms, very clean shared bathrooms (they clean them multiple times daily). Best direct price booking on their web. The owner was extremely welcoming and gave us tips on where to eat tapas.',
    commentEn: 'Exceptional stay! Beautiful rooms, very clean shared bathrooms (they clean them multiple times daily). Best direct price booking on their web. The owner was extremely welcoming and gave us tips on where to eat tapas.',
    roomType: 'Doble Económica',
    origin: 'UK'
  },
  {
    id: 'rev-3',
    author: 'Jean-Pierre Dubois',
    rating: 4,
    date: '2026-05-10',
    comment: 'Très bon rapport qualité-prix. Proche de la gare, des bus et des supermarchés. Chambres confortables avec une bonne climatisation. Fortement recommandé pour visitar de la Costa del Sol.',
    commentEn: 'Very good value for money. Close to the train station, buses, and supermarkets. Comfortable rooms with great air conditioning. Highly recommended for visiting the Costa del Sol.',
    roomType: 'Triple con Baño Privado',
    origin: 'France'
  },
  {
    id: 'rev-4',
    author: 'Sofía Martínez',
    rating: 5,
    date: '2026-04-25',
    comment: 'La mejor opción en Benalmádena. No hace falta pagar un dineral en hoteles de la costa cuando tienes un hostal tan familiar, acogedor y limpio aquí. Además se aparca relativamente bien cerca si vienes en coche rascando.',
    commentEn: 'The best option in Benalmadena. No need to pay a fortune in beachfront hotels when you have such a family-friendly, cozy, and super clean hostel here. Plus, parking is decent nearby.',
    roomType: 'Individual Económica',
    origin: 'Spain'
  },
  {
    id: 'rev-5',
    author: 'Isabel Ruiz Santos',
    rating: 5,
    date: '2026-05-29',
    comment: 'Lo que más me llamó la atención fue la limpieza impecable. Tanto la habitación como los baños compartidos estaban impolutos a cualquier hora, con olor a desinfectante agradable y limpio. El trato de Vicente fue extraordinario, explicándome las mejores zonas para comer en Arroyo de la Miel. Repetiré seguro.',
    commentEn: 'What struck me most was the pristine cleanliness. Both the room and shared bathrooms were spotless at any time, with a pleasant clean disinfectant scent. Vicentes hospitality was extraordinary, guiding me to the best places to eat in Arroyo de la Miel. Will definitely return.',
    roomType: 'Doble Económica',
    origin: 'Spain'
  },
  {
    id: 'rev-6',
    author: 'Alessandro Volpe',
    rating: 5,
    date: '2026-06-05',
    comment: 'Posizione strategica imbattibile! A soli 3 minuti a piedi dalla stazione ferroviaria di Arroyo de la Miel, ottimo se arrivi dall aeroporto di Malaga. Camere pulite, aria condizionata efficiente e personale amichevole. Rapporto qualità-prezzo eccellente.',
    commentEn: 'Unbeatable strategic position! Only a 3-minute walk from the Arroyo de la Miel train station, perfect if you arrive from Malaga Airport. Clean rooms, efficient air conditioning, and friendly staff. Excellent value for money.',
    roomType: 'Habitación Doble',
    origin: 'Other'
  },
  {
    id: 'rev-7',
    author: 'Sven Lindqvist',
    rating: 5,
    date: '2026-05-02',
    comment: 'Sehr sauber und gemütlich. Gutes WLAN zum Arbeiten. Das Hostal wird sehr sauber und liebevoll gepflegt. Supermärkte (Mercadona) und Cafés sind in unmittelbarer Nähe. Der Strand ist etwa 15 Minuten zu Fuß entfernt, ein schöner Spaziergang.',
    commentEn: 'Very clean and cozy. High-speed Wi-Fi is great for working. The hostal is kept exceptionally clean and lovingly maintained. Supermarkets (Mercadona) and cafes are in the immediate vicinity. Beach is about a 15 min walk away.',
    roomType: 'Individual Económica',
    origin: 'Germany'
  }
];

export const NEARBY_SIGHTS = [
  {
    name: 'Estación de Tren Arroyo de la Miel',
    nameEn: 'Arroyo de la Miel Train Station',
    distance: '200 metros (3 min andando)',
    distanceEn: '200 meters (3 min walk)',
    description: 'Conecta directo con el Aeropuerto de Málaga (15 min) y el centro de Málaga (25 min) mediante la línea C-1.',
    descriptionEn: 'Connects directly with Malaga Airport (15 min) and Malaga Center (25 min) via the C-1 train line.'
  },
  {
    name: 'Teleférico de Benalmádena',
    nameEn: 'Benalmadena Cable Car',
    distance: '600 metros (8 min andando)',
    distanceEn: '600 meters (8 min walk)',
    description: 'Sube a la cima del Monte Calamorro para ver unas vistas espectaculares de toda la costa de Málaga y espectáculos de aves.',
    descriptionEn: 'Ride to the top of Mount Calamorro for spectacular bird-eye views of the Malaga coast and falconry shows.'
  },
  {
    name: 'Playas de Benalmádena',
    nameEn: 'Benalmadena Beaches',
    distance: '1.5 km (15-20 min andando)',
    distanceEn: '1.5 km (15-20 min walk)',
    description: 'Playas de arena fina como la de Malapesquera y Santa Ana, repletas de chiringuitos de pescaíto frito y ambiente veraniego.',
    descriptionEn: 'Fine sand beaches like Malapesquera and Santa Ana, packed with seafood restaurants (chiringuitos) and summer vibe.'
  },
  {
    name: 'Puerto Marina Benalmádena',
    nameEn: 'Puerto Marina (Marina)',
    distance: '2.2 km (5 min en coche / tren)',
    distanceEn: '2.2 km (5 min by car / train)',
    description: 'Uno de los puertos deportivos más bellos y premiados del mundo, con una arquitectura única, tiendas, restaurantes y acuario.',
    descriptionEn: 'One of the most magnificent marina islands in the world, with unique architecture, shops, dining, and Sea Life aquarium.'
  },
  {
    name: 'Parque de la Paloma',
    nameEn: 'Parque de la Paloma',
    distance: '1.1 km (12 min andando)',
    distanceEn: '1.1 km (12 min walk)',
    description: 'Precioso parque repleto de animales sueltos (conejos, pavos reales, patos), jardines de cactus y lagos artificiales.',
    descriptionEn: 'Beautiful park with rabbits, peacocks, hens, and ducks wandering freely, plus large cactus gardens and lakes.'
  }
];
