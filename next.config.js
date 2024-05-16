/** @type {import('next').NextConfig} */
const nextConfig = {
   output: "standalone",
   images: {
     domains: ["id.pufacomputing.live"],
   },
 };

 module.exports = {
     httpAgentOptions: {
         keepAlive:false,
     }
 }, nextConfig;
