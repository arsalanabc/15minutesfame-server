import { CronJob } from 'cron';

// this should update the queue with the new post
export const refreshCurrentPost = new CronJob(
	'*/15 * * * *', // cronTime
	function () {
		console.log('You will see this message every 15 mintues');
	}, // onTick
	null, // onComplete
	true, // start
);
