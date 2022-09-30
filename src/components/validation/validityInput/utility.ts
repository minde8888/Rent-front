export const isValid = (text: string, pattern: string): boolean => {
    const regex = new RegExp(pattern);
    return regex.test(text);
};
