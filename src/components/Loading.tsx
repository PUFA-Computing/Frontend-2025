import { ClockLoader } from "react-spinners";

export default function Loading() {
   return (
      <div className="flex h-screen items-center justify-center">
         <ClockLoader color="#36d7b7" size={100}/>{" "}
      </div>
   );
}
