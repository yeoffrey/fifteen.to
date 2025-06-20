import type { Place } from './places';
import type { Route } from './routes';

type PlaceRoute = Place & {
	distance: number;
	duration: string;
};

export function matchPlacesAndRoutes(places: Place[], routes: Route[]): PlaceRoute[] {
	// Each route has a 'destinationIndex' that corresponds to the index of the place in the 'places' array
	return places
		.map((place, index) => {
			const route = routes.find((r) => r.destinationIndex === index);

			if (!route) {
				// What should happen if no route is found?
				// For now, we will just remove the place from the final array
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
