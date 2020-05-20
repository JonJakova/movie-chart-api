const schedule = require('node-schedule');
const tagUpdater = require('./tag_updater')
const dbUpdater = require('./db_updater');

const scheduleUpdate = (db) => {
    let rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, 1, 3, 5];
    rule.hour = 10;
    rule.minute = 0;

    schedule.scheduleJob(rule, function() {
        callUpdaters(db);
    });
}

function callUpdaters(db) {
    tagUpdater.tag_updater(db);
    dbUpdater.db_updater(db);
}

module.exports = {
    scheduleUpdate
}