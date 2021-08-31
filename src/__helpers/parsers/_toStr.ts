/**
 * Parse anything to a string
 *
 * @param value The value to parse
 * @param defaultVal
 */
export function toStr(value: unknown, defaultVal = ""): string {
	// If not specified
	if (value === undefined || value === null) {
		return defaultVal;
	}

	// Make sure we convert numbers to strings
	if (typeof value === "number") {
		return value.toString();
	}

	// Make sure we convert booleans to strings
	if (typeof value === "boolean") {
		return value ? "true" : "false";
	}

	// Make sure we have a string
	if (typeof value !== "string") {
		return defaultVal;
	}

	return value.trim();
}
