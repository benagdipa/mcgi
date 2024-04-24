export function isUserAllowed(allPermissions, toValidatePermission, role = '') {
    if (role && role?.name === 'super-admin') {
        return true
    }
    return toValidatePermission.some(item => allPermissions.includes(item));
}