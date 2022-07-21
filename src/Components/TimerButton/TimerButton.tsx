import { useState, useEffect } from "react";
import { setTimeout } from "timers";

export default function TimerButton() {
	const calculateTimeLeft = () => {
		const difference = +new Date("2022-07-20T12:14:00+12:00") - +new Date();
		let timeLeft: any = {};

		if (difference > 0) {
			timeLeft = {
				hours: Math.floor(difference / (1000 * 60 * 60)),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const startTimer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
		return () => clearTimeout(startTimer);
	});

	// const startTimer = async () => {
	// 	try {
	// 		const starttime = await contract.startTime(5);
	// 		await starttime.wait();
	// 		console.log(starttime);

	// 		contract.on("StartTimer", (timer, event) => {
	// 			console.log("timer has started");
	// 			setOn(true);
	// 		});
	// 	} catch (error) {
	// 		setShowError(true);
	// 		setText("Only owner can start the timer");
	// 		console.log(error);

	// 		const err1 = setTimeout(() => {
	// 			setShowError(false);
	// 		}, 2000);

	// 		return () => clearTimeout(err1);
	// 	}
	// };

	return (
		<div>
			{/* <button className="timeButton">Start Time</button> */}
			<div className="timer">
				{timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? (
					<p>
						<span>{timeLeft.hours}</span>
						<span>:</span>
						<span>{timeLeft.minutes}</span>
						<span>:</span>
						<span>{timeLeft.seconds}</span>
					</p>
				) : (
					<p>Voting ended!</p>
				)}
			</div>
		</div>
	);
}
