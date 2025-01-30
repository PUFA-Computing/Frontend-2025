import Seperator from "@/components/Seperator";
import React from "react";

interface PaymentMethod {
   bankName: string;
   accountNumber: string;
   accountHolder: string;
}

interface ContactPerson {
   name: string;
   phoneNumber: string;
}

export default function page() {
   const paymentMethods: PaymentMethod[] = [
      
      {
         bankName: "ShopeePay",
         accountNumber: "081294807325",
         accountHolder: "Dian Vania Jessicha",
      },
      {
         bankName: "Line Bank/Hana Bank",
         accountNumber: "183377746330",
         accountHolder: "Dinda Ayu Maulina",
      },
   ];

   const contactPerson: ContactPerson = {
      name: "Kevin Marchanda",
      phoneNumber: "0012003483290",
   };

   return (
      <>
         {/* header title  */}
         <header className="bg-gray-200 px-4 py-4 md:px-[10rem] md:py-10">
            <div className="border-l-4 border-orange-500 pl-4">
               <h1 className="text-[1.5rem] font-bold md:text-[2rem]">
                  Computing Store
               </h1>
               <p className="text-[0.7rem] md:text-[0.8rem]">
                  Special merchandise for all Computizens
               </p>
            </div>
         </header>

         <section className="space-y-6 px-4 py-4 md:px-[10rem] md:py-10">
            <div className="">
               <h1 className="text-[1rem] md:text-[1.2rem]">
                  Great Choices, Computizen!
               </h1>
               <h1 className="text-[1rem] font-bold md:text-[1.2rem]">
                  Let's finish up the payment and your item(s) will arrive soon!
               </h1>
            </div>

            <hr className="h-[1px] bg-gray-200 md:h-[2px]" />

            {/* details order  */}
            <div className="flex flex-col gap-4">
               <div>
                  <h1 className="text-[1rem] font-bold md:text-[1.2rem]">
                     Details Order
                  </h1>
                  <h1 className="text-[0.7rem] md:text-[0.8rem]">
                     Details of your order(s)
                  </h1>
               </div>
               <div className="flex flex-col gap-4 md:flex-row">
                  <div className="h-[120px] w-full rounded-lg bg-black md:h-[200px] md:w-[160px]"></div>
                  <div className="flex w-full flex-col gap-3 md:w-auto">
                     <h1 className="text-[0.9rem] font-bold md:text-[1.1rem]">
                        Computing Varsity
                     </h1>
                     <h1 className="text-[0.9rem] font-bold text-orange-500 md:text-[1.1rem]">
                        Rp. 250,000
                     </h1>
                     <div className="flex items-center gap-3">
                        <h1 className="text-[0.8rem] md:text-[0.9rem]">
                           Color:
                        </h1>
                        <button className="rounded-xl border border-gray-400 px-3 py-1 text-[0.7rem] text-gray-400 md:px-4 md:text-[0.8rem]">
                           Black n Grey
                        </button>
                     </div>
                     <div className="flex items-center gap-3">
                        <h1 className="text-[0.8rem] md:text-[0.9rem]">
                           Size:
                        </h1>
                        <button className="ml-1 rounded-xl border border-gray-400 px-3 py-1 text-[0.7rem] text-gray-400 md:ml-3 md:px-4 md:text-[0.8rem]">
                           XL
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* notes textbox */}
            <div>
               <input
                  type="text"
                  name=""
                  id=""
                  className="w-full rounded-lg border-2 border-gray-200 p-2 text-[0.7rem] md:w-[50%] md:text-[0.8rem]"
                  placeholder="Notes"
               />
            </div>

            {/* address info */}
            <div className="flex flex-col gap-2">
               <h1 className="text-[0.9rem] md:text-[1rem]">Address</h1>
               <h1 className="text-[0.9rem] md:text-[1rem]">
                  Let us know where to send your order(s)
               </h1>
               <input
                  type="text"
                  name=""
                  id=""
                  className="w-full rounded-lg border-2 border-gray-200 p-2 text-[0.7rem] md:text-[0.8rem]"
                  placeholder="SBH, G-444"
               />
            </div>

            {/* payment method  */}
            <div className="flex flex-col gap-6">
               <div>
                  <h1 className="text-[1rem] font-bold md:text-[1.2rem]">
                     Payment Method
                  </h1>
                  <h1 className="text-[0.7rem] text-gray-400 md:text-[0.8rem]">
                     Payment can be made via:
                  </h1>
               </div>

               {paymentMethods.map((method, index) => (
                  <div key={index} className="text-[0.9rem] md:text-[1rem]">
                     <h1>{method.bankName}:</h1>
                     <h1>{method.accountNumber}</h1>
                     <h1>a/n {method.accountHolder}</h1>
                  </div>
               ))}

               <div>
                  <h1 className="text-[1rem] font-bold md:text-[1.2rem]">
                     Contact Person
                  </h1>
                  <h1 className="text-[0.9rem] md:text-[1rem]">
                     {contactPerson.phoneNumber} ({contactPerson.name})
                  </h1>
               </div>
            </div>

            {/* submit proof box  */}
            <div className="flex flex-col gap-4">
               <h1 className="text-[1rem] font-bold md:text-[1.2rem]">
                  Submit your payment proof!
               </h1>
               <label className="border-2 border-dashed bg-white py-10 text-center md:py-20">
                  <input type="file" className="hidden" accept="image/*" />
                  <h1 className="text-gray-400">
                     Click here to upload your payment proof!
                  </h1>
                  <h1 className="text-[0.7rem] italic text-gray-400 md:text-[0.8rem]">
                     Minimum: 1 photo, Maximum: 3 photos
                  </h1>
                  <h1 className="text-gray-400">...</h1>
               </label>
               <div className="mt-4 flex self-center md:mt-6">
                  <button className="rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-[0.9rem] transition-all duration-200 hover:scale-110 hover:shadow-lg md:px-[12rem] md:py-4 md:text-[1rem]">
                     Submit
                  </button>
               </div>
            </div>
         </section>
      </>
   );
}
