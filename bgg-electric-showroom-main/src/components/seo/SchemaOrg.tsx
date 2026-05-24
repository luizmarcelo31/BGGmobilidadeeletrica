/*
  Schema.org JSON-LD para BGG Mobilidade Elétrica.
  TODO: substituir por domínio real antes do deploy em produção

  Schemas implementados:
    1. AutoDealer + LocalBusiness (dados da concessionária)
    2. FAQPage (perguntas frequentes)
    3. Product (para cada modelo de veículo)
*/

import { motorcycles } from "@/data/motorcycles";

const DOMAIN = "https://bggmobilidade.com.br"; // TODO: substituir pelo domínio real

/* ------------------------------------------------------------------ */
/*  1. LocalBusiness + AutoDealer                                      */
/* ------------------------------------------------------------------ */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["AutoDealer", "LocalBusiness"],
  name: "BGG Mobilidade Elétrica",
  description:
    "Concessionária de veículos elétricos em Caruaru, PE. Scooters e motos elétricas premium com suporte local.",
  url: DOMAIN,
  telephone: "+55 81 99711-2162",
  address: {
    "@type": "PostalAddress",
    streetAddress: "[TODO: preencher endereço completo]",
    addressLocality: "Caruaru",
    addressRegion: "PE",
    postalCode: "[TODO: preencher CEP]",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -8.2835,
    longitude: -35.9753,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "13:00",
    },
  ],
  priceRange: "$$$$",
  image: `${DOMAIN}/og-image.jpg`, // TODO: criar e hospedar imagem OG
};

/* ------------------------------------------------------------------ */
/*  2. FAQPage                                                         */
/* ------------------------------------------------------------------ */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qual a autonomia real da scooter no dia a dia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A autonomia varia de 40 a 80 km por carga, dependendo do modelo (SUDU A2+ a NADO K06) e do estilo de pilotagem. Em uso urbano misto com relevo do Agreste, a média prática fica entre 70–85% do valor nominal de cada modelo.",
      },
    },
    {
      "@type": "Question",
      name: "Posso recarregar em casa? Preciso de instalação especial?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "Sim, todas as scooters BGG carregam em qualquer tomada comum (110V ou 220V). A bateria é removível, permitindo carregar dentro de casa ou no escritório sem precisar de vaga com tomada. Wallboxes aceleram a recarga, mas não são obrigatórias.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a garantia e onde fica a assistência técnica em Caruaru?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "A BGG oferece garantia de fábrica e assistência técnica especializada em Caruaru, PE. Consulte nosso showroom para detalhes de cobertura e prazos específicos de cada componente.",
      },
    },
    {
      "@type": "Question",
      name: "Como funciona o financiamento? Qual a entrada mínima?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "Trabalhamos com financiamento facilitado com entrada a partir de 50% e parcelamento no cartão de crédito. Consulte nosso time comercial para simular condições personalizadas para sua região.",
      },
    },
    {
      "@type": "Question",
      name: "Dá para ir de Caruaru a Recife sem recarregar?",
      acceptedAnswer: {
        "@type": "Answer",
        "text": "Para viagens Caruaru–Recife (aprox. 135 km), recomendamos planejar uma parada para recarga intermediária, pois a autonomia máxima dos modelos é de 80 km. Há pontos de recarga no trajeto.",
      },
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  3. Product — para cada modelo de veículo                           */
/* ------------------------------------------------------------------ */
const vehicleSchemas = motorcycles.map((m) => {
  const rangeKm = m.range.replace(/[^0-9–-]/g, "").trim();
  const topSpeedKm = m.topSpeed.replace(/[^0-9–-]/g, "").trim();
  const chargeTime = m.chargeTime.replace(/[^0-9–-]/g, "").trim();

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: m.name,
    description: m.description,
    brand: {
      "@type": "Brand",
      name: m.name.split(" ")[0],
    },
    vehicleModelDate: "2025",
    ...(m.category.toLowerCase().includes("scooter")
      ? { vehicleType: "Scooter" }
      : { vehicleType: "Motorcycle" }),
    ...(rangeKm && {
      mileageFromOdometer: {
        "@type": "QuantitativeValue",
        value: rangeKm,
        unitText: "km",
      },
    }),
    speed: topSpeedKm
      ? {
          "@type": "QuantitativeValue",
          value: topSpeedKm,
          unitText: "km/h",
        }
      : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: `${DOMAIN}/`,
      seller: {
        "@type": "AutoDealer",
        name: "BGG Mobilidade Elétrica",
      },
    },
  };
});

/* ------------------------------------------------------------------ */
/*  Componente                                                        */
/* ------------------------------------------------------------------ */
export default function SchemaOrg() {
  const jsonLd = [localBusinessSchema, faqSchema, ...vehicleSchemas];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
    />
  );
}