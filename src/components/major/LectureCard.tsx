import Image from "next/image";
import React from "react";

/**
 * Props for the LectureCard component.
 */
interface LectureCardProps {
    /**
     * The path or URL to the lecturer's image.
     */
    image: string;

    /**
     * The name of the lecturer.
     */
    name: string;

    /**
     * The position or title of the lecturer.
     */
    position?: string;
}

/**
 * LectureCard component for displaying information about a lecturer.
 *
 * @component
 * @example
 * const lecturer: LectureCardProps = {
 *   image: "path/to/lecturer-image.jpg",
 *   name: "John Doe",
 *   position: "Professor of Computer Science",
 * };
 * <LectureCard {...lecturer} />
 *
 * @param {LectureCardProps} props - The properties of the LectureCard component.
 * @returns {JSX.Element} - The rendered LectureCard component.
 */
const LectureCard: React.FC<LectureCardProps> = ({ image, name, position }) => {
    return (
        <div className="rounded-xl duration-300 hover:scale-110 hover:shadow-xl">
            <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden">
                <Image
                    className="object-fit"
                    src={image}
                    alt={`${name}'s photo`}
                    height={1280}
                    width={720}
                />
            </div>
            <div className="p-2">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {name}
                </h3>
                <h1 className="text-[18px] font-[500] text-[#0C8CE9]">
                    {position}
                </h1>
            </div>
        </div>
    );
};

export default LectureCard;
