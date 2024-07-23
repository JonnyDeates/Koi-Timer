export function getStorage(storage, defaults) {
    const locallyStored = localStorage.getItem(storage)
    if(locallyStored !== null){
        return JSON.parse(locallyStored);
    } else {
       return defaults;
    }

}

export function setStorage(obj, storage, callback = () => {
}) {
    localStorage.setItem(storage, JSON.stringify(obj));
    callback();
}
