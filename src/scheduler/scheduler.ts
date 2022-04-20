var cron = require('node-cron')

export const schedule = cron.schedule('* * * * * *', () => {
    console.log('running every 1 sec')
    timezone:"Asia/Bangkok"
})