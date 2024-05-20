import axios from "axios";
import News from "../../models/news";
import { API_NEWS } from "@/config/config";

const newsCache: { [key: string]: News } = {};

export const fetchNews = async (): Promise<News[]> => {
    try {
        const response = await axios.get(API_NEWS);
        const newsData = response.data?.data || [];
        newsData.publish_date = new Date(newsData.publish_date);
        newsData.created_at = new Date(newsData.created_at);
        newsData.updated_at = new Date(newsData.updated_at);

        newsCache[newsData.slug] = newsData;

        return newsData as News[];
    } catch (error) {
        console.error("Error fetching news", error);
        throw error;
    }
};

export const fetchNewsBySlug = async (newsSlug: string): Promise<News> => {
    try {
        if (newsCache[newsSlug]) {
            return newsCache[newsSlug];
        }

        const response = await axios.get(`${API_NEWS}/${newsSlug}`);

        const newsData = response.data?.data;
        newsData.publish_date = new Date(newsData.publish_date);
        newsData.created_at = new Date(newsData.created_at);
        newsData.updated_at = new Date(newsData.updated_at);

        newsCache[newsSlug] = newsData;

        return newsData as News;
    } catch (error) {
        console.error("Error fetching news", error);
        throw error;
    }
};

interface NewsCreation {
    title: string;
    content: string;
    publish_date: Date;
    organization_id: number;
}

export const createNews = async (
    news: NewsCreation,
    file: File
): Promise<News> => {
    try {
        const formData = new FormData();

        formData.append("file", file, file.name);

        const formattedNewsData = {
            ...news,
            publish_date: new Date(news.publish_date).toISOString(),
        };

        formData.append("data", JSON.stringify(formattedNewsData));

        console.log(formattedNewsData);
        console.log(file);

        const response = await axios.post(`${API_NEWS}/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });

        const newsData = response.data?.data;

        return newsData as News;
    } catch (error) {
        console.error("Error creating news", error);
        throw error;
    }
};
