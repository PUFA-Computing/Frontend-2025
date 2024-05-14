import axios from "axios";
import News from "../../models/news";
import { API_NEWS } from "@/config/config";

export const fetchNews = async (): Promise<News[]> => {
   try {
      const response = await axios.get(API_NEWS);
      const newsData = response.data?.data || [];
      return newsData as News[];
   } catch (error) {
      console.error("Error fetching news", error);
      throw error;
   }
};
