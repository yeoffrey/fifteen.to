import { getPlace, searchNearby } from '$lib/server/places';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	//const id = url.searchParams.get('id') || 'ChIJN1t_tDeuEmsRUsoyG83frY4';

	const place = await getPlace('ChIJ8aqZNdpcK4gRJ__WBIAiv4Y');

	// console.log(place);

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
