import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!ai && process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return ai;
}

// Airline database for the Direct Airline Validation & Auto-Booking Engine
export interface AirlineFlight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  airlineLogo: string;
  origin: string;
  originCity: string;
  originAirport: string;
  destination: string;
  destinationCity: string;
  destinationAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetails?: string;
  aircraft: string;
  cabinClass: 'economy' | 'premium_economy' | 'business';
  priceCOP: number;
  priceUSD: number;
  availableSeats: number;
  baggageIncluded: boolean;
  refundable: boolean;
  score?: number;
  scoreReasons?: string[];
}

const AIRLINES_DATABASE: AirlineFlight[] = [
  {
    id: 'AV-9421',
    airline: 'Avianca',
    airlineCode: 'AV',
    flightNumber: 'AV 9421',
    airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado (BOG)',
    destination: 'CTG',
    destinationCity: 'Cartagena',
    destinationAirport: 'Rafael Núñez (CTG)',
    departureTime: '07:15',
    arrivalTime: '08:45',
    duration: '1h 30m',
    stops: 0,
    aircraft: 'Airbus A320neo',
    cabinClass: 'economy',
    priceCOP: 285000,
    priceUSD: 72,
    availableSeats: 9,
    baggageIncluded: true,
    refundable: true,
  },
  {
    id: 'LA-4102',
    airline: 'LATAM Airlines',
    airlineCode: 'LA',
    flightNumber: 'LA 4102',
    airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado (BOG)',
    destination: 'CTG',
    destinationCity: 'Cartagena',
    destinationAirport: 'Rafael Núñez (CTG)',
    departureTime: '09:30',
    arrivalTime: '11:00',
    duration: '1h 30m',
    stops: 0,
    aircraft: 'Airbus A320',
    cabinClass: 'economy',
    priceCOP: 260000,
    priceUSD: 65,
    availableSeats: 14,
    baggageIncluded: false,
    refundable: false,
  },
  {
    id: 'P5-7150',
    airline: 'Wingo',
    airlineCode: 'P5',
    flightNumber: 'P5 7150',
    airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado (BOG)',
    destination: 'CTG',
    destinationCity: 'Cartagena',
    destinationAirport: 'Rafael Núñez (CTG)',
    departureTime: '13:40',
    arrivalTime: '15:10',
    duration: '1h 30m',
    stops: 0,
    aircraft: 'Boeing 737-800',
    cabinClass: 'economy',
    priceCOP: 215000,
    priceUSD: 54,
    availableSeats: 5,
    baggageIncluded: false,
    refundable: false,
  },
  {
    id: 'SAT-320',
    airline: 'Satena',
    airlineCode: '9R',
    flightNumber: '9R 8704',
    airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado (BOG)',
    destination: 'LMC',
    destinationCity: 'La Macarena (Caño Cristales)',
    destinationAirport: 'Javier Cortissoz (LMC)',
    departureTime: '06:00',
    arrivalTime: '07:15',
    duration: '1h 15m',
    stops: 0,
    aircraft: 'ATR 42-600',
    cabinClass: 'economy',
    priceCOP: 480000,
    priceUSD: 120,
    availableSeats: 8,
    baggageIncluded: true,
    refundable: true,
  },
  {
    id: 'AV-9740',
    airline: 'Avianca',
    airlineCode: 'AV',
    flightNumber: 'AV 9740',
    airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado (BOG)',
    destination: 'ADZ',
    destinationCity: 'San Andrés Islas',
    destinationAirport: 'Gustavo Rojas Pinilla (ADZ)',
    departureTime: '08:10',
    arrivalTime: '10:25',
    duration: '2h 15m',
    stops: 0,
    aircraft: 'Airbus A320neo',
    cabinClass: 'economy',
    priceCOP: 395000,
    priceUSD: 99,
    availableSeats: 12,
    baggageIncluded: true,
    refundable: true,
  },
  {
    id: 'CM-420',
    airline: 'Copa Airlines',
    airlineCode: 'CM',
    flightNumber: 'CM 420',
    airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado (BOG)',
    destination: 'CUN',
    destinationCity: 'Cancún, México',
    destinationAirport: 'Cancún Intl (CUN)',
    departureTime: '11:20',
    arrivalTime: '16:05',
    duration: '4h 45m',
    stops: 1,
    stopDetails: 'Escala 50m en Ciudad de Panamá (PTY)',
    aircraft: 'Boeing 737 MAX 9',
    cabinClass: 'economy',
    priceCOP: 1250000,
    priceUSD: 315,
    availableSeats: 7,
    baggageIncluded: true,
    refundable: true,
  },
  {
    id: 'IB-6588',
    airline: 'Iberia',
    airlineCode: 'IB',
    flightNumber: 'IB 6588',
    airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado (BOG)',
    destination: 'MAD',
    destinationCity: 'Madrid, España',
    destinationAirport: 'Adolfo Suárez Barajas (MAD)',
    departureTime: '18:20',
    arrivalTime: '11:15',
    duration: '9h 55m',
    stops: 0,
    aircraft: 'Airbus A350-900',
    cabinClass: 'economy',
    priceCOP: 3450000,
    priceUSD: 870,
    availableSeats: 11,
    baggageIncluded: true,
    refundable: true,
  },
  {
    id: 'AA-1124',
    airline: 'American Airlines',
    airlineCode: 'AA',
    flightNumber: 'AA 1124',
    airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60',
    origin: 'BOG',
    originCity: 'Bogotá',
    originAirport: 'El Dorado (BOG)',
    destination: 'MIA',
    destinationCity: 'Miami, EE.UU.',
    destinationAirport: 'Miami Intl (MIA)',
    departureTime: '01:05',
    arrivalTime: '06:10',
    duration: '4h 05m',
    stops: 0,
    aircraft: 'Boeing 787-8 Dreamliner',
    cabinClass: 'economy',
    priceCOP: 1650000,
    priceUSD: 415,
    availableSeats: 6,
    baggageIncluded: true,
    refundable: true,
  },
];

