const request= require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2Frc2hhbTk5OSIsImEiOiJja3lnMm9xZnQwaWhsMndsZ2xhY3hrZXM5In0.fDu63C12IXZs8JkCe4b1wg&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location.',undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode