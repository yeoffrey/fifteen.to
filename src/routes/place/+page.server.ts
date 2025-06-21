import { getLocation, searchNearby } from '$lib/server/places';
import { computeRouteMatrix } from '$lib/server/routes';
import { type PlaceRoute, matchPlacesAndRoutes } from '$lib/server/utils';
import type { ErrorCode, Result } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

async function prepare(id: string | null): Promise<Result<PlaceRoute[], ErrorCode>> {
	if (!id) {
		return [null, 'missing_id'];
	}

	const location = await getLocation(id);

	if (location === null) {
		return [null, 'not_found'];
	}

	if (location === undefined) {
		return [null, 'error'];
	}

	const places = await searchNearby(location, 5000);

	if (!places) {
		return [null, 'error'];
	}

	const routes = await computeRouteMatrix(
		id,
		places.map((place) => place.id)
	);

	if (!routes) {
		return [null, 'error'];
	}

	const placeRoutes = matchPlacesAndRoutes(places, routes);

	return [placeRoutes, null];
}

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');

	const [placeRoutes, err] = await prepare(id);

	if (err) {
		const url = `/?code=${err}`;
	}

	return {
		placeRoutes
	};
};
