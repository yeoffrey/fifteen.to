<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#each data.placeRoutes as place (place.name)}
	{@const { name, address, duration } = place}
	<Card.Root class="mx-auto max-w-md">
		<Card.Header>
			<Card.Title>{name}</Card.Title>
			<Card.Description>{address}</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="text-muted-foreground text-sm">
				Estimated duration: {duration} minutes
			</p></Card.Content
		>
	</Card.Root>
{/each}
