export async function getProducts(type = null) {
    let body = JSON.stringify({
        type: type
    })

    let header = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    let options = {
        method: 'POST',
        body: body,
        header: header
    }

    let response = await fetch(process.env.NEXT_PUBLIC_URL + 'api/products', options)
    return await response.json()
}

export async function getCategories() {
    let response = await fetch(process.env.NEXT_PUBLIC_URL + 'api/categories', { method: 'GET'})
    return await response.json()
}
