import BGIMAGE from "@/assets/bghomepage.jpg";
import LOGO from "@/assets/logo/PUMA_IS.png";
import PUMASection from "@/components/puma/PUMASection";
import About from "@/components/puma/About";
import Background from "@/components/puma/Background";
import { aboutContentInformatics } from "@/lib/data";
import VisionAndMission from "@/components/puma/VisionAndMission";
import { PUMAInformationSystem } from "@/lib/pumaStructure";
import PUMAStructure from "@/components/puma/PUMAStructure";

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
                visi="To make PUMA IS a platform for self-development, enabling students to compete and excel in both soft skills and hard skills, creating independent, innovative, and responsible PUMA and students in the fields of information technology and business, and to have a positive impact on President University and the community."
                misi={["Prioritizing and committing to supporting the aspirations, inspirations, interests, and talents of Information System students.",
                "Promoting the implementation of activities that contribute positively and sustainably to information technology and its applications.",
                "Emphasizing the importance of ethics, integrity, and responsibility in every Information System student at President University.",
                "Building strong and close collaborative relationships with PUSC, PUSB, PUFA, all PUMAs, and CnC.",
                "Assisting and facilitating Information System students and providing opportunities for their participation in competitions and innovative projects, so they are prepared to become future leaders in the field of Information Systems."]}
            />
        </section>
    );
}

export default Page;
