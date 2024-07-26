export const getStorage = <T>(storage: string, defaults:T) => {
    const locallyStored = localStorage.getItem(storage)
    if(locallyStored !== null){
        return JSON.parse(locallyStored);
    } else {
       return defaults;
    }

};

export const setStorage = (obj: Object, storage: string, callback = () => {
}) => {
    localStorage.setItem(storage, JSON.stringify(obj));
    callback();
};
