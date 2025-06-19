import z from 'zod';
import { placesClient } from './client';

const zLocation = z.object({
	latitude: z.number().min(-90).max(90),
	longitude: z.number().min(-180).max(180)
});
type Location = z.infer<typeof zLocation>;

/**
 * Fetches a place by its ID and returns its location.
 * @param placeId - The ID of the place to fetch.
 * @returns A promise that resolves to the location of the place, null if not found, undefined if there was an error in fetching.
 */
export async function getLocation(placeId: string): Promise<Location | undefined | null> {
	try {
		const [response] = await placesClient.getPlace(
			{
				name: `places/${placeId}`
			},
			{
				otherArgs: {
					headers: {
						'X-Goog-FieldMask': 'location'
					}
				}
			}
		);

		if (!response.location) {
			return null;
		}

		const raw = {
			latitude: response.location.latitude,
			longitude: response.location.longitude
		};

		const parsed = zLocation.safeParse(raw);
		if (!parsed.success) {
			console.error('Failed to parse location:', parsed.error);
			return undefined;
		}

		return parsed.data;
	} catch (error) {
		console.error('Error fetching place location:', error);
		return undefined;
	}
}
