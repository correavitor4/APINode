
const db = require('./db')



async function returnStatesAndAvgPrices(){
    statesList = await returnlistOfStates()
    return statesList
}

async function returnlistOfStates(){
    statesList = []
    result = await db.query("SELECT * FROM pertencecit_unid")
    
    for(i=0;i<result.length;i++){
        if(statesList.indexOf(result[i]['uffk'])<0)
        {
            statesList.push(result[i]['uffk'])
        }
    }
    return statesList
}





module.exports = {returnStatesAndAvgPrices}
