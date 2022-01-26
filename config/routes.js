
const { json } = require('body-parser')
const { response } = require('express')
const express = require('express')
const parse = require('nodemon/lib/cli/parse')
const routes = express.Router()
const querys = require('../db/querys')

module.exports = routes

let db = [
    {'1':{Nome: 'Cliente1',Idade:'20'}},
    {'2':{Nome: 'Cliente2',Idade:'20'}},
    {'3':{Nome: 'Cliente3',Idade:'20'}},
    {'4':{Nome: 'Cliente4',Idade:'20'}},
    {'5':{Nome: 'Cliente5',Idade:'20'}}
]

routes.get("/chart1",async (req,res)=>{
    //buscaDadosNoBanco
    result = await querys.returnStatesAndPrices()
    result = returnAgsGasPricesPerState(result)
    res.statusCode =200
    res.send(JSON.stringify(result))
    res.end()
})

function returnAgsGasPricesPerState(objetc){
    statesList = []
    avgList=[]
    arrayFinal =[]
    for(var i=0;i<objetc.length;i++){
        if(statesList.indexOf(objetc[i].uffk)<0){
            statesList.push(objetc[i].uffk)
        }
    }
    
    for(i=0;i<statesList.length;i++){
        valorTotalSomado = 0
        numeroDeSomas =0
        for(j=0;j<objetc.length;j++){
            if(objetc[j].uffk==statesList[i] && objetc[j].tipo=='GASOLINA'){
                
                valorTotalSomado+=parseInt(objetc[j].valor_venda,10) 
                numeroDeSomas+=1
            }
            
        }
        avg=valorTotalSomado/numeroDeSomas
        avgList.push(avg)
        
    }

    for(i =0;i<statesList.length;i++){
        statesList[i]='BR-'+statesList[i]
        arr = [2]
        arr[0]=statesList[i]
        arr[1]=avgList[i]
        arrayFinal.push(arr)
    }
    
    
    return arrayFinal
}

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[i] = arr[i];
    return rv;
  }