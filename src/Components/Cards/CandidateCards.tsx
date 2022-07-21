import { useState, useEffect, useContext } from "react";
import img1 from "../../Images/profile.png";
import { contract } from "../../ABI";
import { ErrorContext, LoaderContext, TextContext } from "../../App";
/*eslint-disable*/
export default function Cards({
	loggedIn,
	pick,
	setPick,
}: {
	loggedIn: boolean;
	pick: boolean;
	setPick: (setPick: boolean) => void;
}) {
	const { setShowError } = useContext(ErrorContext);
	const { setText } = useContext(TextContext);
	const { setShowLoader } = useContext(LoaderContext);

	const [cVote1, cSetVote1] = useState<number>(0);
	const [cVote2, cSetVote2] = useState<number>(0);
	const [cVote3, cSetVote3] = useState<number>(0);
	const [cVote4, cSetVote4] = useState<number>(0);

	const personCount = async () => {
		const candidatescount1 = await contract.candidatesCount1();
		cSetVote1(candidatescount1.toString());
		setPick(true);

		const candidatescount2 = await contract.candidatesCount2();
		cSetVote2(candidatescount2.toString());
		setPick(true);

		const candidatescount3 = await contract.candidatesCount3();
		cSetVote3(candidatescount3.toString());
		setPick(true);

		const candidatescount4 = await contract.candidatesCount4();
		cSetVote4(candidatescount4.toString());
		setPick(true);
	};

	useEffect(() => {
		personCount();
	}, [loggedIn]);

	const voteOne = 1;
	const voteTwo = 2;
	const voteThree = 3;
	const voteFour = 4;

	const setVoteCall = async (name: number) => {
		try {
			const pickperson = await contract.pickPerson(name);

			setShowLoader(true);
			await pickperson.wait(1);
			setShowLoader(false);

			window.location.reload();
			alert(`You chose candidate #${name}`);
		} catch (error) {
			setShowError(true);
			setText("User has already voted");

			const err2 = setTimeout(() => {
				setShowError(false);
			}, 2000);

			return () => clearTimeout(err2);
		}
	};
	const button1 = () => {
		setVoteCall(voteOne);
	};

	const button2 = () => {
		setVoteCall(voteTwo);
	};

	const button3 = () => {
		setVoteCall(voteThree);
	};
	const button4 = () => {
		setVoteCall(voteFour);
	};

	return (
		<div>
			<div className="candidateCards1">
				<div className="card1">
					<img src={img1} alt="Profile" height={100} width={100} />
					<div className="c1">
						<h1>
							<b>John Doe</b>
						</h1>
						<p>Candidate #1</p>
						<button className="buttonC1" onClick={button1}>
							Vote
						</button>
						<div className="soloCount1">Votes: {cVote1}</div>
					</div>
				</div>

				<div className="card2">
					<img src={img1} alt="Profile" height={100} width={100} />
					<div className="c2">
						<h1>
							<b>John Doe</b>
						</h1>
						<p>Candidate #2</p>
						<button className="buttonC2" onClick={button2}>
							Vote
						</button>
						<div className="soloCount2">Votes: {cVote2}</div>
					</div>
				</div>
			</div>

			<div className="candidateCards2">
				<div className="card3">
					<img src={img1} alt="Profile" height={100} width={100} />
					<div className="c3">
						<h1>
							<b>John Doe</b>
						</h1>
						<p>Candidate #3</p>
						<button className="buttonC3" onClick={button3}>
							Vote
						</button>
						<div className="soloCount2">Votes: {cVote3}</div>
					</div>
				</div>

				<div className="card4">
					<img src={img1} alt="Profile" height={100} width={100} />
					<div className="c4">
						<h1>
							<b>John Doe</b>
						</h1>
						<p>Candidate #4</p>
						<button className="buttonC4" onClick={button4}>
							Vote
						</button>
						<div className="soloCount2">Votes: {cVote4}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
