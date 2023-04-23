export async function getProducts(type = null) {
    let body = JSON.stringify({
        method: "getProduct",
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

export async function setProduct(product) {
    let body = JSON.stringify({
        method: "setProduct",
        product: product
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

export async function getCorps() {
    let response = await fetch(process.env.NEXT_PUBLIC_URL + 'api/corps', { method: 'GET'})
    return await response.json()
}

export async function getCharacter(email) {
    let body = JSON.stringify({
        email: email
    })

    let header = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    let options = {
        method: 'POST',
        body: body,
        header: header
    }

    let response = await fetch(process.env.NEXT_PUBLIC_URL + 'api/characters', options)
    return await response.json()
}

export async function getPlayer(email) {
    let body = JSON.stringify({
        email: email
    })

    let header = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    let options = {
        method: 'POST',
        body: body,
        header: header
    }

    let response = await fetch(process.env.NEXT_PUBLIC_URL + 'api/players', options)
    return await response.json()
}
