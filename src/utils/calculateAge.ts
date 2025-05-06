export const calculateAge = (birthDate: string): number => {
	const today = new Date()
	const birth = new Date(birthDate)
	const age = today.getFullYear() - birth.getFullYear()
	const month = today.getMonth() - birth.getMonth()
	if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
		return age - 1
	}
	return age
}
