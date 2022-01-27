
const { json } = require('body-parser')
const { response, query } = require('express')
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

routes.get("/",(req,res)=>{
    res.status=200
    res.send("Endpoint raíz")
    res.end()
})

routes.get("/chart1",async (req,res)=>{
    //buscaDadosNoBanco
    result = await querys.returnStatesAndPrices()
    result = returnAgsGasPricesPerState(result)
    result.unshift(['Estado', 'Preço médio da gasolina'])
    res.statusCode =200
    res.send(result)
    res.end()
})

routes.get("/chart2",async(req,res)=>{
    result = await querys.returnStatesAndPrices()
    result = returnAvgsEtanolPricesPerStates(result)
    result.unshift(['Estado', 'Preço médio do etanol'])
    res.statusCode = 200
    res.send(result)
    res.end()
})

routes.get("/chart3",async(req,res)=>{
    result = await querys.returnStatesAndPrices()
    result = returnParticipationPerStates(result)
    result.unshift(['Estado', 'Número de registros'])
    res.status = 200
    res.send(result)
    res.end()
})

routes.get("/chart4",async(req,res)=>{
    result = await querys.returnStatesAndPrices()
    result = returnLessExpensiveRegistry(result)
    result.unshift(['Estado', 'Menor preço registrado da gasolina'])
    res.status =200
    res.send(result)
    res.end()
})

routes.get("/chart5",async(req,res)=>{
    result = await querys.returnStatesAndPrices()
    result = returnMostExpensiveRegistry(result)
    result.unshift(['Estado', 'Maior preço registrado da gasolina'])
    res.status=200
    res.send(result)
    res.end()
})

function returnMostExpensiveRegistry(objetc){
    statesList = []
    arrayMostExpensive=[]
    finalArray=[]
    for(var i=0;i<objetc.length;i++){
        if(statesList.indexOf(objetc[i].uffk)<0){
            statesList.push(objetc[i].uffk)
        }
    }

    for(i=0;i<statesList.length;i++){
        mostExpansivePrice=0.00
        for(j=0;j<objetc.length;j++){
            if(statesList[i]==objetc[j].uffk && objetc[j].tipo=='GASOLINA' && parseFloat(objetc[j].valor_venda)>mostExpansivePrice){
                mostExpansivePrice=parseFloat(objetc[j].valor_venda)
            }
        }
        
        arrayMostExpensive.push(mostExpansivePrice)
    }

    for(i=0;i<statesList.length;i++){
        statesList[i]='BR-'+statesList[i]
        arr=[]
        arr.push(statesList[i])
        arr.push(arrayMostExpensive[i])
        finalArray.push(arr)
    }

    return finalArray

}

function returnLessExpensiveRegistry(objetc){
    statesList = []
    arrayLessExpensive=[]
    finalArray=[]
    for(var i=0;i<objetc.length;i++){
        if(statesList.indexOf(objetc[i].uffk)<0){
            statesList.push(objetc[i].uffk)
        }
    }

    for(i=0;i<statesList.length;i++){
        LessExpansivePrice=parseFloat(objetc[i].valor_venda)
        for(j=0;j<objetc.length;j++){
            if(statesList[i]==objetc[j].uffk && objetc[j].tipo=='GASOLINA' && parseFloat(objetc[j].valor_venda)<LessExpansivePrice){
                LessExpansivePrice=parseFloat(objetc[j].valor_venda)
            }
        }
        
        arrayLessExpensive.push(LessExpansivePrice)
    }

    for(i=0;i<statesList.length;i++){
        statesList[i]='BR-'+statesList[i]
        arr=[]
        arr.push(statesList[i])
        arr.push(arrayLessExpensive[i])
        finalArray.push(arr)
    }

    return finalArray

}



function returnParticipationPerStates(objetc){
    statesList = []
    statesSumTimes= []
    arrayFinal =[]
    for(var i=0;i<objetc.length;i++){
        if(statesList.indexOf(objetc[i].uffk)<0){
            statesList.push(objetc[i].uffk)
        }
    }


    for(i=0;i<statesList.length;i++){
        numeroDeSomas =0
        for(j=0;j<objetc.length;j++){
            if(objetc[j].uffk==statesList[i]){
                
                
                numeroDeSomas+=1
            }
            
        }
        statesSumTimes.push(numeroDeSomas)
        
    }

    for(i =0;i<statesList.length;i++){
        arr = [2]
        arr[0]=statesList[i]
        arr[1]=statesSumTimes[i]
        arrayFinal.push(arr)
    }

    return arrayFinal
    

}



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



function returnAvgsEtanolPricesPerStates(objetc){
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
            if(objetc[j].uffk==statesList[i] && objetc[j].tipo=='ETANOL'){
                
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