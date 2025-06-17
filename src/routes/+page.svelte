<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';
	import AddressForm from './AddressForm.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<Card.Root class="w-full max-w-md">
		<Card.Header>
			<Card.Title>Enter your address</Card.Title>
			<Card.Description>Calculate your address now!</Card.Description>
		</Card.Header>
		<Card.Content>
			<AddressForm {data} />
		</Card.Content>
	</Card.Root>
</div>
