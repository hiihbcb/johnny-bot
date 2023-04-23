import { Pool } from "pg";

if (process.env.NODE_ENV == 'production') {
    var sslConfig = { rejectUnauthorized: false };
} else if (process.env.NODE_ENV == 'staging') {
    var sslConfig = false;
}
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: sslConfig
})

export async function getCategories() {
    try {
        let query = 'SELECT * FROM categories'
        let response = await pool.query(query);
        return response.rows.sort((a, b) => {
            return a.sort - b.sort
        })
    } catch ( error ) {
        console.log(error)
        return error
    }
}

export async function getCorps() {
    try {
        let query = 'SELECT * FROM corps'
        let response = await pool.query(query);
        return response.rows.sort((a, b) => {
            return a.sort - b.sort
        })
    } catch ( error ) {
        console.log(error)
        return error
    }
}

export async function getProducts(type = null) {
    try {
        let fields = [
            "*",
            "co.name as corp_name",
            "ca.name as category_name",
            "p.name as name"
        ]
        let statements = [
            "SELECT " + fields.join(",") + " FROM products AS p",
            "LEFT JOIN corps as co on p.corp = co.corpid",
            "LEFT JOIN categories as ca on p.category = ca.categoryid"
        ]
        if (type) {
            statements.push("WHERE ca.name LIKE '" + type + "'")
        }
        let query = statements.join(' ');
        let response = await pool.query(query);
        return response.rows.sort((a, b) => {
            return b.productid - a.productid
        })
    } catch ( error ) {
        console.log(error)
        return error
    }
}

export async function setProduct(product) {
    try {
        let columns = [
            "name",
            "category",
            "corp",
            "type",
            "requirements",
            "short_desc",
            "description",
            "cost",
            "subscription_cost",
            "w_skill",
            "w_damage",
            "w_magazine",
            "w_rof",
            "w_hands",
            "w_concealed",
            "a_sp",
            "a_ceal",
            "c_install",
            "c_humanity",
            "n_per",
            "n_spd",
            "n_atk",
            "n_def",
            "n_rez",
            "v_sdp",
            "v_sp",
            "v_move",
            "v_stats"
        ]

        let entry = [
            formatString(product.name),
            product.category ?? 1,
            product.corp ?? 1,
            formatString(product.type),
            formatString(product.requirements),
            formatString(product.short_desc),
            formatString(product.description),
            formatInt(product.cost),
            formatInt(product.subscription_cost),
            formatString(product.w_skill),
            formatString(product.w_damage),
            formatString(product.w_magazine),
            formatString(product.w_rof),
            formatString(product.w_hands),
            formatString(product.w_concealed),
            formatString(product.a_sp),
            formatString(product.a_ceal),
            formatString(product.c_install),
            formatString(product.c_humanity),
            formatString(product.n_per),
            formatString(product.n_spd),
            formatString(product.n_atk),
            formatString(product.n_def),
            formatString(product.n_rez),
            formatString(product.v_sdp),
            formatString(product.v_sp),
            formatString(product.v_move),
            formatString(product.v_stats)
        ]

        let sql

        if (product.id) {
            let rows = []

            sql = [
                "UPDATE products SET"
            ]

            for (let i = 0; i < columns.length; i++) {
                rows.push(columns[i]+" = "+entry[i])
            }
            sql.push(rows.join(", "))
            sql.push("WHERE productid = "+product.id)

        } else {
            sql = [
                "INSERT INTO products ("+columns.join(", ")+")",
                "VALUES ("+entry.join(", ")+")"
            ]
        }

        let response = await pool.query(sql.join(" "));
        return response
    } catch ( error ) {
        console.log(error)
        return error
    }
}

export async function getCharacter(email) {
    try {
        let query = "SELECT * FROM characters INNER JOIN players ON characters.playerid = players.playerid WHERE players.email = '" + email + "'"
        let response = await pool.query(query);
        return response.rows.sort((a, b) => {
            return a.sort - b.sort
        })
    } catch ( error ) {
        console.log(error)
        return error
    }
}

export async function getPlayer(email) {
    try {
        let query = "SELECT * FROM players WHERE email = '" + email + "'"
        let response = await pool.query(query);
        return response.rows.sort((a, b) => {
            return a.sort - b.sort
        })
    } catch ( error ) {
        console.log(error)
        return error
    }
}

function formatString(value) {
    return value ? "'"+value+"'" : "null"
}

function formatInt(value) {
    if (value == null || value == '') {
        return 'null'
    }
    return value
}
