export function zeroPadding(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

export function getMinutes(count) {
    if (count >= 60) {
        return zeroPadding(Math.floor((count%3600/60))) + ':'
    } else {
        return ''
    }
}

export function getHours(count) {
    if (count >= 3600) {
        return zeroPadding(Math.floor((count / 3600))) + ':'
    } else {
        return ''
    }
}

export function getTime(count) {
    return getHours(count) + getMinutes(count) + zeroPadding(count % 60)

}
//to round to n decimal places received from https://stackoverflow.com/questions/14968615/rounding-to-the-nearest-hundredth-of-a-decimal-in-javascript
export function round(num, places) {
    let multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}
