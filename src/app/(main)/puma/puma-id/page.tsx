import BGIMAGE from "@/assets/bghomepage.jpg";
import LOGO from "@/assets/logo/PUMA_ID.png";
import PUMASection from "@/components/puma/PUMASection";
import About from "@/components/puma/About";
import Background from "@/components/puma/Background";
import { aboutContentInformatics } from "@/lib/data";
import PUMAStructure from "@/components/puma/PUMAStructure";
import { PUMAInteriorDesign } from "@/lib/pumaStructure";
import VisionAndMission from "@/components/puma/VisionAndMission";

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
            <PUMAStructure divisions={PUMAInteriorDesign} />
            <VisionAndMission
                visi="Become an organization that can develop interest, creativity and skills, and ability forming a generation that upholds values family with the ability to think maturely in an effort to build good relations."
                misi={[
                    "Building solidity and solidarity among Interior Design students through the implementation of routine student activities.",
                    "Improve and develop the creativity of Interior Design President University students.",
                    "Establishing student activities of Interior Design President University.",
                    "Conduct professional training activities in order to improve academic insight.",
                    "Participate in student activities at regional, national, and international levels.",
                ]}
            />
        </section>
    );
}

export default Page;
