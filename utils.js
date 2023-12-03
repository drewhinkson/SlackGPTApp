const axios = require('axios');

async function sendReplyToSlack(channel, message, threadTs) {
    try {
        await axios.post('https://slack.com/api/chat.postMessage', {
            channel: channel,
            text: message,
            thread_ts: threadTs  
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`,
                'Content-Type': 'application/json'
            }
            
        });
        
    } catch (error) {
        console.error("Error sending message to Slack:", error);
    }
}

module.exports = { sendReplyToSlack };
