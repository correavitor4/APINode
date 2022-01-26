
const res = require('express/lib/response')
const db = require('./db')


async function returnStatesAndPrices(){
    
    sqlCommand = 'SELECT p.tipo,p.valor_venda,p.data_coleta,pcu.uffk FROM produto as p JOIN contemprod_unid as cpu ON p.id_produto=cpu.id_produtofk JOIN unidade as un ON cpu.id_unidadefk=un.id_unidade JOIN pertencecit_unid as pcu ON pcu.id_unidadefk=un.id_unidade'
    result = await db.query(sqlCommand)
    // console.log(result[0].tipo)
    return result
}



module.exports = {returnStatesAndPrices}
