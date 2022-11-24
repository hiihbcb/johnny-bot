import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

export async function getCategories() {
    try {
        let query = 'SELECT * FROM categories'
        let response = await pool.query(query);
        return response.rows.sort((a, b) => {
            return a.sort - b.sort
        })
    } catch ( error ) {
        return error
    }
}

export async function getProducts(type = null) {
    try {
        let fields = [
            "*",
            "co.name as corp_name",
            "p.name as name"
        ]
        let statements = [
            "SELECT " + fields.join(",") + " FROM products AS p",
            "INNER JOIN corps as co on p.productid = co.corpid",
            "INNER JOIN categories as ca on p.productid = ca.categoryid"
        ]
        if (type) {
            statements.push("WHERE ca.name LIKE " + type)
        }
        let query = statements.join(' ');
        let response = await pool.query(query);
        return response.rows
    } catch ( error ) {
        return error
    }
}
