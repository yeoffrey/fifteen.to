import { getLocation, searchNearby } from '$lib/server/places';
import { computeRouteMatrix } from '$lib/server/routes';
import { matchPlacesAndRoutes } from '$lib/server/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');

	if (!id) {
		redirect(301, '/?code=missing_id');
	}

	const location = await getLocation(id);

	if (location === null) {
		redirect(301, '/?code=not_found');
	}

	if (location === undefined) {
		redirect(301, '/?code=error');
	}

	// Search for nearby places of type 'bar' or 'cafe' within a 5km radius
	const places = await searchNearby(location, 5000);

	if (!places) {
		redirect(301, '/?code=error');
	}

	const routes = await computeRouteMatrix(
		id,
		places.map((place) => place.id)
	);

	if (!routes) {
		redirect(301, '/?code=error');
	}

	const placeRoutes = matchPlacesAndRoutes(places, routes);

	console.log('Matched places and routes:', placeRoutes);

	return {
		places
	};
};
