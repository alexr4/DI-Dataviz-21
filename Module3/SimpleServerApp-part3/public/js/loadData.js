async function loadData(request){
    const response  = await fetch(request);
    const rawData   = await response.json();
    return rawData;
}