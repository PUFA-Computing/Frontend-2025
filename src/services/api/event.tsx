import axios from "axios";
import Event from "../../models/event";
import { API_EVENT } from "@/config/config";
import FormData from "form-data";

/**
 * An object that caches event data by slug.
 */
const eventCache: { [key: string]: Event } = {};

/**
 * Fetches a list of events from the specified API endpoint.
 *
 * @returns {Promise<Event[]>} A promise that resolves to an array of Event objects.
 * @throws {Error} If an error occurs during the API request.
 */
export const fetchEvents = async (): Promise<Event[]> => {
    try {
        const response = await axios.get(API_EVENT);
        
        // Pastikan response.data ada dan memiliki properti data
        const eventData = response.data?.data || [];

        // Pastikan eventData adalah array sebelum mapping
        if (Array.isArray(eventData)) {
            return eventData.map(event => ({
                ...event,
                start_date: new Date(event.start_date),
                end_date: new Date(event.end_date),
                created_at: new Date(event.created_at),
                updated_at: new Date(event.updated_at || event.created_at)
            }));
        }

        return [];
    } catch (error) {
        console.error("Error fetching events:", error);
        return []; // Return array kosong jika terjadi error
    }
};

/**
 * Fetches a single event by its slug from the specified API endpoint.
 *
 * @returns {Promise<Event>} A promise that resolves to the Event object with the specified ID.
 * @throws {Error} If an error occurs during the API request.
 * @param eventSlug
 */
export const fetchEventBySlug = async (eventSlug: string): Promise<Event> => {
    try {
        // Check if the event is already cached
        if (eventCache[eventSlug]) {
            return eventCache[eventSlug];
        }

        // Make a GET request to the API endpoint
        const response = await axios.get(`${API_EVENT}/${eventSlug}`);

        // Extract the event data from the response
        const eventData = response.data?.data;
        eventData.start_date = new Date(eventData.start_date);
        eventData.end_date = new Date(eventData.end_date);
        eventData.created_at = new Date(eventData.created_at);
        eventData.updated_at = new Date(eventData.updated_at);

        // Cache the event data
        eventCache[eventSlug] = eventData;

        // Return the Event object
        return eventData as Event;
    } catch (error) {
        // Log an error message and rethrow the error
        console.error(`Error fetching event with slug ${eventSlug}`, error);
        throw error;
    }
};

interface EventCreation {
    title: string;
    start_date: string;
    end_date: string;
    organization_id: number;
    description: string;
    max_registration: number;
}

/**
 * Creates a new event using the specified data and sends it to the API endpoint.
 *
 * @param {Event} eventData The data for the new event.
 * @param file The image file for the event.
 * @param accessToken The access token for the user.
 * @returns {Promise<Event>} A promise that resolves to the newly created Event object.
 * @throws {Error} If an error occurs during the API request.
 */
export const createEvent = async (
    eventData: EventCreation,
    file: File,
    accessToken: string
): Promise<Event> => {
    try {
        const formData = new FormData();

        formData.append("file", file, file.name);

        const formattedEventData = {
            ...eventData,
            start_date: new Date(eventData.start_date).toISOString(),
            end_date: new Date(eventData.end_date).toISOString(),
        };

        // Convert eventData to JSON string and append it with content type application/json.
        formData.append("data", JSON.stringify(formattedEventData));

        // Make a POST request to the API endpoint.
        const response = await axios.post(`${API_EVENT}/create`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        });

        // Extract the newly created event data from the response.
        const newEventData = response.data?.data;

        // Return the newly created Event object.
        return newEventData as Event;
    } catch (error) {
        // Log an error message and rethrow the error.
        console.error("Error creating event", error);
        throw error;
    }
};

/**
 * Updates an existing event with the specified ID using the provided data.
 *
 * @param {string} eventId The ID of the event to update.
 * @param {Event} eventData The updated data for the event.
 * @param file The image file for the event.
 * @param accessToken The access token for the user.
 * @returns {Promise<Event>} A promise that resolves to the updated Event object.
 * @throws {Error} If an error occurs during the API request.
 */
export const updateEvent = async (
    eventId: string,
    eventData: EventCreation,
    file: File,
    accessToken: string
): Promise<Event> => {
    try {
        const formData = new FormData();

        formData.append("file", file, file.name);

        const formattedEventData = {
            ...eventData,
            start_date: new Date(eventData.start_date).toISOString(),
            end_date: new Date(eventData.end_date).toISOString(),
        };

        // Convert eventData to JSON string and append it with content type application/json.
        formData.append("data", JSON.stringify(formattedEventData));

        // Make a PUT request to the API endpoint.
        const response = await axios.put(
            `${API_EVENT}/${eventId}/update`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        // Extract the updated event data from the response.
        const updatedEventData = response.data?.data;

        // Return the updated Event object.
        return updatedEventData as Event;
    } catch (error) {
        // Log an error message and rethrow the error.
        console.error(`Error updating event with ID ${eventId}`, error);
        throw error;
    }
};

/**
 * Deletes an existing event with the specified ID from the API endpoint.
 *
 * @param {number} eventId The ID of the event to delete.
 * @param accessToken The access token for the user.
 * @returns {Promise<void>} A promise that resolves when the event has been deleted.
 * @throws {Error} If an error occurs during the API request.
 */
export const deleteEvent = async (
    eventId: number,
    accessToken: string
): Promise<void> => {
    try {
        // Make a DELETE request to the API endpoint.
        await axios.delete(`${API_EVENT}/${eventId}/delete`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        // Log an error message and rethrow the error.
        console.error(`Error deleting event with ID ${eventId}`, error);
        throw error;
    }
};

// Get All users registered for an event
export const fetchUsersRegistered = async (
    eventId: number,
    accessToken: string
) => {
    try {
        // Make a GET request to the API endpoint
        const response = await axios.get(
            `${API_EVENT}/${eventId}/registered-users`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        // Extract the event data from the response
        return response.data?.data;
    } catch (error) {
        // Log an error message and rethrow the error
        console.error(
            `Error fetching users registered for event with ID ${eventId}`,
            error
        );
        throw error;
    }
};

export const totalRegisteredUsers = async (eventId: number) => {
    try {
        // Make a GET request to the API endpoint
        const response = await axios.get(
            `${API_EVENT}/${eventId}/total-participant`
        );

        // Extract the event data from the response
        return response.data?.data; // This should be a number based on the provided API response example
    } catch (error) {
        // Log an error message and rethrow the error
        console.error(
            `Error fetching total registered users for event with ID ${eventId}`,
            error
        );
        throw error;
    }
};
