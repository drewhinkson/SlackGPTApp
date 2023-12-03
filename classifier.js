const natural = require('natural');
const classifier = new natural.BayesClassifier();

// Train the classifier with some basic Slack-related examples
classifier.addDocument('How do I create a channel?', 'slack-related');
classifier.addDocument('Ways to send direct messages in Slack', 'slack-related');
classifier.addDocument('Change notification settings', 'slack-related');
classifier.addDocument('Configure Slack integrations', 'slack-related');

// Train with some non-Slack related examples
classifier.addDocument('Weather today', 'not-slack-related');
classifier.addDocument('News updates', 'not-slack-related');
classifier.addDocument('Good restaurants near me', 'not-slack-related');

// Train the classifier
classifier.train();

module.exports = classifier;
