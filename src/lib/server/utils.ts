import type { Place } from './places';
import type { Route } from './routes';

type PlaceRoute = Place & Pick<Route, 'distanceMeters' | 'duration'>;

/**
 * Matches places with their corresponding routes based on the destination index.
 * If a route is not found for a place, it will be excluded from the final array.
 *
 * @param {Place[]} places - The array of places to match.
 * @param {Route[]} routes - The array of routes to match against the places.
 */
export function matchPlacesAndRoutes(places: Place[], routes: Route[]): PlaceRoute[] {
	return places
		.map((place, index) => {
			const route = routes.find((r) => r.destinationIndex === index);

			if (!route) {
				return {
					...place,
					distanceMeters: null,
					duration: null
				};
			}

			return {
				...place,
				distanceMeters: route.distanceMeters,
				duration: route.duration
			};
		})
		.filter((place) => place.distanceMeters !== null && place.duration !== null);
}
