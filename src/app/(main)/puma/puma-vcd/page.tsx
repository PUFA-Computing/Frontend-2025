import BGIMAGE from "@/assets/bghomepage.jpg";
import LOGO from "@/assets/logo/PUMA_VCD.png";
import PUMASection from "@/components/puma/PUMASection";
import About from "@/components/puma/About";
import Background from "@/components/puma/Background";
import { aboutContentInformatics } from "@/lib/data";
import PUMAStructure from "@/components/puma/PUMAStructure";
import { PUMAVisualCommunicationDesign } from "@/lib/pumaStructure";
import VisionAndMission from "@/components/puma/VisionAndMission";
import { PUMAVisualCommunicationDesignVnM } from "@/lib/pumaVisionMission";

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
            <PUMAStructure divisions={PUMAVisualCommunicationDesign}/>
            <VisionAndMission
                visi={PUMAVisualCommunicationDesignVnM.vision}
                misi={PUMAVisualCommunicationDesignVnM.mission}
            />
        </section>
    );
}

export default Page;
