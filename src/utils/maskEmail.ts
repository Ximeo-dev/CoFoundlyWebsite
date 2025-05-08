export default function maskEmail(email: string) {
	if (!email || typeof email !== 'string' || !email.includes('@')) {
		return ''
	}

	try {
		const [localPart, domain] = email.split('@')

		if (localPart.length <= 2) {
			return `${localPart}@${domain}`
		}
		const visibleChars = localPart.slice(0, 2)
		const maskedChars = '*'.repeat(localPart.length - 2)

		return `${visibleChars}${maskedChars}@${domain}`
	} catch {
		return email
	}
}
