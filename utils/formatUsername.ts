export function formatUsername(email: string, options: {
    removeNumbers?: boolean;
    capitalizeWord?: boolean;
    maxLength?: number;
} = {}) {
    const {
        removeNumbers = false,
        capitalizeWord = false,
        maxLength = 20
    } = options;

    let name = email.split('@')[0];
    name = name.replace(/[._-]/g, ' ')

    if (removeNumbers) {
        name = name.replace(/\d/g, '');
    }

    // Capitalize the first letter of each word
    if (capitalizeWord) {
        name = name.replace(/\w\S*/g, (txt) =>
            txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase())
    }

    // Trim spaces and limit the length
    name = name.trim()
    if (maxLength && name.length > maxLength) {
        name = name.slice(0, maxLength)
    }

    return name;
}


