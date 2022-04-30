export const isEmpty = (data: any) => {
    switch (typeof data) {
        case 'object':
            return data ? (Object.keys(data).length === 0 && Object.getPrototypeOf(data) === Object.prototype) || data.length === 0 : true;
        case 'undefined':
                return true;
        case null:
                return true;
        case 'string':
                return data === '' || !data;
        default: 
                return false;


    }
};