import Link from "next/link";
import Button from "@/components/Button";
import { StudyProgramDataProps } from "@/lib/common.type";
/**
 * StudyProgCard component represents a card for displaying information about a study program.
 *
 * @component
 * @example
 * // Assuming StudyProgramData is an array of study program objects.
 * // import StudyProgCard from "@/path-to-your-components/StudyProgCard";
 * // import { StudyProgramData } from "@/path-to-your-lib/common.type";
 *
 * // Inside your component where you use StudyProgCard:
 * function YourComponent() {
 *    return (
 *       <div>
 *          {StudyProgramData.map((prodi, index) => (
 *             <div key={index}>
 *                <StudyProgCard {...prodi} />
 *             </div>
 *          ))}
 *       </div>
 *    );
 * }
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the study program.
 * @param {string} props.article - A brief description or article about the study program.
 * @param {string} [props.link] - The optional link to navigate to when the "See Details" button is clicked.
 * @returns {JSX.Element} React component
 */
export default function StudyProgCard({
    title,
    article,
    link,
}: StudyProgramDataProps) {
    return (
        // Hover effect for the card gradient from bottom to top
        <div className="max-w-[16rem] translate-y-0 transform select-none rounded-xl border border-[#3C99DC] bg-white p-3 text-center shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:bg-gradient-to-t hover:from-sky-50 hover:via-sky-300/10 hover:to-white">
            {/* Display the title of the study program */}
            <p className="text-2xl md:text-base">{title}</p>
            {/* Horizontal line for separation */}
            <hr className="mx-auto mb-12 mt-4 w-16 border border-[#3C99DC]" />
            {/* Display the article or description of the study program on larger screens */}
            <p className="my-16 hidden h-[8rem] md:block">{article}</p>
            {/* Button to navigate to the details page, with optional link */}
            <Link href={link || "/"}>
                <Button className="mx-auto my-4 w-max text-[#3C99DC]">
                    See Details
                </Button>
            </Link>
        </div>
    );
}
