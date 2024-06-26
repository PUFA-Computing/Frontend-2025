import BGIMAGE from "@/assets/bghomepage.jpg";
import LOGO from "@/assets/logo/PUMA_VCD.png";
import PUMASection from "@/components/puma/PUMASection";
import About from "@/components/puma/About";
import Background from "@/components/puma/Background";
import PUMAStructure from "@/components/puma/PUMAStructure";
import {
    PUMAVisualCommunicationDesign,
    PUMAVisualCommunicationDesignVnM,
    aboutContentInformatics,
} from "@/lib/data";
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
            <PUMAStructure
                divisions={PUMAVisualCommunicationDesign}
                color1="slate-50"
                color2="slate-400"
            />
            <VisionAndMission
                visi={PUMAVisualCommunicationDesignVnM.vision}
                misi={PUMAVisualCommunicationDesignVnM.mission}
            />
        </section>
    );
}

export default Page;
