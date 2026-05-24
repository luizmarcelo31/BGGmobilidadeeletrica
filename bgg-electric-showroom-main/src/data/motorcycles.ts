
import a3Image from "@/assets/public/A3.webp";
import a4Image from "@/assets/public/A4.webp";
import a2Image from "@/assets/public/A2.webp";
import a5Image from "@/assets/public/A5.webp";
import K06Image from "@/assets/public/K06.webp";

export type Motorcycle = {
  id: string;
  name: string; 
  category: string;
  description: string;  
  image: string;
  range: string;
  topSpeed: string;
  battery: string;
  chargeTime: string;
  highlights: string[];
  accentColor: string;
};

export const motorcycles: Motorcycle[] = [
  {
    id: "sudu-a2-plus",
    name: "SUDU A2+",
    category: "Scooter elétrica urbana",
    description:
      "Compacta, econômica e ideal para deslocamentos urbanos diários.",
    image: a2Image,
    range: "40–55 km",
    topSpeed: "até 32 km/h",
    battery: "Lítio removível 48V",
    chargeTime: "5–7h",
    highlights: [
      "Painel digital",
      "Iluminação full LED",
      "Controle remoto",
    ],
    accentColor: "#E8C840",
  },
  {
    id: "sudu-a3",
    name: "SUDU A3",
    category: "Scooter elétrica urbana",
    description:
      "Modelo urbano com porta-malas, piloto automático e visual moderno.",
    image: a3Image,
    range: "até 60 km",
    topSpeed: "até 32 km/h",
    battery: "Lítio removível 60V",
    chargeTime: "5–6h",
    highlights: [
      "Porta-malas traseiro",
      "Piloto automático",
      "Função ré",
    ],
    accentColor: "#E8C840",
  },
  {
    id: "sudu-a4",
    name: "SUDU A4",
    category: "Scooter elétrica premium",
    description:
      "Design robusto com destravamento NFC e banco para duas pessoas.",
    image: a4Image,
    range: "45–55 km",
    topSpeed: "até 32 km/h",
    battery: "Lítio removível 60V",
    chargeTime: "5–7h",
    highlights: [
      "NFC para destravamento",
      "Banco para 2 pessoas",
      "Full LED",
    ],
    accentColor: "#E8C840",
  },
  {
    id: "sudu-a5",
    name: "SUDU A5",
    category: "Scooter elétrica premium",
    description:
      "Estrutura reforçada com visual premium e banco amplo.",
    image: a5Image,
    range: "até 60 km",
    topSpeed: "até 32 km/h",
    battery: "Lítio removível 60V",
    chargeTime: "7–8h",
    highlights: [
      "Estrutura reforçada",
      "Design premium",
      "Banco amplo",
    ],
    accentColor: "#E8C840",
  },
  {
    id: "nado-k06",
    name: "NADO K06",
    category: "Maxi scooter elétrica",
    description:
      "Maxi scooter elétrica com visual moderno e maior conforto urbano.",
    image: K06Image,
    range: "50–80 km",
    topSpeed: "32–45 km/h",
    battery: "Lítio removível 60V",
    chargeTime: "6–8h",
    highlights: [
      "Estilo maxi scooter",
      "Banco premium",
      "Painel digital",
    ],
    accentColor: "#E8C840",
  },
];

export const WHATSAPP_NUMBER = "5581997112162";
export const WHATSAPP_DISPLAY = "(81) 99711-2162";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

