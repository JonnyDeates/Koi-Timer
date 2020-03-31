export function getStorage(storage, defaults) {
    if(localStorage.getItem(storage) !== null){
        return JSON.parse(localStorage.getItem(storage));
    } else {
       return defaults;
    }

}

export function setStorage(obj, storage, callback = () => {
}) {
    localStorage.setItem(storage, JSON.stringify(obj));
    callback();
}
