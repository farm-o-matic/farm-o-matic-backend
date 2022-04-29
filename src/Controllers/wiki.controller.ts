import { Request, Response } from 'express'
import { prisma } from '../helper/prisma.client'

export const searchWiki = async (req: Request, res: Response) => {
    const { plantname } = req.body
    try{
        const plantdata = await prisma.wikientry.findFirst({
            where: {
                plantname: {
                    contains: plantname,
                }
            }
        })
        res.json(plantdata)
    } catch (error) {
        res.json({ error: `Plant not found`, plantname: plantname })
    }
}

export const listPost = async (req: Request, res: Response) => {
    try{
        const postList = await prisma.wikientry.findMany()
        res.json(postList)
    } catch (error) {
        res.json({ error: 'Something went wrong'})
    }
}