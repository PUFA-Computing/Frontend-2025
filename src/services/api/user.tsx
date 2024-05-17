import axios from "axios";
import { API_EVENT, API_USER } from "@/config/config";
import Event from "@/models/event";

// User
export async function GetUserProfile() {
   try {
      const id = localStorage.getItem("userId");
      const response = await axios.get(`${API_USER}/${id}`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
         },
      });
      return response.data?.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function UpdateUserProfile() {
    try {
       const id = localStorage.getItem("userId");
       const response = await axios.put(`${API_USER}/${id}`, {
          headers: {
             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
       });

       return response.data?.data;
    } catch (error) {
         console.log(error);
         throw error;
    }
}

export async function DeleteUserProfile() {
   try {
      const response = await axios.delete(`${API_USER}/delete`);
      return response.data.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function Logout() {
   try {
      const response = await axios.post(`${API_USER}`);
      return response.data.data;
   } catch (error) {
      console.log(error);
      throw error;
   }
}

// Admin
export async function GetUser() {
   try {
      const response = await axios.get(`${API_USER}/list`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
      });

      return response.data.data;
    }
    catch (error) {
      console.log(error);
      throw error;
    }

}

/** Fetches the events that the user has registered for from the API.
 * @param {string} userId The ID of the user to fetch events for.
 * @returns {Promise<Event[]>} A promise that resolves to an array of Event objects.
 * @throws {Error} If an error occurs during the API request.
 */
export async function fetchUserEvents(userId: string): Promise<Event[]> {
   try {
      const token = localStorage.getItem("access_token");
      if (!token) {
         throw new Error("No access token found");
      }

      const response = await axios.get(`${API_USER}/registered-events`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      return response.data?.data || [];
   } catch (error) {
      console.error("Error fetching user events", error);
      throw error;
   }
}
