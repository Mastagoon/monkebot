const { Telegraf } = require('telegraf')
const axios = require("axios")
require("dotenv").config()

const commandList = ["monkey", "monke", "monkes", "monkeys","قرد"]

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.launch()

// we're gonna use the text event instead of bot.command. to support arabic commands.
bot.on(`text`, async ctx => {
    const text = ctx.message.text.toLowerCase()
    if(commandList.includes(text)) {
        getGif(ctx)
    }
})

const getGif = async(ctx) => {
    const gif = await axios.get(`https://g.tenor.com/v1/search?q=monkey&key=${process.env.API_KEY}&limit=1&pos=${Math.floor(Math.random()*500)}`)
    if(gif?.data?.results?.length) return ctx.telegram.sendAnimation(ctx.chat.id, gif.data.results[0].url)
    return getGif(ctx)
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))