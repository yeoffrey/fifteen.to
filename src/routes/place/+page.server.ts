import { getLocation, searchNearby } from '$lib/server/places';
import { computeRouteMatrix } from '$lib/server/routes';
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

	const places = await searchNearby(location, 5000);

	if (!places) {
		redirect(301, '/?code=error');
	}

	const routes = await computeRouteMatrix(id, [places.map((place) => place.id)[0]]);

	console.log(routes);

	return {
		places
	};
};
