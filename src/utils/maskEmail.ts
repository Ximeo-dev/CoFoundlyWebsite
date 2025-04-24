export default function maskEmail(email: string) {
	const [localPart, domain] = email.split('@')
	const maskedLocalPart =
		localPart.length > 2
			? `${localPart[0]}${'*'.repeat(localPart.length - 2)}${localPart.slice(
					-1
			  )}`
			: localPart
	return `${maskedLocalPart}@${domain}`
}
