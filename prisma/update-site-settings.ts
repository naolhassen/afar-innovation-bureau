import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const data = {
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
};

async function main() {
  const existing = await prisma.siteSetting.findFirst();
  if (existing) {
    await prisma.siteSetting.update({ where: { id: existing.id }, data });
    console.log("Updated existing site settings with new mission/vision/values.");
  } else {
    await prisma.siteSetting.create({ data });
    console.log("Created site settings with new mission/vision/values.");
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
