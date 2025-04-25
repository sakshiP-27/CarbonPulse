export function checkPassword(password: string, confirmPassword: string): boolean {
    if(password !== confirmPassword) {
        return false;
    } else {
        return true;
    }
}