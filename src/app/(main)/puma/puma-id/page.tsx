import BGIMAGE from "@/assets/bghomepage.jpg";
import LOGO from "@/assets/logo/PUMA_ID.png";
import PUMASection from "@/components/puma/PUMASection";
import About from "@/components/puma/About";
import Background from "@/components/puma/Background";
import { aboutContentInformatics } from "@/lib/data";
import PUMAStructure from "@/components/puma/PUMAStructure";
import { PUMAInteriorDesign } from "@/lib/data";
import VisionAndMission from "@/components/puma/VisionAndMission";
import { PUMAInteriorDesignVnM } from "@/lib/data";

function Page() {
    return (
        <section>
            <Background image={BGIMAGE.src} logo={LOGO.src} />
            <PUMASection
                title="PUMA Informatics"
                slogan="“TOGETHER WE THRIVE, UNITED WE THRIVE”"
                cabinet="FRAGNATIOUS CABINET PERIOD 2023/2024"
            />

            <About content={aboutContentInformatics} />
            <PUMAStructure
                divisions={PUMAInteriorDesign}
                color1="#0e7490"
                color2="#cffafe"
            />
            <VisionAndMission
                visi={PUMAInteriorDesignVnM.vision}
                misi={PUMAInteriorDesignVnM.mission}
            />
        </section>
    );
}

export default Page;
