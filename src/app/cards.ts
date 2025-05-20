'use server'

import { NextResponse, NextRequest } from 'next/server'
import mysql from 'mysql2/promise';

let DB_HOST = process.env.DB_HOST
let DB_PORT = process.env.DB_PORT
let DB_USER_ID = process.env.DB_USER_ID
let DB_PASSWORD = process.env.DB_PASSWORD
let DATABASE = process.env.DATABASE

interface IDBSettings {
    host: string

    port: number

    user: string

    password: string

    database: string
}

export const GetDBSettings = (): IDBSettings => {
    const env = process.env.NODE_ENV

    if (env == 'development')
        return {
            host: DB_HOST!,

            port: parseInt(DB_PORT!),

            user: DB_USER_ID!,

            password: DB_PASSWORD!,

            database: DATABASE!,
        }

}
let connectionParams = GetDBSettings()
// let connectionParams = {
//     host: DB_HOST,
//     port: DB_PORT,
//     user: DB_USER_ID,
//     password: PASSWORD,
//     database: DATABASE
// }
export async function GET(request: Request) {
    try {
        // 2. connect to database

        const connection = await mysql.createConnection(connectionParams)

        // 3. create a query to fetch data

        let get_exp_query = ''

        get_exp_query = 'SELECT * FROM users'

        // we can use this array to pass parameters to the SQL query

        let values: any[] = []

        // 4. exec the query and retrieve the results

        const [results] = await connection.execute(get_exp_query, values)

        // 5. close the connection when done

        connection.end()

        // return the results as a JSON API response

        return NextResponse.json(results)
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message)

        const response = {
            error: (err as Error).message,

            returnedStatus: 200,
        }

        return NextResponse.json(response, { status: 200 })
    }
}