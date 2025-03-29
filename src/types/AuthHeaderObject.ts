import {AuthHeaderError} from '../AuthHeaderError';
import {type AuthHeaderCredentials, isAuthHeaderCredentials} from './AuthHeaderCredentials';
import {type AuthHeaderType, isAuthHeaderType} from './AuthHeaderType';

/**
 * Type for Authorization header object
 * @template HeaderType - Authorization header type
 * @since v0.0.1
 */
export type AuthHeaderObject<HeaderType extends AuthHeaderType = AuthHeaderType> = {
	readonly type: HeaderType;
	readonly credentials: AuthHeaderCredentials;
};

/**
 * Auth header type guard
 * @param {unknown} data - Authorization header object
 * @returns {boolean} - true if data is AuthHeaderObject
 * @since v0.0.1
 */
export function isAuthHeaderObject(data: unknown): data is AuthHeaderObject {
	return (
		typeof data === 'object' &&
		data !== null &&
		'type' in data &&
		isAuthHeaderType(data.type) &&
		'credentials' in data &&
		isAuthHeaderCredentials(data.credentials)
	);
}

/**
 * Auth header type assert
 * @param {unknown} value - Authorization header object
 * @throws {AuthHeaderError} - if value is not AuthHeaderObject
 * @since v0.0.1
 */
export function assertAuthHeaderObject(value: unknown): asserts value is AuthHeaderObject {
	if (!isAuthHeaderObject(value)) {
		throw new AuthHeaderError(`${JSON.stringify(value)} is invalid auth header object`);
	}
}
