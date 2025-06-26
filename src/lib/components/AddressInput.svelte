<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ControlAttrs } from 'formsnap';

	type Props = ControlAttrs & {
		value: string;
		class?: string;
	};

	let { value = $bindable(), class: className, id, name }: Props = $props();
</script>

<input
	{id}
	{name}
	bind:value
	class={cn(
		'border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
		'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
		'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
		className
	)}
/>
