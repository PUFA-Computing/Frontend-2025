import BGIMAGE from "@/assets/background/PUMA_IT.jpg";
import LOGO from "@/assets/logo/PUMA_IT.png";
import PUMASection from "@/components/puma/PUMASection";
import About from "@/components/puma/About";
import Background from "@/components/puma/Background";
import {
    PUMAInformaticsVnM,
    PUMAInformatics,
    aboutContentInformatics,
} from "@/lib/data";
import VisionAndMission from "@/components/puma/VisionAndMission";
import PUMASectionMobile from "@/components/puma/PUMASectionMobile";
import LogoSection from "@/components/puma/LogoSection";
import PUMAStructure from "@/components/puma/PUMAStructure";

function Page() {
    return (
        <section>
            <Background image={BGIMAGE.src} logo={LOGO.src} />
            <PUMASectionMobile
                logo={LOGO.src}
                title="PUMA Informatics"
                slogan="“TOGETHER WE THRIVE, UNITED WE THRIVE”"
                cabinet="FRAGNATIOUS CABINET PERIOD 2023/2024"
            />
            <PUMASection
                title="PUMA Informatics"
                slogan="“TOGETHER WE THRIVE, UNITED WE THRIVE”"
                cabinet="FRAGNATIOUS CABINET PERIOD 2023/2024"
            />
            <About content={aboutContentInformatics} />
            <LogoSection
                title="Letter C, IT, and Circuits"
                image={LOGO.src}
                description="This logo reflects the identity of PUMA
                            Informatics under the Computing faculty. By
                            using elements such as the letter C, IT, and
                            circuits, this logo depicts the attachment,
                            diversity, and unity within PUMA Informatics."
            />
            <PUMAStructure
                divisions={PUMAInformatics}
                color1="slate-50"
                color2="slate-400"
            />{" "}
            <VisionAndMission
                visi={PUMAInformaticsVnM.vision}
                misi={PUMAInformaticsVnM.mission}
            />
        </section>
    );
}

export default Page;
