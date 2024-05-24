import LoginForm from "./_components/LoginForm";
import { Metadata } from "next";
import PUComputing from "@/assets/PUComputing.png";
import Image from "next/image";
import { getSessionServer } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "Sign In",
};

export default async function LoginPage() {
	const session = await getSessionServer();
	if(session) {
		return redirect('/dashboard')
	}
   return (
      <div
         className="bg-cover bg-center"
         style={{ backgroundImage: `url('/doodle.svg')` }}
      >
         <div className="container mx-auto flex min-h-screen items-center justify-center px-6">
            <div className="mx-auto max-w-lg">
               <LoginForm />
            </div>
         </div>
      </div>
   );
}
