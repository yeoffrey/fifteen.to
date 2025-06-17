import { GOOGLE_MAPS_SERVER_API_KEY } from '$env/static/private';
import { PlacesClient } from '@googlemaps/places';

// Instantiates a client
export const placesClient = new PlacesClient({
	apiKey: GOOGLE_MAPS_SERVER_API_KEY
});
