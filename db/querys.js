
const res = require('express/lib/response')
const db = require('./db')


async function returnStatesAndPrices(){
    
    sqlCommand = 'SELECT p.tipo,p.valor_venda,p.data_coleta,pcu.uffk,cid.regiao FROM produto as p JOIN contemprod_unid as cpu ON p.id_produto=cpu.id_produtofk JOIN unidade as un ON cpu.id_unidadefk=un.id_unidade JOIN pertencecit_unid as pcu ON pcu.id_unidadefk=un.id_unidade JOIN cidade as cid ON pcu.nomefk=cid.nome'
    result = await db.query(sqlCommand)
    // console.log(result[0].tipo)
    return result
}


async function returnMaxDate(){
    sqlCommand = 'SELECT Max(p.data_coleta) FROM produto as p JOIN contemprod_unid as cpu ON p.id_produto=cpu.id_produtofk JOIN unidade as un ON cpu.id_unidadefk=un.id_unidade JOIN pertencecit_unid as pcu ON pcu.id_unidadefk=un.id_unidade JOIN cidade as cid ON pcu.nomefk=cid.nome'
    result = await db.query(sqlCommand)
    return result[0].max
}


module.exports = {returnStatesAndPrices,returnMaxDate}
