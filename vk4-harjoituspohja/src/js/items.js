const getItems = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/items');
        const items = await response.json();
        console.log(items);
    }
    catch (error){
        console.log('Error', error);
    }    
};
export {getItems};