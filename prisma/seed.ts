import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = "admin@afaritdb.gov.et";
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: {
        name: "Bureau Administrator",
        email: adminEmail,
        passwordHash: await bcrypt.hash("Afar@ITDB2026", 10),
        role: "SUPER_ADMIN",
      },
    });
    console.log(`Created admin user: ${adminEmail} / Afar@ITDB2026`);
  }

  const existingSettings = await prisma.siteSetting.findFirst();
  if (!existingSettings) {
    await prisma.siteSetting.create({
      data: {
        missionAf:
          "Effektiivi-le teknoolojii warsiisak, doorsiisak, ellecabo horsiisak kee taamah gaceenamah cabiimu saynis kee teknoolojii horoyaay tabaatabsak rakaakay caddol xiqewaay.",
        missionAm:
          "ውጤታማ ቴክኖሎጂዎችን ማፈላላግ መምረጥ ማላማድ መፍጠርና መጠቀም የሚያስችል ሳይንስና ቴክኖሎጂ በማልማትና በማሸጋገር የክልሉን ዕድገት ማረጋገጥ።",
        missionEn:
          "To ensure the region's growth by developing and transferring science and technology that enables the search, selection, adaptation, creation, and use of effective technologies.",
        visionAf:
          "Xiinisso kee cuglisak duudusiime ineewaa teknoolojii daddossiiy askaasita, amaanat-le sistem horoysiiy dijitaal xaqbo massowak rakaakay ummattah cateynay xiqewaay.",
        visionAm:
          "በጥናትና ምርምር የተደገፈ የኢንፎርሜሽን ቴክኖሎጂ መሰረተ ልማቶችን በማልማትና ደህንነቱ የተጠበቀ ሲስተሞችን በማበልጸግ እና ዲጂታል አገልግሎት በማስፋፋት የክልሉን ማህበረሰብ ተጠቃሚነት ማረጋገጥ።",
        visionEn:
          "To ensure the benefit of the region's community by developing research- and study-based information technology infrastructure, strengthening secure systems, and expanding digital services.",
        valuesAf:
          "Cakki-le kalah\nXiinisso duudusiime ubla\nCusa cateyna horsiisa\nUmmattah xaqbi le tanim\nCasi-le teknoolojii cateynay\nQusba ellecabo daddosa\nTaama kalah kee dudda\nMassaqaltinnu",
        valuesAm:
          "ቀናነት\nጥልቅ ምልከታ\nልዩነት መፍጠር\nአገልጋይነት\nየላቀ የቴክኖሎጂ ተጠቃሚነት\nአዳዲስ ፈጠራዎችን ማመንጨት\nየስራ ፍቅርና ትጋት\nተጠያቂነት",
        valuesEn:
          "Integrity\nDeep insight\nCreating distinction\nService orientation\nAdvanced technology utilization\nGenerating new innovations\nDedication and diligence\nAccountability",
        historyAf: "Qafar Biyaakuh Ineewaa kee Teknoolojii Ergiiysa Biiro ellecabo kee tekno horoya-le xaqli abaanamih xagana.",
        historyAm: "የአፋር ክልል ኢንፎርሜሽንና ቴክኖሎጂ ልማት ቢሮ ቴክኖሎጂ ላይ የተመሰረቱ አገልግሎቶችን ለክልሉ ነዋሪዎች ለማቅረብ ተመሠረተ።",
        historyEn: "The Afar Regional State Innovation and Technology Development Bureau was established to provide technology-driven services to the region's residents and institutions.",
        phone: "+251-33-XXX-XXXX",
        email: "itdb@afar.gov.et",
        addressAf: "Samara, Qafar Biyaaku, Itiyoophiyaa",
        addressAm: "ሰመራ፣ አፋር ክልል፣ ኢትዮዲያ",
        addressEn: "Semera, Afar Regional State, Ethiopia",
        facebookUrl: "https://facebook.com",
      },
    });
    console.log("Created default site settings.");
  }

  const sectorCount = await prisma.sector.count();
  if (sectorCount === 0) {
    await prisma.sector.createMany({
      data: [
        {
          order: 1,
          nameAf: "Bili Magaala Qandaara",
          nameAm: "የዘመናዊ ከተማ ዘርፍ",
          nameEn: "Smart City Sector",
          headTitleAf: "Qandaara Amoyti Aracangaddo",
          headTitleAm: "የዘርፍ ምክትል ኃላፊ",
          headTitleEn: "Deputy Bureau Head",
        },
        {
          order: 2,
          nameAf: "Ellecabo kee Tekno Horoya Qandaara",
          nameAm: "የፈጠራ እና ቴክኖሎጂ ልማት ዘርፍ",
          nameEn: "Innovation and Technology Development Sector",
          headTitleAf: "Qandaara Amoyti Aracangaddo",
          headTitleAm: "የዘርፍ ምክትል ኃላፊ",
          headTitleEn: "Deputy Bureau Head",
        },
        {
          order: 3,
          nameAf: "Ineewaa Taama kee Xaqbo Qandaara",
          nameAm: "የኢንፎርሜሽን ቴክኖሎጂ ኦፕሬሽንና አገልግሎት ዘርፍ",
          nameEn: "Information Technology Operation and Service Sector",
          headTitleAf: "Qandaara Amoyti Aracangaddo",
          headTitleAm: "የዘርፍ ምክትል ኃላፊ",
          headTitleEn: "Deputy Bureau Head",
        },
      ],
    });
    console.log("Created default sectors.");
  }

  const newsCount = await prisma.news.count();
  if (newsCount === 0) {
    await prisma.news.createMany({
      data: [
        {
          slug: "cybersecurity-awareness-training-afar-2026",
          publishedAt: new Date("2026-03-03"),
          coverImage: "/uploads/news/645281142_1349066760593229_5134232077522400965_n.jpg",
          titleEn:
            "Awareness training on implementing cybersecurity policies and standards was held in the Afar region",
          titleAm:
            "በአፋር ክልል በሳይበር ደህንነት ፖሊሲና ስታንዳርድ ትግበራ ዙሪያ የግንዛቤ ማስጨበጫ ስልጠና ተሰጠ",
          titleAf:
            "Qafar Rakaakayal Sayber Amnih Poolisi kee Standard Abbinoysaanam Wagsiisak Hangi Akah Yaceen Innah Aydakaakan Yeceenih Sugen",
          excerptEn:
            "The Information Network Security Administration (ITSA), together with the Afar Regional Science and Innovation Bureau, ran a training session for leaders and experts in Samara.",
          excerptAm:
            "የኢንፎርሜሽን መረብ ደህንነት አስተዳደር (ኢመደአ) ከአፋር ክልል ሳይንስና ኢኖቬሽን ቢሮ ጋር በመተባበር ስልጠና ሰጥቷል።",
          excerptAf:
            "Oyti Retteemah Saay Xiinisso Qafar Rakaakayak Saynis Kee Innoveshin Kutbeh Buxalluk Cattiimak Aydakaakan Yeceenih Yaniinim.",
          contentEn:
            "The Information Network Security Administration (ITSA), together with the Afar Regional Science and Innovation Bureau, ran a training session for leaders and experts on how to implement cybersecurity policies, standards, and frameworks in the city of Samara.",
          contentAm:
            "የኢንፎርሜሽን መረብ ደህንነት አስተዳደር (ኢመደአ) ከአፋር ክልል ሳይንስና ኢኖቬሽን ቢሮ ጋር በመተባበር በሳይበር ደህንነት ፖሊሲ፣ ስታንዳርድና ማዕቀፍ አተገባበር ዙሪያ ለአመራሮችና ባለሙያዎች በሰመራ ከተማ የግንዛቤ ማስጨበጫ ስልጠና ሰጥቷል።",
          contentAf:
            "Oyti Retteemah Saay Xiinisso Qafar Rakaakayak Saynis Kee Innoveshin Kutbeh Buxalluk Cattiimak Sayber Saay Poolisih Standard Kee Frameworks Abbinoysoonuh Miraaciinu Kee Mihratleelah Aydakaakan Samara Magaalal Yeceenih Yaniinim Qaddoosen.",
        },
        {
          slug: "afar-supreme-court-sit-mou-2026",
          publishedAt: new Date("2026-04-13"),
          coverImage: "/uploads/news/669834610_122205059654514787_5649257646141793965_n.jpg",
          titleEn:
            "The Supreme Court of Afar Region and the Regional Bureau of Science, Innovation and Technology have signed a joint understanding letter",
          titleAm:
            "የአፋር ክልል ጠቅላይ ፍርድ ቤት እና የክልሉ ሳይንስ፣ኢኖቬሽንና ቴክኖሎጂ ቢሮ የጋራ የስምምነት ደብዳቤ ተፈራርመዋል",
          titleAf:
            "Qafar Ra/Do/sangerrah comkih buxà kee rakaakayak scinece Innoveshin kee teknologih biiro taamah sittaluk Abitih wara daffese",
          excerptEn:
            "The two institutions agreed to collaborate on developing and improving ICT-related software and media the court is working on.",
          excerptAm:
            "ፍርድ ቤቱ እያዘጋጀው ያሉትን ከአይሲቲ ጋር የተያያዙ ሶፍትዌሮችን እና ሚዲያዎችን በማበልጸግ ላይ ለመተባበር ተፈራርመዋል።",
          excerptAf:
            "Cukmih Buxa ICTit Axawah Tan Softiweer Kee Miidiya Daddos Kee Dadal Sitta Lih Taamitaanamih Ayyuftal Fermat Aben.",
          contentEn:
            "The Supreme Court of Afar Region and the Regional Bureau of Science, Innovation and Technology have signed a joint understanding letter to work together on developing and improving ICT-related software and media that the court is currently working on.",
          contentAm:
            "የአፋር ክልል ጠቅላይ ፍርድ ቤት እና የክልሉ ሳይንስ፣ ኢኖቬሽንና ቴክኖሎጂ ቢሮ ፍርድ ቤቱ እያዘጋጀው ወይም እያበለፀጋቸው ያሉትን ከአይሲቲ ጋር የተያያዙ ሶፍትዌሮችን እና ሚዲያዎችን በማዘጋጀት እና በማበልጸግ ላይ ለመተባበር የጋራ የስምምነት ደብዳቤ ተፈራረሙ።",
          contentAf:
            "Qafar Ra/Do/sangerrah comkih buxà kee rakaakayak scinece Innoveshin kee teknologih biiro Cukmih Buxa Bicissah Tan Hinnay Bicisak Geytimta ICTit Axawah Tan Softiweer Kee Miidiyah Daddos Kee Dadal Sitta Lih Taamitaanamih Ayyuftal Fermat Aben.",
        },
        {
          slug: "kora-one-stop-center-opening",
          publishedAt: new Date("2025-11-17"),
          coverImage: "/uploads/news/583713910_1370145308140505_2477020799977289523_n.jpg",
          titleEn: "A one stop center 'Kora' built in our region, has been opened and is now ready for use",
          titleAm: "በክልላችን የተገነባው ''ኮራ'' የአንድ ማዕከል አገልግሎት ተመርቆ ለአገልግሎት ክፍት ሆኗል",
          titleAf:
            "Koora inki fanteenah Ayfaafayak Asaskih Ayro Federaal kee Rakaakayak Fayya le Miraaciini edde anuk Dooqaysak qembissisne",
          excerptEn:
            "The center helps citizens get answers about good governance, make better use of technology, and boost the region's income.",
          excerptAm:
            "ማዕከሉ ለዜጎች የመልካም አስተዳደር ጥያቄዎችን ለመመለስ፣ የቴክኖሎጂ አጠቃቃምን ለማዘመን እና የክልሉን ገቢ ለማሳደግ ያግዛል።",
          excerptAf:
            "Koora Inki Fanteena Ayfaafay, Taffaafo wakti kee Maalu Finqisekal Ayfaf elle geyan inki qarih fanteena.",
          contentEn:
            "A one stop center 'Kora' built in our region, has been opened and is now ready for use. It's important to have a safe and secure environment in our community to ensure everyone feels protected. The center is set up to help citizens get answers about good governance in a sustainable way, make better use of technology, and boost the region's income.",
          contentAm:
            "በክልላችን የተገነባው ''ኮራ'' የአንድ ማዕከል አገልግሎት ተመርቆ ለአገልግሎት ክፍት ሆኗል። በክልላችን ፈጣን እና ቀልጣፋ አገልግሎትን ለህብረተሰቡ ተደራሽ ለማድረግ መሶብ የአንድ ማዕከል አገልግሎት የሚኖረው ፋይዳ የላቀ ነው። ማዕከሉ ለዜጎች የመልካም አስተዳደር ጥያቄዎችን በዘላቂነት ለመመለስ፣ የቴክኖሎጂ አጠቃቃምን ለማዘመን እና የክልሉን ገቢ ይበልጥ ለማሳደግ የሚቻልበት ስርዓት ነው።",
          contentAf:
            "Koora inki fanteenah Ayfaafayak Asaskih Ayro Federaalak Magaala kee Rakiibo Daddoosih Malaak Gifti Chaltu Saani, Sivil Serviis Komishin Komishiner Dr Makuriya Hayle, Federaal kee Rakaakayak Fayya le Miraaciini edde anuk Dooqaysak qembissisne. Koora inki Fanteenah Ayfaafay, Taffaafo wakti kee Maalu Finqisekal Ayfaf elle geyan inki qarih fanteena.",
        },
        {
          slug: "federal-sit-woreda-net-training-2023",
          publishedAt: new Date("2023-02-10"),
          coverImage: "/uploads/news/474378374_1796433904233716_6077251259182216264_n.jpg",
          titleEn: "Federal Ministry of Science, Innovation and Technology runs 3-day training in Addis Ababa",
          titleAm: "የፌዴራል የሳይንስ ኢኖቬሽን እና ቴክኖሎጂ ሚኒስቴር ስልጠና ሰጥቷል",
          titleAf:
            "Federaalak Science Innovation Kee Technology Minster Addis Ababak Cappital Hoteelil Aydakaakan Gexisak Suge",
          excerptEn:
            "A 3-day training on innovation, technology, and Woreda Net infrastructure for experts from various regions.",
          excerptAm: "ለ3 ቀናት በኢኖቬሽን እና ቴክኖሎጂ፣ በወረዳ ኔት መሠረተ ልማት ማሻሻል ላይ ስልጠና ሰጥቷል።",
          excerptAf: "3 Ayro Baxaabasale Innovation Kee Technologih Caxxibnal Waradanet Daddos Yaysiiseenim.",
          contentEn:
            "The Federal Ministry of Science, Innovation and Technology ran a 3-day training on innovation and technology, plus updating the Woreda Net infrastructure, for experts from various regions at the Addis Ababa Capital Hotel.",
          contentAm:
            "የፌዴራል የሳይንስ ኢኖቬሽን እና ቴክኖሎጂ ሚኒስቴር በአዲስ አበባ ካፒታል ሆቴል ከተለያዩ ክልሎች ለመጡ ባለሙያዎች ለ3 ቀናት በኢኖቬሽን እና ቴክኖሎጂ፣ በወረዳ ኔት መሠረተ ልማት ማሻሻል ላይ ስልጠና ሰጥ።",
          contentAf:
            "Federaalak Science Innovation Kee Technology Minster Addis Ababak Cappital Hoteelil 3 Ayro Baxaabasale Raakaakayak Temeete Mihrat Leelah Innovation Kee Technologih Caxxibnal Waradanet Daddos Yaysiiseenim Kee Gita Yabbixsiiseenimil Aydakaakan Gexisak Suge.",
        },
        {
          slug: "faydaverse-inauguration-2026",
          publishedAt: new Date("2026-08-04"),
          coverImage: "/uploads/news/762903982_1704660970741094_69724987052560085_n.jpg",
          titleEn: "Afar Region Delegation participates in the official inauguration of Faydaverse",
          titleAm: "የአፋር ክልል ልዑካን በፋቫቨርስ ይፋ መክፈቻ ላይ ተሳትፈዋል",
          titleAf: "Qafar Rakaakayih Erga Addis Ababah Skylight Hoteelil Favaverse Baxaabaxsale Fakenimiy Edde Tengelen",
          excerptEn:
            "A landmark event marking a new chapter in Ethiopia's digital transformation journey, inaugurated by Deputy PM H.E. Temesgen Tiruneh.",
          excerptAm: "በኢፌድሪ ምክትል ጠቅላይ ሚኒስትር ክቡር ተመስገን ጥሩነህ የተከፈተ የፋቫቨርስ መክፈቻ ስነ ስርዓት።",
          excerptAf: "Efedrik Ciggiila Naharsi Malaak Kebur Temesgen Tiruneh Baxaabaxsale Caddol Fakkeh Yanim.",
          contentEn:
            "Today Aug 4 2026, the Afar Region Delegation participated in the official inauguration of Faydaverse at the Skylight Hotel in Addis Ababa, a landmark event that marks a new chapter in Ethiopia's digital transformation journey. The ceremony was officially inaugurated by Deputy Prime Minister of FDRE H.E Temesgen Tiruneh, reaffirming the Government's unwavering commitment to building a modern, inclusive, and digitally empowered nation.",
          contentAm:
            "ዛሬ ነሐሴ 4 ቀን 2026 ዓ.ም የአፋር ክልል ልዑካን በኢትዮጵያ ዲጂታል ትራንስፎርሜሽን አዲስ ምዕራፍ አመላካች በሆነው በአዲስ አበባ ስካይላይት ሆቴል የፋቫቨርስ ይፋ መክፈቻ ላይ ተሳትፈዋል። ሥነ ሥርዓቱ በይፋ የተከፈተው በኢፌድሪ ምክትል ጠቅላይ ሚኒስትር ክቡር ተመስገን ጥሩነህ ሲሆን መንግስት ዘመናዊ፣ ሁሉን አቀፍ እና በዲጂታል የፈረጠመች ሀገር ለመፍጠር ያለውን ጠንካራ ቁርጠኝነት አጉልቶ ያሳያል።",
          contentAf:
            "Asaakih Ayro Ximolik 4 Sanat 2026 Qafar Rakaakayih Erga Addis Ababah Skylight Hoteelil Favaverse Baxaabaxsale Fakenimiy Edde Tengelen, Tah Itiyoppiyal Dijital Tabaatabsih Qusba Caddo Tascasse. Tama Qaffayda Efedrik Ciggiila Naharsi Malaak Kebur Temesgen Tiruneh Baxaabaxsale Caddol Fakkeh Yanim Kee Doolat Qasriino Leh Tan Baaxoh Addal Geytimtaah, Inkih Tan Baaxoh Caddol Geytimta Baaxooxa Akah Bicisan Innah Abak Geytimtam Qaddoosen.",
        },
        {
          slug: "fayda-digital-id-forum-2025",
          publishedAt: new Date("2025-09-26"),
          coverImage: "/uploads/news/555548151_4248929002020754_2327337862972448096_n.jpg",
          titleEn: "Discussion forum held on the Fayda Digital ID Implementation Report",
          titleAm: "በፋይዳ ዲጂታል መታወቂያ ትግበራ ላይ የውይይት መድረክ ተካሂዷል",
          titleAf: "Koora inki fanteenah Fayda Ayfaafayak Asaskih Ayro Federaal kee Rakaakayak Fayya le Miraaciini edde anuk Dooqaysak qembissisne",
          excerptEn:
            "Senior leaders, federal ministries, and regional officials reviewed the 2017 Fayda Digital ID report and set direction for 2018.",
          excerptAm: "ከፍተኛ አመራሮች የ2017 ዓ.ም የፋይዳ ዲጂታል መታወቂያ ትግበራ ሪፖርት ገምግመው የ2018 ዓ.ም አቅጣጫ አስቀምጠዋል።",
          excerptAf: "Naharsi Malaakih Kutbeh Buxah Addal Federaal Malaakitteh Fayyale Miraaciinuuy Walal Gudgud Gexsen.",
          contentEn:
            "A discussion forum took place with senior leaders from the Prime Minister's Office, federal ministries, senior regional officials, and key stakeholders. That same day, the 2017 Fayda Digital ID Implementation Report was shared and thoroughly reviewed. Participants talked about the goals and rollout of the 2018 plans, asked questions, gave constructive feedback, and by the end, the direction for the current year was set and the award was handed out.",
          contentAm:
            "በጠቅላይ ሚኒስቴር ጽ/ቤት ከፍተኛ አመራሮች ፣ የፌዴራል ሚኒስቴር መሥሪያ ቤቶች ፣ የክልል ከፍተኛ ሀላፊዎች እንዲሁም ቁልፍ ባለድርሻ አካላት በተገኙበት የውይይት መድረክ ተካሒዷል። በዕለቱም የ2017 ዓ.ም የፋይዳ ዲጂታል መታወቂያ ትግበራ ሪፖርት ቀርቦ በሰፊው ግምገማ የተደረገበት ሲሆን ፤ የ2018 ዓ.ም ግብ እና አተገባበር ምን መምሰል እንዳለበት ውይይት ከተደረገ በኋላ ከተሳታፊዎች ለቀረቡ ጥያቄዎች እና ገንቢ ግብአቶች ላይ ውይይት ተደርጎ እና የያዝነውን አመት አቅጣጫ በማስቀመጥና መጨረሻም ላይ ሽልማት ተበራክቶ ተጠናቋል።",
          contentAf:
            "Naharsi Malaakih Kutbeh Buxah Addal Federaal Malaakitteh Fayyale Miraaciinuuy, Rakaakayak Fayya Le Mirocti Kee Wagitta Dagorti Edde Tengeleh Tan Walal Gudgud Naharsi Malaakih Kutbeh Buxal Gexsen. too ayro, faida xiyitaal mamaxxagah abnissoh gabbaaqu xayyooweh sanat 2017 kee baar luk kusaaqimeh, kee walal gexseenik lakal hadaf kee abnisso sanat 2018, esseroora kee xissimte satqo edde tengele marak walal gexsen kee awayih uddur sanatih afkan daffeysen, kee ellecabol xayyowteh.",
        },
        {
          slug: "national-space-gis-day-2024",
          publishedAt: new Date("2024-01-05"),
          coverImage: "/uploads/news/490328973_4073460209567635_3923260183798761508_n.jpg",
          titleEn: "National Space and International GIS Day held at the Afar National Regional Government",
          titleAm: "ብሄራዊ የስፔስና ዓለም አቀፍ የጂአይኤስ ቀን በአፋር ብሄራዊ ክልላዊ መንግሥት ተካሂዷል",
          titleAf: "Asanat Agat Space Kee Baadak GIS Ayroh Massakaxxa Qafar Agatih Rakaakayih Doolat Gexisse",
          excerptEn:
            "Eng. Saeed Mohammed said the program supports the region's development plan in the sector.",
          excerptAm: "ኢንጂነር ሰኢድ ሙሃመድ ፕሮግራሙ ክልሉ በዘርፉ ላለው እቅድ አጋዥ እንደሆነ ገልፀዋል።",
          excerptAf: "Injineer Saqid Macammad Ta Tadeera Rakaakay Luddal Taamitoonuh Ekraariseenih Yanin Cato Lem Qaddoysak.",
          contentEn:
            "This year's National Space and International GIS Day took place at the Afar National Regional Government. Eng. Saeed Mohammed, Commissioner of the Afar Region Science, Technology and Innovation Commission, said that carrying out the program will support the region's plan to develop the sector and asked the institute to keep working on bringing projects to the region.",
          contentAm:
            "የዘንድሮው ብሄራዊ የስፔስና ዓለም አቀፍ የጂአይኤስ ቀን በአል ማጠቃለያ ዝግጅት በአፋር ብሄራዊ ክልላዊ መንግሥት ተካሂዷል። የአፋር ክልል የሳይንስ፣ ቴክኖሎጂ እና ኢኖቬሽን ኮሚሽን ኮምሽነር ኢንጂነር ሰኢድ ሙሃመድ የፕሮግራም መካሄድ ክልሉ በዘርፉ ለመስራት የያዘውን እቅድ እንደሚያግዝ አንስተው ኢንስቲትዩቱ ፕሮጀክቶችን ወደ ክልሎች ለማውረድ የጀመረውን ጥረት አጠናክሮ እንዲቀጥል ጠይቀዋል።",
          contentAf:
            "Asanat Agat Space Kee Baadak GIS Ayroh Massakaxxa Qafar Agatih Rakaakayih Doolat Gexisse. Qafar Rakaakayak Saynis Teknoloji Kee Innoveshin Komishinik Komishiner Injineer Saqid Macammad Ta Tadeera Abtol Asisak Rakaakay Luddal Taamitoonuh Ekraariseenih Yanin Cato Lem Qaddoysak, Ta Inistituyut Rakaakayitte Fanah Cugaysoosa Baahoonuh Abak Geytiman Macal Bisoh Axcelem Kassiise.",
        },
      ],
    });
    console.log("Created news articles.");
  }

  const galleryCount = await prisma.galleryItem.count();
  if (galleryCount === 0) {
    const fs = await import("fs");
    const path = await import("path");
    const galleryDir = path.join(process.cwd(), "public", "uploads", "gallery");
    const files = fs.readdirSync(galleryDir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));
    await prisma.galleryItem.createMany({
      data: files.map((f) => ({ imageUrl: `/uploads/gallery/${f}` })),
    });
    console.log(`Created ${files.length} gallery items.`);
  }

  const directorateCount = await prisma.directorate.count();
  if (directorateCount === 0) {
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
    console.log("Created default directorates.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
