const hre = require("hardhat");

async function main() {
	const VoteContract = await hre.ethers.getContractFactory("VoteContract");
	const voteContract = await VoteContract.deploy();

	await voteContract.deployed();

	console.log("Vote deployed to:", voteContract.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
