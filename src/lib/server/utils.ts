import type { Place } from './places';
import type { Route } from './routes';

type PlaceRoute = Place & {
	distance: number;
	duration: string;
};

/**
 * Matches places with their corresponding routes based on the destination index.
 * If a route is not found for a place, it will be excluded from the final array.
 *
 * @param {Place[]} places - The array of places to match.
 * @param {Route[]} routes - The array of routes to match against the places.
 * @return {PlaceRoute[]} An array of PlaceRoute objects, each containing place details along with distance and duration.
 */
export function matchPlacesAndRoutes(places: Place[], routes: Route[]): PlaceRoute[] {
	return places
		.map((place, index) => {
			const route = routes.find((r) => r.destinationIndex === index);

			if (!route) {
				return {
					...place,
					distance: null,
					duration: null
				};
			}

			return {
				...place,
				distance: route.distanceMeters,
				duration: route.duration
			};
		})
		.filter((place) => place.distance !== null && place.duration !== null);
}
