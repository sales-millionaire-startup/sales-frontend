
export const logOut = () => {
    // Get all cookies as a string
    const cookies = document.cookie.split(';');

    // Iterate over each cookie
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const cookieName = cookie.split('=')[0].trim();
        // Set the cookie's expiration date to the past
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
}