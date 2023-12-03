const axios = require('axios');
const classifier = require('./classifier');
const { sendReplyToSlack } = require('./utils');
const { saveMessage, getThreadHistory, saveBotMessage } = require('./database');

const botUserId = process.env.BOT_USER_ID; 

module.exports = async (req, res) => {
    if (req.body.type === 'url_verification') {
        console.log("URL Verification Challenge Received");
        return res.status(200).json({ challenge: req.body.challenge });
    }

    const slackEvent = req.body.event;
    const threadTs = req.body.event.thread_ts || req.body.event.ts;
    
  

   



    if (slackEvent && slackEvent.type === 'message' && slackEvent.text.includes(`<@${botUserId}>`)) {
        const messageWithoutMention = slackEvent.text.replace(`<@${botUserId}>`, '').trim();
        const history = await getThreadHistory(threadTs);
        const historyText = history.map(interaction => 
            `${interaction.userText} ${interaction.botText}`
        ).join('\n');
        
        
        
        const currentMessage = `${messageWithoutMention}`;
        const prompt = historyText + "\n" + currentMessage;
        
      
        console.log(prompt)
        
            try {
                const openAIResponse = await axios.post('https://api.openai.com/v1/completions', {
                    model: "text-davinci-003",
                    prompt: prompt,
                    max_tokens: 150,
                }, {
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });

                const reply = openAIResponse.data.choices[0].text.trim();
                await sendReplyToSlack(slackEvent.channel, reply, slackEvent.ts);
                await saveBotMessage(threadTs, { text: reply, timestamp: new Date().toISOString() });
                await saveMessage(threadTs, {
                    user: slackEvent.user,
                    text: slackEvent.text,
                    timestamp: slackEvent.ts
                });
            } catch (error) {
                console.error("Error calling OpenAI API:", error);
            }
          
         
        
    } else {
        console.log("Bot not mentioned") 
    }

    res.status(200).end();
};
