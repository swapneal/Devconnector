const isEmpty = value => 
    value === undefined || 
    value === null || 
    (typeof value === 'object' && Object.keys(value).length === 0) || //checks keys in object is empty or not
    (typeof value === 'string' && value.trim().length === 0);  //checks whether the only whitespaces are being passed on or not

export default isEmpty;