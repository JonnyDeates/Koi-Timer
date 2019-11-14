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
