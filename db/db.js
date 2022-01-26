const cli = require('nodemon/lib/cli')


async function connect(){
    if(global.connection){
        return global.connection.connect()
    }
    

    const {Pool} = require('pg')
    const pool = new Pool({
        connectionString: 'postgres://adminbigdata:projetobigdata1@db-bigdata.postgres.uhserver.com:5432/db_bigdata'
    })

    //apenas testando a conexão
    const client = await pool.connect()
    console.log("Criou pool de conexãos no PostgreSQL")

    // const res = await client.query('SELECT NOW ()')
    // console.log(res)
    // client.release()

    global.connection = pool
    return pool.connect()
}

async function query(sql){
    const conn =await connect()
    result= await conn.query(sql)
    return result.rows
}



module.exports = {query}