const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')

dotenv.config()
const router = express.Router()

const api = axios.create({
    baseURL: `${process.env.API_URL}`
})

router.get("/popular", async (req, res) => {
    const result = await api.get('/popular.php')
    const data = result.data

    res.send(data)
})

router.get("/new", async (req, res) => {
    const result = await api.get('/latest.php')
    const data = result.data

    res.send(data)
})
router.get("/cocktails", async (req, res) => {
    const result = await api.get('/filter.php?c=Cocktail')
    const data = result.data

    res.send(data)
})
router.get("/shots", async (req, res) => {
    const result = await api.get('/filter.php?c=Shot')
    const data = result.data

    res.send(data)
})

router.get("/punches", async (req, res) => {
    const result = await api.get('/filter.php?c=Punch / Party Drink')
    const data = result.data

    res.send(data)
})

router.get('/lookup-from-id', async (req, res) => {
    const {drinkID} = req.query

    const result = await api.get(`/lookup.php?i=${drinkID}`)
    const data = result.data

    res.send(data)
})


module.exports = router
