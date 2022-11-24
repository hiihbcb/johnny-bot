export async function getCategories() {
    let response = await fetch(process.env.NEXT_PUBLIC_URL + 'api/categories', { method: 'GET'})
    return await response.json()
}
