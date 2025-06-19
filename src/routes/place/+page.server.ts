import { getPlace, searchNearby } from '$lib/server/places';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');

	if (!id) {
		redirect(301, '/?code=missing_id');
	}

	const place = await getPlace(id);

	const another = await searchNearby(
		{
			latitude: place.location?.latitude as number,
			longitude: place.location?.longitude as number
		},
		5000
	);

	return {
		another
	};
};
