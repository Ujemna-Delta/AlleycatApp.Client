export function mergeDate(time: Date, date: Date) {
    const result = new Date(date);

    result.setHours(time.getHours());
    result.setMinutes(time.getMinutes());
    result.setSeconds(time.getSeconds());
    result.setMilliseconds(time.getMilliseconds());

    return result;
}