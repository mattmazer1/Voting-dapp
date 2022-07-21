export default function Footer() {
	let currentDate = new Date();
	let year = currentDate.getFullYear();

	const getYear = () => {
		return year;
	};
	return (
		<div className="footer">
			<span>━━━━ @ {getYear()} Voting Dapp ━━━━</span>
		</div>
	);
}
