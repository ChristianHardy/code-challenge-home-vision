/**
 * Parse anything to a number
 *
 * @param value The value to parse
 * @param defaultVal
 */
export function toNumber(value: unknown, defaultVal = 0): number {
	// If not specified
	if (value === undefined || value === null) {
		return defaultVal;
	}

	// Make sure we convert numbers to strings
	if (typeof value === "number") {
		return value;
	}

	// Make sure we have a string
	if (typeof value === "string") {
		const val = parseFloat(value);
		return isNaN(val) ? defaultVal : val;
	}

	return defaultVal;
}
