<script lang="ts">
	import type { FormProps } from '$lib/components/qrcode/forms';
	import {
		FormControl,
		FormField,
		FormFieldErrors,
		FormFieldset,
		FormLabel,
		FormLegend
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { RadioGroup, RadioGroupInput, RadioGroupItem } from '$lib/components/ui/radio-group';
	import { QRCodeWIFISchema, type QRCodeWIFI } from '$lib/qrcode';
	import { cn } from '$lib/utils';
	import { superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { defaults } from 'sveltekit-superforms/client';
	import SubmitButton from './submit-button.svelte';

	let { onSubmit }: FormProps = $props();

	const form = superForm(
		defaults(valibot(QRCodeWIFISchema), {
			defaults: {
				type: 'wifi',
				encryption: 'wpa',
				ssid: '',
				password: ''
			}
		}),
		{
			SPA: true,
			validators: valibot(QRCodeWIFISchema),
			onUpdate({ form }) {
				if (form.valid) {
					onSubmit(form.data as QRCodeWIFI);
				}
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<FormField {form} name="ssid">
		<FormControl let:attrs>
			<FormLabel>Access Point Name</FormLabel>
			<Input {...attrs} bind:value={$formData.ssid} placeholder="My Network" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormFieldset
		{form}
		name="type"
		class={cn('space-y-3', {
			'mb-8': $formData.encryption === 'none'
		})}
	>
		<FormLegend>Encryption</FormLegend>

		<RadioGroup bind:value={$formData.encryption} class="flex flex-col space-y-1">
			<div class="flex items-center space-x-3 space-y-0">
				<FormControl let:attrs>
					<RadioGroupItem value="none" {...attrs} />
					<FormLabel class="font-normal">Unsecured</FormLabel>
				</FormControl>
			</div>
			<div class="flex items-center space-x-3 space-y-0">
				<FormControl let:attrs>
					<RadioGroupItem value="wep" {...attrs} />
					<FormLabel class="font-normal">WEP</FormLabel>
				</FormControl>
			</div>
			<div class="flex items-center space-x-3 space-y-0">
				<FormControl let:attrs>
					<RadioGroupItem value="wpa" {...attrs} />
					<FormLabel class="font-normal">WPA/WPA2 (Most common)</FormLabel>
				</FormControl>
			</div>
			<RadioGroupInput name="encryption" />
		</RadioGroup>
		<FormFieldErrors />
	</FormFieldset>

	{#if $formData.encryption !== 'none'}
		<FormField {form} name="password" class="mb-8">
			<FormControl let:attrs>
				<FormLabel>Password</FormLabel>
				<Input {...attrs} bind:value={$formData.password} placeholder="MyPassword" />
			</FormControl>
			<FormFieldErrors />
		</FormField>
	{/if}

	<SubmitButton />
</form>
