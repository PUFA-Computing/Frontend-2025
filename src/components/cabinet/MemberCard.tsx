import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { UrlObject } from "url";

interface MemberCardProps {
   image: string | StaticImageData;
   name: string;
   position: string;
   instagram?: string | UrlObject;
   linkedin?: string | UrlObject;
}

const MemberCard: React.FC<MemberCardProps> = ({
   image,
   name,
   position,
   instagram,
   linkedin,
}) => {
   return (
      <div>
         <div className="mx-auto max-w-xs rounded-md">
            <div className="flex justify-center">
               {(linkedin || instagram) && (
                  <div className="absolute z-20 flex h-72 w-48 items-end justify-center gap-8 rounded-md bg-black p-4 opacity-0 transition-all duration-300 hover:opacity-80">
                     {linkedin && (
                        <Link href={linkedin as string} passHref>
                           <FaLinkedin
                              size={25}
                              className="text-[#FFD700] duration-300 hover:text-[#FFD700]/80"
                           />
                        </Link>
                     )}
                     {instagram && (
                        <Link href={instagram as string} passHref>
                           <FaInstagram
                              size={25}
                              className="text-[#FFD700] duration-300 hover:text-[#FFD700]/80"
                           />
                        </Link>
                     )}
                  </div>
               )}
               <Image
                  src={image}
                  alt={`${name}'s Photo`}
                  width={720}
                  height={1280}
                  className="relative z-10 mx-auto h-72 w-48 rounded-xl object-cover object-center opacity-100 transition-all hover:opacity-20"
               />
            </div>

            <div className="flex flex-col items-center justify-between space-y-8 p-6">
               <div className="space-y-2">
                  <h2 className="text-center text-[1rem] font-[600] capitalize text-[#FFD700]">
                     {name}
                  </h2>
                  <p className="text-center text-[0.875rem] font-[400] capitalize text-[#FFD700]/80">
                     {position}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MemberCard;
