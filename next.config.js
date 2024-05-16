/** @type {import('next').NextConfig} */
const nextConfig = {
   output: "standalone",
   images: {
     domains: ["sg.pufacomputing.live"],
   },
 };

 module.exports = {
     httpAgentOptions: {
         keepAlive:false,
     }
 }, nextConfig;
