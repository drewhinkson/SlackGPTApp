const { MongoClient } = require('mongodb');

let db;
const dbName = 'SlackDB'; 


async function connectToDb(uri) {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

async function saveMessage(threadTs, messageData) {
    try {
        const response = await db.collection('messages').insertOne({
            threadTs: threadTs,
            text: messageData.text,
            timestamp: messageData.timestamp
        });
        console.log(" message saved", response);
    } catch (error) {
        console.error('Error saving bot message to MongoDB', error);
    }
}

async function saveBotMessage(threadTs, messageData) {
    try {
        const response = await db.collection('botMessages').insertOne({
            threadTs: threadTs,
            botText: messageData.text,
            timestamp: messageData.timestamp
        });
        console.log("Bot message saved", response);
    } catch (error) {
        console.error('Error saving bot message to MongoDB', error);
    }
}



async function getThreadHistory(threadTs) {
    try {
        const userMessages = await db.collection('messages').find({ threadTs: threadTs }).toArray();
        const botMessages = await db.collection('botMessages').find({ threadTs: threadTs }).toArray();

        // Map botMessages to align with userMessages structure
        const mappedBotMessages = botMessages.map(msg => ({
            ...msg,
            text: msg.botText, // Use the new field name
            source: 'bot' // Add a source field for easy identification
        }));

        // Combine and sort messages based on timestamp
        const combinedHistory = [...userMessages, ...mappedBotMessages];
        combinedHistory.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        return combinedHistory;
    } catch (error) {
        console.error('Error retrieving thread history from MongoDB', error);
        return [];
    }
}



module.exports = {
    connectToDb,
    saveMessage,
    getThreadHistory,
    saveBotMessage
};
