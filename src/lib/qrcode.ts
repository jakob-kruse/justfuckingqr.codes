import { debounce } from '$lib';
import QRCode from 'qrcode';
import {
	email,
	literal,
	minLength,
	number,
	object,
	optional,
	pipe,
	string,
	union,
	url,
	type InferOutput
} from 'valibot';

export const QRCodeTextSchema = object({
	text: pipe(string(), minLength(1, 'Text must be at least 1 character long')),
	type: literal('text')
});

export type QRCodeText = InferOutput<typeof QRCodeTextSchema>;

export const QRCodeURLSchema = object({
	url: pipe(string(), url('URL must be a valid URL')),
	type: literal('url')
});

export type QRCodeURL = InferOutput<typeof QRCodeURLSchema>;

export const QRCodeVCardSchema = object({
	type: literal('vcard'),
	version: union([
		literal('v2'),
		literal('v3')
	]),
	firstName: optional(string()),
	lastName: optional(string()),
	organization: optional(string()),
	positionWork: optional(string()),
	phonePrivate: optional(string()),
	phoneMobile: optional(string()),
	phoneWork: optional(string()),
	faxWork: optional(string()),
	faxPrivate: optional(string()),
	email: optional(pipe(string(), email('Email must be a valid email address'))),
	website: optional(pipe(string(), url("Website must be a valid URL"))),
	street: optional(string()),
	zipCode: optional(string()),
	city: optional(string()),
	state: optional(string()),
	country: optional(string())
});

export type QRCodeVCard = InferOutput<typeof QRCodeVCardSchema>;

export type QRCodeGenerationsOptionsEmail = {
	type: 'email';
	email: string;
	subject?: string;
	body?: string;
};

export const QRCodeEmailSchema = object({
	type: literal('email'),
	email: pipe(string(), email('Email must be a valid email address')),
	subject: pipe(string(), minLength(1, 'Subject must be at least 1 character long')),
	body: optional(string())
});

export type QRCodeEmail = InferOutput<typeof QRCodeEmailSchema>;


export const QRCodeWIFISchema = object({
	type: literal('wifi'),
	ssid: pipe(string(), minLength(1, 'SSID must be at least 1 character long')),
	password: optional(string()),
	encryption: union([literal('none'), literal('wep'), literal('wpa')])
});

export type QRCodeWIFI = InferOutput<typeof QRCodeWIFISchema>;

export const QRCodeBitcoinSchema = object({
	type: literal('bitcoin'),
	address: pipe(string(), minLength(1, 'Address must be at least 1 character long')),
	amount: optional(number()),
	label: optional(string())
});

export type QRCodeBitcoin = InferOutput<typeof QRCodeBitcoinSchema>;

export type QRCodeOptions =
	| QRCodeText
	| QRCodeURL
	| QRCodeVCard
	| QRCodeEmail
	| QRCodeWIFI
	| QRCodeBitcoin;

export async function generateQRCode(options: QRCodeOptions): Promise<string> {
	let data: string;

	switch (options.type) {
		case 'text':
			data = options.text;
			break;

		case 'url':
			data = options.url;
			break;

		case 'vcard': {
			const vcardData = [
				'BEGIN:VCARD',
				`VERSION:${options.version === 'v2' ? '2.1' : '3.0'}`,
				options.firstName ? `FN:${options.firstName} ${options.lastName ?? ''}`.trim() : '',
				options.organization ? `ORG:${options.organization}` : '',
				options.positionWork ? `TITLE:${options.positionWork}` : '',
				options.phonePrivate ? `TEL;TYPE=home,voice:${options.phonePrivate}` : '',
				options.phoneMobile ? `TEL;TYPE=cell,voice:${options.phoneMobile}` : '',
				options.phoneWork ? `TEL;TYPE=work,voice:${options.phoneWork}` : '',
				options.faxWork ? `TEL;TYPE=work,fax:${options.faxWork}` : '',
				options.faxPrivate ? `TEL;TYPE=home,fax:${options.faxPrivate}` : '',
				options.email ? `EMAIL:${options.email}` : '',
				options.website ? `URL:${options.website}` : '',
				options.street || options.city || options.zipCode || options.state || options.country
					? `ADR;TYPE=home:;;${options.street ?? ''};${options.city ?? ''};${options.state ?? ''};${options.zipCode ?? ''};${options.country ?? ''}`
					: '',
				'END:VCARD'
			];
			data = vcardData.filter(Boolean).join('\n');
			break;
		}

		case 'email': {
			data = `mailto:${options.email}`;
			const queryParams = [];
			if (options.subject) queryParams.push(`subject=${encodeURIComponent(options.subject)}`);
			if (options.body) queryParams.push(`body=${encodeURIComponent(options.body)}`);
			if (queryParams.length > 0) data += `?${queryParams.join('&')}`;
			break;
		}

		case 'wifi': {
			data = `WIFI:T:${options.encryption};S:${options.ssid};P:${options.password ?? ''};${options.encryption === 'none' ? '' : ';;'}`;
			break;
		}

		case 'bitcoin': {
			const bitcoinData = [`bitcoin:${options.address}`];
			if (options.amount) bitcoinData.push(`amount=${options.amount}`);
			if (options.label) bitcoinData.push(`label=${encodeURIComponent(options.label)}`);
			data = bitcoinData.join('?');
			break;
		}

		default:
			throw new Error(`Unsupported QR code type: ${(options as any).type}`);
	}

	return await QRCode.toDataURL(data);
}


export const debouncedGenerateQRCode = debounce(generateQRCode, 300);

export type QRCodeType = QRCodeOptions['type'];
