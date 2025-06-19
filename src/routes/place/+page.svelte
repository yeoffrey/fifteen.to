<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#each data.places as place (place.name)}
	{@const { name, address } = place}
	<Card.Root class="mx-auto max-w-md">
		<Card.Header>
			<Card.Title>{name}</Card.Title>
			<Card.Description>{address}</Card.Description>
		</Card.Header>
	</Card.Root>
{/each}