// --- 1. Health Endpoint ---
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    agency: 'Macarena Travel',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

// --- 2. Direct Airline Validation & Auto-Booking Engine ---
// Analyzes multi-airline inventories upon payment and books automatically based on client preferences and budget
app.post('/api/flights/validate-and-book', async (req: Request, res: Response) => {
  try {
    const {
      origin = 'BOG',
      destination = 'CTG',
      maxBudgetCOP = 1500000,
      maxBudgetUSD = 400,
      currency = 'COP',
      preferDirect = true,
      preferBaggage = true,
      preferredAirlines = [],
      passengerName = 'Viajero Macarena',
      passengerDoc = 'CC10982345',
      seatPreference = 'Ventana',
      paymentMethod = 'Tarjeta de Crédito / Débito',
      cabinClass = 'economy',
    } = req.body;

    // Simulate multi-airline inventory GDS search
    let candidates = AIRLINES_DATABASE.filter(f => {
      // Flexible matching for demo if route not in DB
      const matchRoute =
        (f.origin.toLowerCase() === origin.toLowerCase() || f.originCity.toLowerCase().includes(origin.toLowerCase())) &&
        (f.destination.toLowerCase() === destination.toLowerCase() || f.destinationCity.toLowerCase().includes(destination.toLowerCase()));

      return matchRoute;
    });

    // If no direct database match for origin/dest, generate dynamic multi-airline flights for the requested route
    if (candidates.length === 0) {
      const airlinesList = [
        { name: 'Avianca', code: 'AV', aircraft: 'Airbus A320neo', baseRate: currency === 'COP' ? 320000 : 80 },
        { name: 'LATAM Airlines', code: 'LA', aircraft: 'Boeing 787', baseRate: currency === 'COP' ? 295000 : 75 },
        { name: 'Wingo', code: 'P5', aircraft: 'Boeing 737-800', baseRate: currency === 'COP' ? 240000 : 60 },
        { name: 'Copa Airlines', code: 'CM', aircraft: 'Boeing 737 MAX', baseRate: currency === 'COP' ? 450000 : 115 },
      ];

      candidates = airlinesList.map((al, idx) => {
        const flightNum = `${al.code} ${Math.floor(1000 + Math.random() * 8999)}`;
        const priceC = Math.round(al.baseRate * (1 + idx * 0.15));
        const priceU = Math.round(priceC / 3950);
        return {
          id: `${al.code}-${Date.now()}-${idx}`,
          airline: al.name,
          airlineCode: al.code,
          flightNumber: flightNum,
          airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60',
          origin: origin.toUpperCase(),
          originCity: origin,
          originAirport: `${origin} International Airport`,
          destination: destination.toUpperCase(),
          destinationCity: destination,
          destinationAirport: `${destination} Airport`,
          departureTime: ['06:30', '10:15', '14:40', '19:20'][idx],
          arrivalTime: ['08:15', '11:55', '16:20', '21:05'][idx],
          duration: '1h 45m',
          stops: idx === 3 ? 1 : 0,
          aircraft: al.aircraft,
          cabinClass: cabinClass as 'economy',
          priceCOP: priceC,
          priceUSD: priceU,
          availableSeats: Math.floor(4 + Math.random() * 12),
          baggageIncluded: idx % 2 === 0,
          refundable: idx === 0,
        };
      });
    }

    // Algorithmic Scoring based on Budget, Baggage, Direct Flights, and Price
    const budgetLimit = currency === 'COP' ? Number(maxBudgetCOP) : Number(maxBudgetUSD);

    const evaluatedFlights = candidates.map(flight => {
      let score = 100;
      const reasons: string[] = [];
      const flightPrice = currency === 'COP' ? flight.priceCOP : flight.priceUSD;

      // Budget check
      if (flightPrice <= budgetLimit) {
        score += 30;
        reasons.push(`Dentro de tu presupuesto seleccionado (${currency === 'COP' ? '$' + flightPrice.toLocaleString() + ' COP' : '$' + flightPrice + ' USD'})`);
      } else {
        score -= 40;
        reasons.push(`Excede el presupuesto límite`);
      }

      // Preference: Direct flights
      if (preferDirect && flight.stops === 0) {
        score += 25;
        reasons.push('Vuelo directo sin escalas');
      } else if (preferDirect && flight.stops > 0) {
        score -= 20;
        reasons.push(`Tiene ${flight.stops} escala(s)`);
      }

      // Preference: Baggage
      if (preferBaggage && flight.baggageIncluded) {
        score += 20;
        reasons.push('Incluye equipaje de bodega 23kg');
      }

      // Preferred airlines bonus
      if (preferredAirlines.length > 0 && preferredAirlines.includes(flight.airline)) {
        score += 15;
        reasons.push(`Aerolínea preferida (${flight.airline})`);
      }

      // Seat availability bonus
      if (flight.availableSeats > 5) {
        score += 10;
        reasons.push('Cupos garantizados en sistema');
      }

      return {
        ...flight,
        score,
        scoreReasons: reasons,
      };
    });

    // Sort by best score descending
    evaluatedFlights.sort((a, b) => (b.score || 0) - (a.score || 0));
    const selectedFlight = evaluatedFlights[0];

    // Generate Official PNR and E-Ticket confirmation
    const pnrCode = `MC${Math.floor(100000 + Math.random() * 900000).toString(36).toUpperCase()}`;
    const ticketNumber = `134-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const seatNumber = `${Math.floor(4 + Math.random() * 22)}${['A', 'C', 'D', 'F'][Math.floor(Math.random() * 4)]}`;
    const gateNumber = `G${Math.floor(1 + Math.random() * 18)}`;

    const bookingResult = {
      status: 'CONFIRMED',
      pnr: pnrCode,
      ticketNumber,
      issuedAt: new Date().toISOString(),
      flight: selectedFlight,
      alternativeOptions: evaluatedFlights.slice(1, 3),
      passenger: {
        name: passengerName,
        document: passengerDoc,
        seat: seatNumber,
        gate: gateNumber,
        terminal: 'T1',
        boardingTime: '45 minutos antes del vuelo',
      },
      payment: {
        status: 'APPROVED',
        method: paymentMethod,
        currency,
        amount: currency === 'COP' ? selectedFlight.priceCOP : selectedFlight.priceUSD,
        authorizationCode: `AUTH-${Math.floor(100000 + Math.random() * 900000)}`,
        securityHash: 'SHA256-VALIDATED-3D-SECURE',
      },
      validationAudit: {
        engine: 'Macarena Direct Airline Reservation Engine v2.4',
        latencyMs: 342,
        airlinesQueried: ['Avianca (AV)', 'LATAM Airlines (LA)', 'Wingo (P5)', 'Copa Airlines (CM)', 'Satena (9R)', 'Iberia (IB)'],
        budgetRequested: budgetLimit,
        criteriaMatchScore: `${selectedFlight.score}/100`,
        verificationBadge: 'CERTIFICADA IATA / ANATO',
      },
    };

    return res.json({
      success: true,
      booking: bookingResult,
    });
  } catch (error: any) {
    console.error('Error validating flight:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al procesar la validación con la aerolínea',
      error: error.message,
    });
  }
});

// --- 3. Personalized Customer Service Chat (Gemini AI + Knowledge Base) ---
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'El mensaje es requerido' });
    }

    const gemini = getGeminiClient();

    const systemPrompt = `Eres "Macarena Concierge", el asesor virtual experto y amigable de la prestigiosa agencia de viajes "Macarena Travel".
Nuestra identidad:
- Especialistas en turismo de alta calidad en Colombia y destinos internacionales.
- Destinos estrella: Caño Cristales (La Macarena, Meta - el río de los 7 colores), San Andrés y Providencia, Cartagena de Indias, Santa Marta y Parque Tayrona, Eje Cafetero, Cancún, Punta Cana, Madrid y Miami.
- Contamos con un innovador sistema de validación directa con aerolíneas que reserva automáticamente según presupuesto y preferencias.
- Aceptamos pagos seguros mediante Tarjetas, PSE (Bancolombia, Nequi, etc.), PayPal y Apple Pay.
- Mantenemos siempre un tono cálido, profesional, entusiasta y hospitalario (estilo colombiano amable y servicial).
- Da recomendaciones concretas de vuelos, mejores fechas para viajar (ej: Caño Cristales es ideal entre junio y noviembre cuando la planta acuática Macarenia clavigera florece), presupuestos y tips de viaje.
- Si te piden cotización, ofrece rangos claros y recuérdales que pueden reservar directamente desde la plataforma con confirmación instantánea de tiquete.`;

    if (gemini) {
      try {
        const response = await gemini.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });

        const reply = response.text || 'Con gusto te asesoro con tu viaje en Macarena Travel.';
        return res.json({ reply, source: 'gemini' });
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to smart rule concierge:', geminiError);
      }
    }

    // Smart Fallback Concierge responses when GEMINI_API_KEY is not set or throttled
    const lower = message.toLowerCase();
    let reply = '';

    if (lower.includes('caño cristales') || lower.includes('macarena') || lower.includes('rio') || lower.includes('río')) {
      reply = `¡Caño Cristales es nuestra joya insignia en Macarena Travel! 🌈 La mejor temporada para visitarlo es de **junio a noviembre**, cuando las plantas acuáticas *Macarenia clavigera* muestran sus vibrantes colores rojo, amarillo y verde. Nuestro paquete incluye vuelo chárter desde Bogotá/Medellín, guías nativos certificados, permiso Cormacarena y hospedaje ecológico. ¿Te gustaría cotizar una fecha específica?`;
    } else if (lower.includes('vuelo') || lower.includes('reserva') || lower.includes('aerolinea') || lower.includes('aerolínea') || lower.includes('presupuesto')) {
      reply = `¡Excelente pregunta! En **Macarena Travel** contamos con nuestro motor de validación directa con aerolíneas (Avianca, LATAM, Copa, Wingo, Satena e Iberia). Al realizar el pago, nuestro sistema analiza cupos en tiempo real y asigna el vuelo más conveniente respetando tu presupuesto y preferencias de equipaje o escalas. Puedes usar el buscador superior para iniciar tu reserva. ✈️`;
    } else if (lower.includes('pago') || lower.includes('pse') || lower.includes('tarjeta') || lower.includes('segur')) {
      reply = `Nuestra pasarela de pago es 100% segura y cuenta con cifrado SSL de 256 bits y verificación 3D Secure. Aceptamos tarjetas de crédito/débito (Visa, Mastercard, Amex), PSE con todos los bancos colombianos (Bancolombia, Nequi, Davivienda), PayPal y Apple Pay. Tu reserva se emite inmediatamente con código PNR y tiquete electrónico. 🔒`;
    } else if (lower.includes('cartagena') || lower.includes('san andres') || lower.includes('cancun') || lower.includes('madrid')) {
      reply = `¡Es uno de nuestros destinos favoritos! Disponemos de promociones exclusivas con hasta 35% de descuento en vuelos y hoteles todo incluido. Puedes revisar el artículo detallado en nuestro Blog de Destinos o reservar directamente en el panel de reservas. ¿Prefieres viajar en temporada baja o alta?`;
    } else if (lower.includes('hola') || lower.includes('buenos') || lower.includes('buenas')) {
      reply = `¡Hola! Bienvenido a **Macarena Travel**. 🌴 Soy tu Concierge virtual personal. ¿En qué aventura o destino puedo ayudarte hoy? Puedo orientarte sobre vuelos directos, paquetes turísticos, Caño Cristales, formas de pago o el estado de tu reserva.`;
    } else {
      reply = `¡Con mucho gusto te asesoro! En Macarena Travel nos aseguramos de que tengas las mejores tarifas aéreas, hoteles de encanto y asistencia 24/7. Cuéntame a qué destino te gustaría viajar, en qué fechas y cuál es tu presupuesto estimado para encontrar la mejor opción para ti.`;
    }

    return res.json({ reply, source: 'smart-fallback' });
  } catch (error: any) {
    console.error('Error in chat endpoint:', error);
    return res.status(500).json({
      error: 'Error al procesar el mensaje en el chat',
    });
  }
});

// --- 4. Simulated Transactional Email Notification System ---
app.post('/api/notifications/send-email', (req: Request, res: Response) => {
  const { to, type, bookingData, promoTitle } = req.body;

  const emailPayload = {
    messageId: `MSG-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    recipient: to || 'Duoswar@gmail.com',
    type: type || 'BOOKING_CONFIRMATION',
    subject:
      type === 'PROMOTION'
        ? `🌴 [Macarena Travel] ${promoTitle || 'Oferta Exclusiva: Vuela con hasta 40% OFF'}`
        : `✈️ Confirmación de Reserva y E-Ticket [PNR: ${bookingData?.pnr || 'MC-94281X'}] - Macarena Travel`,
    sentAt: new Date().toISOString(),
    status: 'DELIVERED',
    previewHtml:
      type === 'PROMOTION'
        ? `<div style="font-family:sans-serif;padding:24px;border:1px solid #e2e8f0;border-radius:12px;max-width:560px;">
            <h2 style="color:#f97316;">¡Promoción Flash Exclusiva para ti!</h2>
            <p>Descubre los 7 colores de Caño Cristales o relájate en las playas cristalinas de San Andrés con tarifas desde $215.000 COP.</p>
            <p style="font-size:13px;color:#64748b;">Enviado por Macarena Travel a ${to || 'Duoswar@gmail.com'}</p>
          </div>`
        : `<div style="font-family:sans-serif;padding:24px;border:1px solid #e2e8f0;border-radius:12px;max-width:560px;">
            <h2 style="color:#0284c7;">¡Tu viaje a ${bookingData?.flight?.destinationCity || 'Cartagena'} está confirmado!</h2>
            <p><strong>PNR:</strong> ${bookingData?.pnr || 'MC-94281X'}</p>
            <p><strong>Vuelo:</strong> ${bookingData?.flight?.flightNumber || 'AV 9421'} (${bookingData?.flight?.airline || 'Avianca'})</p>
            <p><strong>Pasajero:</strong> ${bookingData?.passenger?.name || 'Viajero Macarena'}</p>
            <p><strong>Asiento:</strong> ${bookingData?.passenger?.seat || '12A'}</p>
            <p style="color:#16a34a;font-weight:bold;">Estado: Pago Aprobado & Reserva Validada</p>
          </div>`,
  };

  return res.json({
    success: true,
    email: emailPayload,
  });
});

// --- 5. Start Server with Vite Middleware in Dev / Static in Prod ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Macarena Travel Server] running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
