import { FaqProps } from "@/lib/common.type";

/**
 * Faq component represents a frequently asked question with a toggleable answer.
 *
 * @component
 * @example
 * 
 * to use is like this
 * {FaqData.map((FaqContent, index) => (
      <div key={index}>
       <Faq {...FaqContent} />
          </div>
    ))}
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the frequently asked question.
 * @param {string} props.content - The content or answer to the frequently asked question.
 * @param {string} [props.status] - The optional status indicating whether the answer is open or closed.
 * @returns {JSX.Element} React component
 */
export default function Faq({ title, content, status }: FaqProps) {
   return (
      <details open={status === "open"} className="group">
         {/* Summary section for the FAQ */}
         <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-zinc-900 p-4 text-white hover:bg-zinc-800">
            {/* Title of the FAQ */}
            <h2 className="font-medium text-white">{title}</h2>

            {/* Icon for indicating open or closed state */}
            <svg
               className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-white"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
               />
            </svg>
         </summary>

         {/* Answer content for the FAQ */}
         <p className="mt-4 px-4 leading-relaxed text-white bg-zinc-900/50 p-4 rounded-lg">{content}</p>
      </details>
   );
}
