import { prisma } from "./prisma.client";
export const db_opt = async () => {
    const avgMoist = await prisma.moisture.groupBy({
        by: ['BoxID'],
        _avg: {
            Moisture: true,
        },
    })

    const avgTemp = await prisma.temperature.groupBy({
        by: ['BoxID'],
        _avg: {
            Temperature: true,
        },
    })
    const avgLight = await prisma.lightintensity.groupBy({
        by: ['BoxID'],
        _avg: {
            lightIntensity: true
        },
    })
    // const output = {
    //     moist: avgMoist,
    //     temp: avgTemp,
    //     light: avgLight
    // }
    for (var i in avgMoist) {
        console.log(avgMoist[i].BoxID)
        await prisma.sensordata.create({
            data: {
                BoxID: avgMoist[i].BoxID!,
                Moisture: avgMoist[i]._avg.Moisture!,
                Temperature: avgTemp[i]._avg.Temperature!,
                LightIntensity: avgLight[i]._avg.lightIntensity!
            }
            
        })
        await prisma.moisture.deleteMany({
            where:{
                BoxID: avgMoist[i].BoxID
            }
        })
        await prisma.temperature.deleteMany({
            where:{
                BoxID: avgTemp[i].BoxID
            }
        })
        await prisma.lightintensity.deleteMany({
            where:{
                BoxID: avgLight[i].BoxID
            }
        })
    }
    // res.json(output)

}