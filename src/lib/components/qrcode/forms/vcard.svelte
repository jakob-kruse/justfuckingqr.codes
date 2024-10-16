<script lang="ts">
	import type { FormProps } from '$lib/components/qrcode/forms';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { QRCodeVCardSchema, type QRCodeVCard } from '$lib/qrcode';
	import { superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { defaults } from 'sveltekit-superforms/client';
	import SubmitButton from './submit-button.svelte';

	let { onSubmit }: FormProps = $props();

	const form = superForm(
		defaults(valibot(QRCodeVCardSchema), {
			defaults: {
				type: 'vcard',
				version: 'v2'
			}
		}),
		{
			SPA: true,
			validators: valibot(QRCodeVCardSchema),
			onUpdate({ form }) {
				if (form.valid) {
					onSubmit(form.data as QRCodeVCard);
				}
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<FormField {form} name="firstName">
		<FormControl let:attrs>
			<FormLabel>First Name</FormLabel>
			<Input {...attrs} bind:value={$formData.firstName} placeholder="Jane" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="lastName">
		<FormControl let:attrs>
			<FormLabel>Last Name</FormLabel>
			<Input {...attrs} bind:value={$formData.lastName} placeholder="Doe" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="organization">
		<FormControl let:attrs>
			<FormLabel>Organization</FormLabel>
			<Input {...attrs} bind:value={$formData.organization} placeholder="Company Name" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="positionWork">
		<FormControl let:attrs>
			<FormLabel>Position</FormLabel>
			<Input {...attrs} bind:value={$formData.positionWork} placeholder="Job Title" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="phonePrivate">
		<FormControl let:attrs>
			<FormLabel>Private Phone</FormLabel>
			<Input {...attrs} bind:value={$formData.phonePrivate} placeholder="123-456-7890" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="phoneMobile">
		<FormControl let:attrs>
			<FormLabel>Mobile Phone</FormLabel>
			<Input {...attrs} bind:value={$formData.phoneMobile} placeholder="123-456-7890" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="phoneWork">
		<FormControl let:attrs>
			<FormLabel>Work Phone</FormLabel>
			<Input {...attrs} bind:value={$formData.phoneWork} placeholder="123-456-7890" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="faxWork">
		<FormControl let:attrs>
			<FormLabel>Work Fax</FormLabel>
			<Input {...attrs} bind:value={$formData.faxWork} placeholder="123-456-7890" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="faxPrivate">
		<FormControl let:attrs>
			<FormLabel>Private Fax</FormLabel>
			<Input {...attrs} bind:value={$formData.faxPrivate} placeholder="123-456-7890" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="email">
		<FormControl let:attrs>
			<FormLabel>Email</FormLabel>
			<Input {...attrs} bind:value={$formData.email} placeholder="jane.doe@example.com" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="website">
		<FormControl let:attrs>
			<FormLabel>Website</FormLabel>
			<Input {...attrs} bind:value={$formData.website} placeholder="https://example.com" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="street">
		<FormControl let:attrs>
			<FormLabel>Street</FormLabel>
			<Input {...attrs} bind:value={$formData.street} placeholder="123 Main St" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="zipCode">
		<FormControl let:attrs>
			<FormLabel>Zip Code</FormLabel>
			<Input {...attrs} bind:value={$formData.zipCode} placeholder="12345" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="city">
		<FormControl let:attrs>
			<FormLabel>City</FormLabel>
			<Input {...attrs} bind:value={$formData.city} placeholder="Anytown" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="state">
		<FormControl let:attrs>
			<FormLabel>State</FormLabel>
			<Input {...attrs} bind:value={$formData.state} placeholder="CA" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<FormField {form} name="country" class="mb-8">
		<FormControl let:attrs>
			<FormLabel>Country</FormLabel>
			<Input {...attrs} bind:value={$formData.country} placeholder="USA" />
		</FormControl>
		<FormFieldErrors />
	</FormField>

	<SubmitButton />
</form>
