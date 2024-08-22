/**
 * an array of routes those are accessable to all 
 * no authenticaion needed
 * @type {string[]}
 */
export const publicRoutes = [
    ''
]

/**
 * an array of routes those are use for
 * authenticaion purpose
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/register',
    '/auth/signin'
]
/**
 * for api authentication purpose
 * @type {string}
 */

export const apiAuthPrefix = '/api/auth'

/**
 * for redirect url
 * @type {string}
*/

export const DEFAULT_LOGIN_REDIRECT = '/dashboard'