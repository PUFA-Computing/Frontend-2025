import { API_ASPIRATION, API_USER } from "@/config/config";
import axios from "axios";
import Aspirations from "@/models/aspiration";

export const fetchAspirations = async (): Promise<Aspirations[]> => {
    try {
       const response = await axios.get(API_ASPIRATION);
       let aspirationData = response.data.data as Aspirations[] || [];

       aspirationData = aspirationData.map((aspiration: Aspirations) => {
            aspiration.created_at = new Date(aspiration.created_at);
            aspiration.updated_at = new Date(aspiration.updated_at);
            return aspiration;
       });

       return aspirationData as Aspirations[];
    } catch (error) {
       // Log an error message and rethrow the error.
       console.error("Error fetching aspirations", error);
       throw error;
    }
};

export const CreateAspiration = async (data: {
   subject: string;
   organization_id: number;
   anonymous: boolean;
   closed: boolean;
   message: string;
}) => {
   try {
      const response = await axios.post(`${API_ASPIRATION}/create`, data, {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
         },
      });
      return response.data;
   } catch (error) {
      // Log an error message and rethrow the error.
      console.error("Error creating aspiration", error);
      throw error;
   }
};
