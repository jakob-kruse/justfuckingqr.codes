<script lang="ts">
	import BitcoinForm from '$lib/components/qrcode/forms/bitcoin.svelte';
	import EmailForm from '$lib/components/qrcode/forms/email.svelte';
	import TextForm from '$lib/components/qrcode/forms/text.svelte';
	import URLForm from '$lib/components/qrcode/forms/url.svelte';
	import VCardForm from '$lib/components/qrcode/forms/vcard.svelte';
	import WifiForm from '$lib/components/qrcode/forms/wifi.svelte';
	import Modal from '$lib/components/qrcode/modal.svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { generateQRCode, type QRCodeOptions, type QRCodeType } from '$lib/qrcode';

	let currentTab = $state<QRCodeType>('text');
	let dataUrl = $state<string>('');

	async function onSubmit(options: QRCodeOptions) {
		try {
			console.log(options);
			dataUrl = await generateQRCode(options);
		} catch (error) {
			console.error(error);
			alert('Could not generate QR code. See console for details.');
		}
	}
</script>

<svelte:head>
	<title>just qr codes</title>
</svelte:head>

<Tabs bind:value={currentTab} class="relative">
	<TabsList class="sticky top-4 grid w-full grid-cols-6">
		<TabsTrigger value="text">Text</TabsTrigger>
		<TabsTrigger value="url">URL</TabsTrigger>
		<TabsTrigger value="vcard">vCard</TabsTrigger>
		<TabsTrigger value="email">Email</TabsTrigger>
		<TabsTrigger value="wifi">WiFi</TabsTrigger>
		<TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
	</TabsList>

	<TabsContent value="text">
		<TextForm {onSubmit} />
	</TabsContent>

	<TabsContent value="url">
		<URLForm {onSubmit} />
	</TabsContent>

	<TabsContent value="vcard">
		<VCardForm {onSubmit} />
	</TabsContent>

	<TabsContent value="email">
		<EmailForm {onSubmit} />
	</TabsContent>

	<TabsContent value="wifi">
		<WifiForm {onSubmit} />
	</TabsContent>

	<TabsContent value="bitcoin">
		<BitcoinForm {onSubmit} />
	</TabsContent>
</Tabs>

{#if dataUrl}
	<Modal bind:dataUrl />
{/if}
