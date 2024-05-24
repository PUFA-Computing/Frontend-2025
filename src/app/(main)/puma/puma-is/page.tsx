import BGIMAGE from "@/assets/bghomepage.jpg";
import LOGO from "@/assets/logo/PUMA_IS.png";
import PUMASection from "@/components/puma/PUMASection";
import About from "@/components/puma/About";
import Background from "@/components/puma/Background";
import { aboutContentInformatics } from "@/lib/data";

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
        </section>
    );
}

export default Page;
