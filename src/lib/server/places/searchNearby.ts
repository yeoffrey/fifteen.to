import z from 'zod';
import { placesClient } from './client';

type Location = {
	latitude: number;
	longitude: number;
};

const zPlace = z.object({
	id: z.string(),
	address: z.string(),
	name: z.string()
});
type Place = z.infer<typeof zPlace>;

/**
 * Searches for nearby places of type 'bar' or 'cafe' within a specified radius from a given location.
 *
 * @param {Location} location - The geographical location to search around.
 * @param {number} radius - The radius in meters within which to search for places.
 * @returns {Promise<Place[] | undefined>} A promise that resolves to an array of places or undefined if an error occurs.
 */
export async function searchNearby(
	location: Location,
	radius: number
): Promise<Place[] | undefined> {
	const { latitude, longitude } = location;

	try {
		const [response] = await placesClient.searchNearby(
			{
				locationRestriction: {
					circle: {
						center: {
							latitude,
							longitude
						},
						radius
					}
				},
				includedTypes: ['bar', 'cafe']
			},
			{
				otherArgs: {
					headers: {
						'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress'
					}
				}
			}
		);

		if (!response.places) {
			return [];
		}

		const nearbyPlaces: Place[] = [];

		for (const place of response.places) {
			const raw = {
				id: place.id,
				address: place.formattedAddress,
				name: place.displayName?.text
			};

			const parsed = zPlace.safeParse(raw);

			if (parsed.success) nearbyPlaces.push(parsed.data);
		}

		return nearbyPlaces;
	} catch (error) {
		console.error('Error searching nearby places:', error);
		return undefined;
	}
}
