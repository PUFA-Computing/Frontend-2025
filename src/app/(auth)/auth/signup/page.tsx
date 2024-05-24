import Image from "next/image";
import RegisterForm from "./_components/RegisterForm";
import { Metadata } from "next";
import PUComputing from "@/assets/PUComputing.png";
import { getSessionServer } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "Register",
};

export default async function RegisterPage() {
	const session = await getSessionServer();
	if(session) {
		return redirect('/dashboard')
	}
   return (
      <div
         className="bg-cover bg-center"
         style={{ backgroundImage: `url('/doodle.svg')` }}
      >
         <div className="container mx-auto flex min-h-screen items-center justify-center px-6 py-10">
            <div className="mx-auto max-w-lg" >
               <RegisterForm />
            </div>
         </div>
      </div>
   );
}
