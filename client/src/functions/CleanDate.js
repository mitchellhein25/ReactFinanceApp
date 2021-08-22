export function cleanDate(date) {
    if (date) {
        return date.substring(0, 10);
    } else {
        return "";
    }
}