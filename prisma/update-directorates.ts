import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.directorate.deleteMany({});

  await prisma.directorate.createMany({
    data: [
      {
        order: 1,
        nameAf: "Sayber Amnih Xayrektoreet",
        nameAm: "የሳይበር ደህንነት ዳይሬክቶሬት",
        nameEn: "Cyber Security Directorate",
        descriptionAf:
          "Agat Caddol Dafesen Boliisitte Kee Amrittek Ugut Abak Rakaakay Doolat Kee Kalah Tan Faxximta Institutionitte Sayber Amni Dacayrih Taama Miraacisak, Koobaahisak Abinosaanam Kinnim Qaddoosen.",
        descriptionAm:
          "የዳይሬክቶሬቱ ዋና ኃላፊነት የክልሉን የመንግስት እና ሌሎች ወሳኝ ተቋማትን የሳይበር ደህንነት ጥበቃ በብሔራዊ ደረጃ የተቀመጡ ፖሊሲዎች፣ አዋጆች እና መመሪያዎች መሰረት በማድረግ መምራት፣ ማስተባበር እና ማስፈፀም ነው።",
        descriptionEn:
          "This directorate's main job is to oversee, coordinate, and enforce cybersecurity for the government's departments and other important institutions, following the nation's policies, proclamations, and guidelines.",
      },
      {
        order: 2,
        nameAf: "Qusbaamih hadal kee teknoloojih qimbo dariifa wagittaamal tabaatabsa kee qokol xayrektereet",
        nameAm: "የኢኖቬሽንና ቴክኖሎጂ ስታርትፕ ስነ ምህዳር ሽግግርና ድጋፍ ዳይሬክቶሬት",
        nameEn: "Directorate of Innovation and Technology Start-up Ecosystem Transition and Support",
        descriptionAf:
          "teknoloojih tatrusso jaamiqatittek, kusaq xisoosa, interpiraayizittee kee iroh waklentit inxastari fan, doolat xisoosa kee qimmo kampaanitte fan, oggol luddittel kee tellemmo gexsititte, kee miraacisak tabaatabsi gexsit wagittaamal fidga beyak qusbaamih ixxiga Daddos kee qidaddo xalootitte.",
        descriptionAm:
          "የዳይሬክቶሬቱ ዋና ኃላፊነት ከዩኒቨርሲቲዎች፣ ከምርምር ተቋማት፣ ከኢንተርፕራይዞች እና ከውጭ አጋሮች የሚመጡ ቴክኖሎጂዎችን ወደ ኢንዱስትሪዎች፣ መንግሥታዊ ተቋማት እና ጀማሪ ኩባንያዎች እንዲተላለፉ በማድረግ፣ መቀበል፣ ማላማድ እና ለገበያ ማዋል ሂደቶችን በማመቻቸት የሚፈጥሩትን ፈጠራ፣ ዕውቀትና የቴክኖሎጂ መፍትሄዎች በመውሰድ፣ ወደ ተግባራዊ ልማትና ኢኮኖሚያዊ ውጤት እንዲያመጡ የሽግግር ሂደቱን መምራት ነው።",
        descriptionEn:
          "This directorate mainly leads the process of moving technologies from universities, research institutes, companies, and foreign partners to industries, government bodies, and startups. They help adopt, adapt, and commercialize these technologies, turning innovations and knowledge into practical developments and economic results.",
      },
      {
        order: 3,
        nameAf: "Xiytalayzeeshin Ayfaf kee Assabalta Daddosih Xayrektoreet",
        nameAm: "ዲጂታላይዜሽን አገልግሎት እና አፕልኬሽን ልማት ዳይሬክቶሬት",
        nameEn: "Digitalization Service and Application Development Directorate",
        descriptionAf: "Rakaakayal Xijitaal Teknoloojih Calli Ekraarisak Abinosa.",
        descriptionAm: "የዳይሬክቶሬቱ ዋና ኃላፊነት በክልሉ ውስጥ ዲጂታል የቴክኖሎጂ መፍትሄዎችን በማቀድና በመምራት ወደ ተግባር ይለውጣል።",
        descriptionEn:
          "The main role here is to plan and manage digital technology solutions in the region and make them happen.",
      },
      {
        order: 4,
        nameAf: "Doolatak Ecote Network kee Infrastructure Xizaayin kee Konstrukshin Xayrektoreet",
        nameAm: "የመንግስት ኢኮቴ ኔትወርክና መሰረተ ልማት ዲዛይንና ግንባታ ዳይሬክቶሬት",
        nameEn: "Directorate of State ICT Network and Infrastructure Design and Construction",
        descriptionAf:
          "Rakaakay Teknolojih Dudda Diggoosaanam Kee Qasri Dijital Tabaatabsih Tadeerah Uguugus Akah Yayfoofen Innah Abak Geytiman Exxa Kinnim Qaddoosen.",
        descriptionAm:
          "የዳይሬክቶሬቱ ዋና ኃላፊነት የክልሉን የቴክኖሎጂ አቅም ለማጠናከርና ለዘመናዊ የዲጂታል ለውጥ መርሃ ግብር መሠረት ለመፍጠር የሚያገለግል ቁልፍ ክፍል ነው።",
        descriptionEn:
          "This is a key department focused on boosting the region's tech capacity and forming the foundation for a modern digital transformation program.",
      },
      {
        order: 5,
        nameAf: "Elektiromekanikaal Silaacitte Dambiyoo kee Asqassaabe Xayrektereet",
        nameAm: "የኤሌክትሮ መካኒክ መሳሪያዎች ጥገናና እድሳት ዳይሬክቶሬት",
        nameEn: "Directorate of Maintenance and Renovation of Electromechanical Equipment",
        descriptionAf:
          "Rakaakayak Teknolojih Dudda Maqarroosaanam kee Qasri Industirih Uguugus Teknolojih Tabaatabsa Bicisoonuh Masquliyyat Le.",
        descriptionAm:
          "የክልሉን የቴክኖሎጂ አቅም ለማጠናከርና በዘመናዊው የኢንዱስትሪ አብዮት ውስጥ የኤሌክትሮ መካኒክ ጥገና ክፍል የማሽኖችን ደህንነት ከመጠበቅ ባለፈ የቴክኖሎጂ ሽግግርን የማቀላጠፍ ከፍተኛ ኃላፊነት አለበት።",
        descriptionEn:
          "To strengthen the region's tech capacity in today's industrial era, this department not only keeps machines safe and running but also helps with technology transfer.",
      },
    ],
  });

  console.log("Directorates updated with official bureau data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
