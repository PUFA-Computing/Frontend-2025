/** @type {import('next').NextConfig} */
const nextConfig = {
   output: "standalone",
   images: {
     domains: [
         "sg.pufacomputing.live",
         "id.pufacomputing.live",
     ],
   },
 };

 module.exports = nextConfig;
