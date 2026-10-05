/**
 * Giftly — Notification Scheduler
 * Runs every day at 8am, checks rappels and creates notifications
 * Add to server.js: require('./jobs/notifScheduler');
 */

const cron = require('node-cron');
const Rappel = require('../models/Rappel');
const Notification = require('../models/Notification');

const TRIGGER_DAYS = [7, 3, 1]; // notify at J-7, J-3, J-1

async function generateRappelNotifications() {
  try {
    const now = new Date();
    const in8Days = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);

    // Fetch all rappels happening within the next 8 days
    const upcoming = await Rappel.find({
      date: { $gte: now, $lte: in8Days }
    });

    for (const rappel of upcoming) {
      const daysLeft = Math.ceil((new Date(rappel.date) - now) / (1000 * 60 * 60 * 24));

      if (!TRIGGER_DAYS.includes(daysLeft)) continue;

      // Avoid duplicate notifications for same rappel + same daysLeft
      const existing = await Notification.findOne({
        user: rappel.user,
        rappelId: rappel._id,
        message: { $regex: `J-${daysLeft}` },
      });
      if (existing) continue;

      let message = '';
      if (daysLeft === 1) {
        message = `⚠️ Demain : "${rappel.label}" — pensez à trouver un cadeau !`;
      } else {
        message = `🔔 J-${daysLeft} : "${rappel.label}" approche — avez-vous trouvé un cadeau ?`;
      }

      await Notification.create({
        user:     rappel.user,
        type:     'RAPPEL',
        message,
        rappelId: rappel._id,
      });

      console.log(`✅ Notification créée pour user ${rappel.user} — ${message}`);
    }
  } catch (err) {
    console.error('🔴 notifScheduler error:', err.message);
  }
}

// Run every day at 8:00 AM
cron.schedule('0 8 * * *', () => {
  console.log('⏰ Running notification scheduler...');
  generateRappelNotifications();
});

// Also run once at startup (for dev/testing)
generateRappelNotifications();

console.log('📅 Notification scheduler initialized');