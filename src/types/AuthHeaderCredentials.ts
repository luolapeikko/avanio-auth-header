import {AuthHeaderError} from '../AuthHeaderError';

/**
 * Type for Authorization header credentials
 * @since v0.0.1
 */
export type AuthHeaderCredentials = string & {__authHeaderCredentials: true};

/**
 * Check if data is valid AuthHeaderCredentials
 * @param {unknown} data - Authorization header
 * @returns {boolean} - true if data is AuthHeaderCredentials
 * @since v0.0.1
 */
export function isAuthHeaderCredentials(data: unknown): data is AuthHeaderCredentials {
	return typeof data === 'string' && data.length > 0;
}

/**
 * Assert value is valid AuthHeaderCredentials
 * @param {unknown} value The value to be asserted as a valid AuthHeaderCredentials
 * @throws {AuthHeaderError} If the value is not a valid AuthHeaderCredentials
 * @since v0.0.1
 */
export function assertAuthHeaderCredentials(value: unknown): asserts value is AuthHeaderCredentials {
	if (!isAuthHeaderCredentials(value)) {
		throw new AuthHeaderError(`${JSON.stringify(value)} not include valid credentials`);
	}
}
