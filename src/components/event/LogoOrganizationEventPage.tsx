import Link from "next/link";
import React from "react";

/**
 * LogoOrganizationEventPage component displays an organization's logo and title.
 *
 * @component
 * @example
 * // Example usage of LogoOrganizationEventPage component
 * <LogoOrganizationEventPage
 *    image="path/to/image.jpg"
 *    title="Event Organization Name"
 * />
 *
 * @param {Object} props - The component props.
 * @param {string} props.image - The path to the organization's logo image.
 * @param {string} props.title - The title or name of the organization.
 * @returns {JSX.Element} React component
 */

interface LogoOrganizationEventPageProps {
   image: string;
   title: string;
   link: string;
}

export default function LogoOrganizationEventPage({
   image,
   title,
   link,
}: LogoOrganizationEventPageProps) {
   return (
      <Link href={`${link}`}>
         <div className="flex flex-col items-center justify-center gap-5 duration-300 hover:scale-110 hover:drop-shadow-2xl">
            <div className="h-[100px] w-[100px] rounded-xl bg-transparent">
               <img
                  className="h-full w-full rounded-lg object-cover"
                  src={image}
                  alt={`${title}'s image`}
               />
            </div>
            <div className="text-center text-sm font-bold">{title}</div>
 </div>
      </Link>
   );
}
