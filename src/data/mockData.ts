import { DestinationPackage, BlogPost, Testimonial, Flight } from '../types';

export const DESTINATIONS_DATA: DestinationPackage[] = [
  {
    id: 'cano-cristales',
    title: 'Caño Cristales: El Río de los 7 Colores',
    tagline: 'La maravilla natural más impresionante de Colombia en La Macarena',
    location: 'La Macarena, Meta',
    country: 'Colombia',
    category: 'naturaleza',
    image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=900&auto=format&fit=crop&q=80',
    durationDays: 4,
    priceCOP: 1850000,
    priceUSD: 465,
    rating: 4.96,
    reviewsCount: 148,
    isFeatured: true,
    badge: 'Destino Emblema',
    highlights: [
      'Floración de Macarenia clavigera',
      'Vuelo chárter directo incluido',
      'Guías locales certificados por Parques Nacionales',
      'Navegación por el río Guayabero',
      'Avistamiento de delfines rosados y toninas'
    ],
    included: [
      'Tiquetes aéreos ida y regreso',
      'Alojamiento ecológico 3 noches',
      'Todas las comidas y refrigerios',
      'Permiso de ingreso Cormacarena',
      'Seguro médico y asistencia de viaje'
    ],
    departureFrequency: 'Salidas los viernes y domingos (Jun - Nov)'
  },
  {
    id: 'san-andres-islas',
    title: 'San Andrés y Providencia Paradisíaco',
    tagline: 'Sumérgete en el mar de los 7 colores y relájate bajo el sol caribeño',
    location: 'San Andrés Islas',
    country: 'Colombia',
    category: 'playa',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&auto=format&fit=crop&q=80',
    durationDays: 5,
    priceCOP: 1420000,
    priceUSD: 355,
    rating: 4.91,
    reviewsCount: 220,
    isFeatured: true,
    badge: 'Más Vendido',
    highlights: [
      'Tour en pontón privado a Johnny Cay y Haynes Cay',
      'Snorkel en la barrera de coral',
      'Paseo nocturno en catamarán con cena de mariscos',
      'Recorrido de la isla en carrito de golf'
    ],
    included: [
      'Tiquetes aéreos ida y vuelta con equipaje',
      'Hotel 4 estrellas frente a la playa',
      'Desayunos buffet diarios',
      'Tarjeta de turismo OCCRE incluida',
      'Traslados aeropuerto - hotel'
    ],
    departureFrequency: 'Salidas diarias'
  },
  {
    id: 'cartagena-indias',
    title: 'Cartagena Colonial & Islas del Rosario',
    tagline: 'Historia, murallas doradas, atardeceres mágicos y fiesta caribeña',
    location: 'Cartagena de Indias',
    country: 'Colombia',
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=900&auto=format&fit=crop&q=80',
    durationDays: 4,
    priceCOP: 1190000,
    priceUSD: 298,
    rating: 4.88,
    reviewsCount: 310,
    isFeatured: true,
    badge: 'Oferta Flash 20% OFF',
    highlights: [
      'Pasadía VIP en club de playa en Barú',
      'Paseo en carruaje por el centro amurallado',
      'Degustación de rones y café colombiano',
      'Atardecer en Café del Mar'
    ],
    included: [
      'Vuelos directos con aerolínea aliada',
      'Hotel boutique en Getsemaní',
      'Desayuno artesanal',
      'Guía historiador privado'
    ],
    departureFrequency: 'Salidas diarias'
  },
  {
    id: 'parque-tayrona',
    title: 'Santa Marta & Parque Nacional Tayrona',
    tagline: 'Donde la imponente Sierra Nevada se abraza con el mar cristalino',
    location: 'Santa Marta, Magdalena',
    country: 'Colombia',
    category: 'aventura',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80',
    durationDays: 4,
    priceCOP: 1080000,
    priceUSD: 270,
    rating: 4.93,
    reviewsCount: 164,
    highlights: [
      'Caminata por selva húmeda a Cabo San Juan del Guía',
      'Visita a Playa Cristal y Bahía Concha',
      'Noche en ecohabs con vista al mar'
    ],
    included: [
      'Vuelos ida y regreso',
      'Entrada al Parque Nacional Tayrona',
      'Alojamiento en Eco-lodge',
      'Guía indígena Kogui'
    ],
    departureFrequency: 'Salidas miércoles y sábados'
  },
  {
    id: 'cancun-riviera-maya',
    title: 'Cancún & Riviera Maya Todo Incluido',
    tagline: 'Cenotes sagrados, ruinas mayas frente al Caribe y resorts 5 estrellas',
    location: 'Cancún y Tulum',
    country: 'México',
    category: 'internacional',
    image: 'https://images.unsplash.com/photo-1512815046276-8804683d473f?w=900&auto=format&fit=crop&q=80',
    durationDays: 6,
    priceCOP: 3890000,
    priceUSD: 980,
    rating: 4.95,
    reviewsCount: 185,
    isFeatured: true,
    badge: 'Internacional Todo Incluido',
    highlights: [
      'Excursión guiada a Chichén Itzá con cenote sagrado',
      'Entrada completa al parque ecológico Xcaret',
      'Resort todo incluido en primera línea de playa',
      'Barra libre nacional e internacional'
    ],
    included: [
      'Vuelo internacional directo',
      'Resort 5 estrellas All-Inclusive',
      'Traslados privados',
      'Seguro internacional con cobertura médica'
    ],
    departureFrequency: 'Salidas todos los lunes y jueves'
  },
  {
    id: 'madrid-espana',
    title: 'Madrid y Ciudades Imperiales de España',
    tagline: 'Museos de renombre mundial, tapas selectas y palacios históricos',
    location: 'Madrid, Toledo y Segovia',
    country: 'España',
    category: 'internacional',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=900&auto=format&fit=crop&q=80',
    durationDays: 8,
    priceCOP: 6750000,
    priceUSD: 1690,
    rating: 4.92,
    reviewsCount: 92,
    badge: 'Europa Exclusiva',
    highlights: [
      'Entrada sin fila al Museo del Prado y Palacio Real',
      'Excursión de día completo al Acueducto de Segovia y Toledo',
      'Ruta de tapas y vinos de La Rioja en el Barrio de las Letras'
    ],
    included: [
      'Vuelo transatlántico con Iberia / Avianca',
      'Hoteles 4 estrellas céntricos',
      'Tren de alta velocidad AVE',
      'Asistencia médica Schengen'
    ],
    departureFrequency: 'Salidas quincenales'
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'guia-cano-cristales-2026',
    title: 'Guía Completa para Visitar Caño Cristales: El Río más Hermoso del Mundo',
    slug: 'guia-cano-cristales-2026',
    excerpt: 'Todo lo que necesitas saber antes de viajar a La Macarena: temporada de floración, cómo llegar, permisos ambientales y recomendaciones de vestimenta.',
    category: 'Guías de Viaje',
    readTime: '6 min de lectura',
    author: {
      name: 'Sofía Montoya',
      role: 'Especialista en Ecoturismo Macarena',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    date: '3 de Septiembre, 2026',
    coverImage: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=900&auto=format&fit=crop&q=80',
    destination: 'La Macarena, Meta',
    tags: ['Caño Cristales', 'Ecoturismo', 'Colombia Salvaje', 'Biodiversidad'],
    featured: true,
    content: [
      'Caño Cristales, ubicado en la Sierra de La Macarena en el departamento del Meta, es considerado unánimemente como uno de los espectáculos visuales más sobrecogedores del planeta. Su lecho rocoso está tapizado por la planta endémica Macarenia clavigera, que al recibir la luz del sol en época de aguas medias, despliega tonalidades fucsias, violetas, amarillas y esmeraldas.',
      '¿Cuándo viajar? La temporada estricta permitida por Parques Nacionales Naturales de Colombia va de finales de mayo o junio hasta principios de diciembre. En los primeros meses del año, el río entra en veda biológica para permitir que la planta repose y se reproduzca.',
      'Recomendaciones clave de sostenibilidad: Está terminantemente prohibido el uso de bloqueador solar químico o repelente en el agua para proteger el frágil ecosistema. Lleva camisas de manga larga con protección UV, zapatos antideslizantes con buen agarre para roca mojada, y cámara acuática.',
      'En Macarena Travel contamos con alianza directa de vuelos chárter desde Bogotá y Medellín hasta el aeropuerto de La Macarena, garantizando cupos sin las agotadoras esperas por tierra.'
    ]
  },
  {
    id: 'top-playas-secretas-san-andres',
    title: 'Las 5 Playas y Cayos Secretos de San Andrés que Debes Conocer',
    slug: 'top-playas-secretas-san-andres',
    excerpt: 'Más allá de la concurrida playa principal de Spratt Bight, descubre rincones vírgenes donde el agua turquesa parece una piscina infinita.',
    category: 'Playas & Caribe',
    readTime: '4 min de lectura',
    author: {
      name: 'Camilo Rentería',
      role: 'Capitán de Rutas Marítimas',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    date: '28 de Agosto, 2026',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&auto=format&fit=crop&q=80',
    destination: 'San Andrés Islas',
    tags: ['San Andrés', 'Playas', 'Snorkel', 'Caribe'],
    content: [
      '1. Rose Cay y Haynes Cay al amanecer: Al llegar antes de las 9:00 AM, las rayas marinas nadan tranquilas alrededor de tus pies en aguas cristalinas que no superan la cintura.',
      '2. Sound Bay en San Luis: El corazón raizal de la isla, con restaurantes de mariscos frescos cocinados con leche de coco y música reggae flotando en la brisa.',
      '3. El Acuario Natural: Uno de los santuarios marinos con mayor biodiversidad de peces loro, mantarrayas y corales cerebrales.',
      'En Macarena Travel te incluimos en el paquete el acceso prioritario y pontón privado para evitar multitudes.'
    ]
  },
  {
    id: 'como-ahorrar-en-vuelos-validacion',
    title: 'Cómo Funciona la Validación Directa de Aerolíneas y Cómo te Ahorra hasta un 35%',
    slug: 'como-ahorrar-en-vuelos-validacion',
    excerpt: 'Descubre la tecnología de Macarena Travel que conecta en milisegundos con los inventarios de Avianca, LATAM, Wingo y Copa para congelar tarifas antes de que suban.',
    category: 'Tecnología & Ahorro',
    readTime: '5 min de lectura',
    author: {
      name: 'Elena Restrepo',
      role: 'Directora de Operaciones de Vuelo',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    date: '15 de Agosto, 2026',
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&auto=format&fit=crop&q=80',
    destination: 'General / Aviación',
    tags: ['Vuelos Baratos', 'Tecnología', 'Consejos', 'Ahorro'],
    content: [
      '¿Alguna vez viste un precio en internet que subió al momento de colocar los datos de tu tarjeta? Los sistemas tradicionales de aerolíneas actualizan tarifas por algoritmos dinámicos cada 15 segundos.',
      'En Macarena Travel creamos nuestro motor de Validación Directa al Momento del Pago. En el preciso instante en que autorizas tu compra, el sistema realiza un "hold" garantizado en el GDS de la aerolínea con la mejor relación beneficio/presupuesto.',
      'Si el vuelo seleccionado sube repentinamente, nuestro sistema absorbe la diferencia o te reasigna automáticamente a una opción de categoría igual o superior sin costo extra.'
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Carolina Martínez & David Cruz',
    location: 'Bogotá, Colombia',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    destination: 'Caño Cristales, Meta',
    tripDate: 'Agosto 2026',
    comment: 'Viajar con Macarena Travel a Caño Cristales fue la mejor decisión de nuestras vidas. Desde el vuelo chárter impecable hasta los guías nativos que nos explicaron cada detalle de la Macarenia clavigera. Al pagar, el sistema nos reservó el vuelo de inmediato y nos llegó el tiquete al correo en 30 segundos. ¡Recomendadísimos!',
    verified: true,
    tripPhotos: [
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80'
    ],
    helpfulCount: 34
  },
  {
    id: 'test-2',
    name: 'Andrés Felipe Gómez',
    location: 'Medellín, Colombia',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    destination: 'San Andrés Islas',
    tripDate: 'Julio 2026',
    comment: 'Pagué con PSE desde mi cuenta Bancolombia. Me impresionó mucho que el validador automático comparó vuelos de Avianca y LATAM y me asignó el que incluía maleta de 23kg dentro de mi presupuesto. Además el chat de soporte me resolvió dudas a las 11 de la noche sin demoras.',
    verified: true,
    tripPhotos: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=80'
    ],
    helpfulCount: 28
  },
  {
    id: 'test-3',
    name: 'Valentina Soto & Familia',
    location: 'Cali, Colombia',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    destination: 'Cancún Todo Incluido',
    tripDate: 'Junio 2026',
    comment: 'Viajamos 4 personas a Cancún. El hotel 5 estrellas en Playa Mujeres fue de ensueño, los traslados puntuales con cartel con nuestro apellido y las notificaciones por correo nos avisaron cada cambio de puerta de embarque. Macarena Travel es sinónimo de tranquilidad.',
    verified: true,
    tripPhotos: [
      'https://images.unsplash.com/photo-1512815046276-8804683d473f?w=400&auto=format&fit=crop&q=80'
    ],
    helpfulCount: 19
  },
  {
    id: 'test-4',
    name: 'Roberto Valenzuela',
    location: 'Barranquilla, Colombia',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    destination: 'Cartagena & Islas del Rosario',
    tripDate: 'Mayo 2026',
    comment: 'Excelente atención. El blog de destinos me sirvió muchísimo para planear el recorrido gastronómico y las notificaciones push en tiempo real me mantuvieron informado del estado del vuelo en todo momento.',
    verified: true,
    tripPhotos: [
      'https://images.unsplash.com/photo-1583531352515-8884af319dc1?w=400&auto=format&fit=crop&q=80'
    ],
    helpfulCount: 12
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: '✈️ Confirmación de vuelo lista',
    body: 'Tu vuelo AV 9421 a Cartagena está garantizado con código PNR activo.',
    time: 'Hace 5 min',
    icon: 'Plane',
    type: 'booking' as const,
    read: false
  },
  {
    id: 'notif-2',
    title: '🔥 Promo Flash Exclusiva',
    body: '¡35% de descuento a San Andrés con equipaje incluido disponible hoy!',
    time: 'Hace 1 hora',
    icon: 'Sparkles',
    type: 'promo' as const,
    read: false
  },
  {
    id: 'notif-3',
    title: '🛡️ Pasarela 3D Secure activa',
    body: 'Tus pagos están blindados con cifrado bancario de 256-bit y respaldo IATA.',
    time: 'Hace 3 horas',
    icon: 'ShieldCheck',
    type: 'security' as const,
    read: true
  }
];

export const FLIGHTS_DATA: Flight[] = [
  {
    id: 'AV-9421',
    airline: 'Avianca',
    airlineCode: 'AV',
    flightNumber: 'AV 9421',
    airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado Intl (BOG)',
    destination: 'LMC',
    destinationCity: 'La Macarena (Caño Cristales)',
    destinationAirport: 'Javier Cortissoz (LMC)',
    departureTime: '06:15',
    arrivalTime: '07:30',
    duration: '1h 15m',
    stops: 0,
    aircraft: 'ATR 42-600',
    cabinClass: 'economy',
    priceCOP: 480000,
    priceUSD: 120,
    availableSeats: 7,
    baggageIncluded: true,
    refundable: true,
    score: 98,
    scoreReasons: ['Vuelo directo chárter exclusivo', 'Equipaje 23kg en bodega incluido', 'Horario matutino ideal para Caño Cristales'],
  },
  {
    id: '9R-8740',
    airline: 'Satena',
    airlineCode: '9R',
    flightNumber: '9R 8740',
    airlineLogo: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado Intl (BOG)',
    destination: 'LMC',
    destinationCity: 'La Macarena (Caño Cristales)',
    destinationAirport: 'Javier Cortissoz (LMC)',
    departureTime: '08:45',
    arrivalTime: '10:00',
    duration: '1h 15m',
    stops: 0,
    aircraft: 'Embraer ERJ-145',
    cabinClass: 'economy',
    priceCOP: 420000,
    priceUSD: 105,
    availableSeats: 5,
    baggageIncluded: true,
    refundable: false,
    score: 95,
    scoreReasons: ['Tarifa económica institucional', 'Vuelo directo sin escalas'],
  },
  {
    id: 'LA-4102',
    airline: 'LATAM Airlines',
    airlineCode: 'LA',
    flightNumber: 'LA 4102',
    airlineLogo: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado Intl (BOG)',
    destination: 'CTG',
    destinationCity: 'Cartagena de Indias',
    destinationAirport: 'Rafael Núñez (CTG)',
    departureTime: '07:20',
    arrivalTime: '08:50',
    duration: '1h 30m',
    stops: 0,
    aircraft: 'Airbus A320neo',
    cabinClass: 'economy',
    priceCOP: 310000,
    priceUSD: 78,
    availableSeats: 12,
    baggageIncluded: true,
    refundable: true,
    score: 96,
    scoreReasons: ['Flota moderna A320neo', 'Excelente puntualidad en ruta caribe'],
  },
  {
    id: 'P5-7280',
    airline: 'Wingo',
    airlineCode: 'P5',
    flightNumber: 'P5 7280',
    airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado Intl (BOG)',
    destination: 'ADZ',
    destinationCity: 'San Andrés Islas',
    destinationAirport: 'Gustavo Rojas Pinilla (ADZ)',
    departureTime: '11:10',
    arrivalTime: '13:25',
    duration: '2h 15m',
    stops: 0,
    aircraft: 'Boeing 737-800',
    cabinClass: 'economy',
    priceCOP: 395000,
    priceUSD: 99,
    availableSeats: 9,
    baggageIncluded: true,
    refundable: false,
    score: 94,
    scoreReasons: ['Tarifa ultra competitiva a San Andrés', 'Equipaje de mano garantizado'],
  },
  {
    id: 'CM-489',
    airline: 'Copa Airlines',
    airlineCode: 'CM',
    flightNumber: 'CM 489',
    airlineLogo: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado Intl (BOG)',
    destination: 'CUN',
    destinationCity: 'Cancún, México',
    destinationAirport: 'Cancún Intl (CUN)',
    departureTime: '09:30',
    arrivalTime: '14:40',
    duration: '4h 10m',
    stops: 1,
    aircraft: 'Boeing 737 MAX 9',
    cabinClass: 'economy',
    priceCOP: 1280000,
    priceUSD: 320,
    availableSeats: 8,
    baggageIncluded: true,
    refundable: true,
    score: 93,
    scoreReasons: ['Conexión ágil Hub de las Américas', 'Servicio de comida a bordo incluido'],
  },
  {
    id: 'IB-6586',
    airline: 'Iberia',
    airlineCode: 'IB',
    flightNumber: 'IB 6586',
    airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado Intl (BOG)',
    destination: 'MAD',
    destinationCity: 'Madrid, España',
    destinationAirport: 'Adolfo Suárez Barajas (MAD)',
    departureTime: '18:25',
    arrivalTime: '11:15 (+1)',
    duration: '9h 50m',
    stops: 0,
    aircraft: 'Airbus A350-900',
    cabinClass: 'economy',
    priceCOP: 3450000,
    priceUSD: 870,
    availableSeats: 14,
    baggageIncluded: true,
    refundable: true,
    score: 97,
    scoreReasons: ['Vuelo transatlántico directo', 'Cabina de última generación A350'],
  }
];

