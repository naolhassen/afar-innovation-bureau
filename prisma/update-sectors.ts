import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const services: { am: string; en: string }[] = [
  {
    am: "የኢኖቬሽንና ቴክኖሎጂ አቅም ግንባታ",
    en: "Innovation and Technology Capacity Building",
  },
  {
    am: "የዌብ ልማትና አፕልኬሽን ፍላጎት ጥናት",
    en: "Web Development and App Demand Study",
  },
  {
    am: "የሶፍትዌር፤ ሲስተም፤ አፕሊኬሽንና ዳታቤዝ ልማት",
    en: "Software System and Database Development",
  },
  {
    am: "የሳይበር ግምገማና አስተዳደር",
    en: "Cyber Assessment and Management",
  },
  {
    am: "የዳታ ማዕከልና አይሲቲ መሰረተ ልማት አስተዳደር፤ ጥበቃ፤ ጥገናና ድጋፍ",
    en: "Data Center & ICT Infrastructure Management: Protection, Maintenance & Support",
  },
  {
    am: "የኢኖቬሽንና ቴክኖሎጂ መሰረተ ልማት ዲዛይንና ግንባታ",
    en: "Innovation and Technology Infrastructure Design and Construction",
  },
  {
    am: "የሳይበር ደህንነት ክስተት ክትትል እና ምላሽ",
    en: "Cybersecurity Incident Monitoring and Response",
  },
  {
    am: "ሀገር በቀል እውቀት ማስፋፋትና ማሸጋገር",
    en: "Sharing and Passing on Indigenous Knowledge",
  },
  {
    am: "የቴክኖሎጂ የፈጠራ ባለቤትነት መብት ማረጋገጥ",
    en: "Technology Patent Validation",
  },
  {
    am: "የጥራት ቁጥጥር",
    en: "Quality Control",
  },
  {
    am: "የኤሌክትሮ መካኒክ መሳሪያዎች ጥገናና እድሳት",
    en: "Repair and Refurbishment of Electromechanical Equipment",
  },
  {
    am: "አርቴፊሻል ኢንተለጀንስ አላምዶ፤ ተጠቅሞ የተቋማት የቴክኖሎጂ ሽግግርን ማፋጠን እና አሰራርን ማዘመን",
    en: "Speeding up Tech Transfer in Institutions Using AI and Modernizing Operations",
  },
];

async function main() {
  await prisma.sector.deleteMany({});

  await prisma.sector.createMany({
    data: services.map((s, i) => ({
      order: i + 1,
      nameAf: s.en,
      nameAm: s.am,
      nameEn: s.en,
    })),
  });

  console.log(`Sectors (services) updated: ${services.length} records created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
