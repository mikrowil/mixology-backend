const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')

dotenv.config()
const router = express.Router()

/**
 *  axios object to make web requests
 */
const api = axios.create({
    baseURL: `${process.env.API_URL}`
})

/**
 * Get request for popular drinks
 */
router.get("/popular", async (req, res) => {
    const result = await api.get('/popular.php')
    const data = result.data

    res.send(data)
})

/**
 * Get request for newer drinks
 */
router.get("/new", async (req, res) => {
    const result = await api.get('/latest.php')
    const data = result.data

    res.send(data)
})

/**
 * Get request for cocktails
 */
router.get("/cocktails", async (req, res) => {
    const result = await api.get('/filter.php?c=Cocktail')
    const data = result.data

    res.send(data)
})

/**
 * Get requests for shots
 */
router.get("/shots", async (req, res) => {
    const result = await api.get('/filter.php?c=Shot')
    const data = result.data

    res.send(data)
})

/**
 *  Get request for punches and party drinks
 */
router.get("/punches", async (req, res) => {
    const result = await api.get('/filter.php?c=Punch / Party Drink')
    const data = result.data

    res.send(data)
})

/**
 * Searches for a cocktail by id
 */
router.get('/lookup-from-id', async (req, res) => {
    const {drinkID} = req.query

    const result = await api.get(`/lookup.php?i=${drinkID}`)
    const data = result.data

    res.send(data)
})

/**
 * Get request that returns a random cocktail
 */
router.get('/random', async (req, res) => {
    const result = await api.get('/random.php')

    const data = result.data

    res.send(data)
})

router.get('/search', async (req, res) => {
    const {term} = req.query

    const result = await api.get(`/search.php?s=${term}`)

    const data = result.data
    res.send(data)
})


module.exports = router
