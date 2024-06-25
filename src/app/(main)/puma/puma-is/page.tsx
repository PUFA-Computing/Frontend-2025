import BGIMAGE from "@/assets/bghomepage.jpg";
import LOGO from "@/assets/logo/PUMA_IS.png";
import PUMASection from "@/components/puma/PUMASection";
import About from "@/components/puma/About";
import Background from "@/components/puma/Background";
import { aboutContentInformatics } from "@/lib/data";
import VisionAndMission from "@/components/puma/VisionAndMission";
import { PUMAInformationSystem } from "@/lib/pumaStructure";
import PUMAStructure from "@/components/puma/PUMAStructure";
import { PUMAInformationSystemVnM } from "@/lib/pumaVisionMission";

function Page() {
    return (
        <section>
            <Background image={BGIMAGE.src} logo={LOGO.src} />
            <PUMASection
                title="PUMA Information System"
                slogan="“Navigate Now, Together be The Best”"
                cabinet="HARSANAYA CABINET PERIOD 2023/2024"
            />

            <About content={aboutContentInformatics} />
            <PUMAStructure divisions={PUMAInformationSystem} />
            <VisionAndMission
                visi={PUMAInformationSystemVnM.vision}
                misi={PUMAInformationSystemVnM.mission}
            />
        </section>
    );
}

export default Page;
