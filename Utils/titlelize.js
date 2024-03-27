export const titleize = (str) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, function(firstLetter) {
        return firstLetter.toUpperCase();
    });
}