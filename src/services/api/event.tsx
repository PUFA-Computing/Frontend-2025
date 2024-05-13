import axios from "axios";
import Event from "../../models/event";
import { API_EVENT } from "@/config/config";

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
export  const fetchEvents = async (): Promise<Event[]> => {
   try {
      // Make a GET request to the API endpoint.
      const response = await axios.get(API_EVENT);
      // const response = await axios.get(`${API_EVENT}/?slug=`);

      // Extract event data from the response.
      const eventData = response.data?.data || [];
      eventData.forEach((event: Event) => {
         event.start_date = new Date(event.start_date);
         event.end_date = new Date(event.end_date);
         event.created_at = new Date(event.created_at);
         event.updated_at = new Date(event.updated_at);
      });
      // Return the array of Event objects.
      return eventData as Event[];
   } catch (error) {
      // Log an error message and rethrow the error.
      console.error("Error fetching events", error);
      throw error;
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

/**
 * Creates a new event using the specified data and sends it to the API endpoint.
 *
 * @param {Event} eventData The data for the new event.
 * @returns {Promise<Event>} A promise that resolves to the newly created Event object.
 * @throws {Error} If an error occurs during the API request.
 */
export const createEvent = async (eventData: Event): Promise<Event> => {
   try {
      // Make a POST request to the API endpoint.
      const response = await axios.post(`${API_EVENT}/create`, eventData);

      // Extract the event data from the response.
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
 * @returns {Promise<Event>} A promise that resolves to the updated Event object.
 * @throws {Error} If an error occurs during the API request.
 */
export const updateEvent = async (
   eventId: string,
   eventData: Event
): Promise<Event> => {
   try {
      // Make a PUT request to the API endpoint.
      const response = await axios.put(
         `${API_EVENT}/${eventId}/edit`,
         eventData
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
 * @param {string} eventId The ID of the event to delete.
 * @returns {Promise<void>} A promise that resolves when the event has been deleted.
 * @throws {Error} If an error occurs during the API request.
 */
export const deleteEvent = async (eventId: string): Promise<void> => {
   try {
      // Make a DELETE request to the API endpoint.
      await axios.delete(`${API_EVENT}/${eventId}/delete`);
   } catch (error) {
      // Log an error message and rethrow the error.
      console.error(`Error deleting event with ID ${eventId}`, error);
      throw error;
   }
};
