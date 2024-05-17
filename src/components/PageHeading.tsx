import React from "react";

interface PageHeadingProps {
   title: string;
   description: string;
   borderColor: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({
   title,
   description,
   borderColor,
}) => {
   const borderClass = borderColor ? `border-l-4 border-[${borderColor}]` : "";

   return (
      <section className="flex flex-col bg-[#F2F2F2] px-[2rem] py-[2rem] md:px-[10rem]">
         <div className={`${borderClass} pl-4`}>
            <h1 className="text-[2rem] font-[600]">{title}</h1>
            <h1 className="text-[0.8rem]">{description}</h1>
         </div>
      </section>
   );
};

export default PageHeading;