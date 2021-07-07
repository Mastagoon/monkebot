const { Telegraf } = require('telegraf')
const axios = require("axios")
require("dotenv").config()

const commandList = ["monkey", "monke", "monkes", "monkeys"]

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.launch()

//we're gonna use the text event instead of bot.command. to support arabic commands.
bot.on(`text`, async ctx => {
    const text = ctx.message.text
    if(commandList.includes(text)) {
        try {
            do {
                const gif = await axios.get(`https://g.tenor.com/v1/search?q=monkey&key=${process.env.API_KEY}&limit=1&pos=${Math.floor(Math.random()*500)}`)
                if(gif?.data?.results?.length)
                ctx.telegram.sendAnimation(ctx.chat.id, gif.data.results[0].url)
            } while(!gif?.data?.results?.length)
        } catch(err) {
            console.log(err)
        }
    }
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))