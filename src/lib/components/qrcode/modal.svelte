<script lang="ts">
	import type { QRCodeOptions } from '$lib/qrcode';
	import {
		Dialog,
		DialogHeader,
		DialogTitle,
		DialogContent,
		DialogClose
	} from '$lib/components/ui/dialog';
	import DialogDescription from '../ui/dialog/dialog-description.svelte';
	import { onMount } from 'svelte';

	type Props = {
		dataUrl: string | null;
	};
	let { dataUrl = $bindable() }: Props = $props();
</script>

<Dialog
	open={!!dataUrl}
	onOpenChange={(isOpen) => {
		if (!isOpen) dataUrl = null;
	}}
>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>QR Code</DialogTitle>
			<DialogDescription>Your generated QR Code</DialogDescription>
			<DialogClose />
		</DialogHeader>

		{#if dataUrl}
			<img src={dataUrl} alt="Generated QR Code" class="aspect-square w-full" />
		{/if}
	</DialogContent>
</Dialog>
