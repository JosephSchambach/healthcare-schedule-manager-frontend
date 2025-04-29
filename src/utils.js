export async function getContext(param) {
    const response = await fetch('/context.json');
    const context = await response.text(); 
    const data = JSON.parse(context);
    return data[param];
}