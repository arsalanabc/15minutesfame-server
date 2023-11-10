import { CronJob } from 'cron';

export const refreshCurrentPost = new CronJob(
	'*/15 * * * *', // cronTime
	function () {
		console.log('You will see this message every 15 mintues');
	}, // onTick
	null, // onComplete
	true, // start
);
