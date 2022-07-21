const { expect } = require("chai");
const { ethers } = require("hardhat");

require("@nomiclabs/hardhat-waffle");

describe("VoteContract", function () {
	it("Should return, you picked candidate #1", async function () {
		const VoteContract = await ethers.getContractFactory("VoteContract");
		const voteContract = await VoteContract.deploy();
		const contract = await voteContract.deployed();

		const contractPick = await contract.callStatic.pickPerson(1);
		expect(contractPick).to.equal("You picked candidate #1");
	});

	it("Should return, all counts", async function () {
		const VoteContract = await ethers.getContractFactory("VoteContract");
		const voteContract = await VoteContract.deploy();
		const contract = await voteContract.deployed();

		const votecounts = await contract.voteCount();
		expect(votecounts).to.equal(0);
	});

	it("Should return, candidate counts", async function () {
		const VoteContract = await ethers.getContractFactory("VoteContract");
		const voteContract = await VoteContract.deploy();
		const contract = await voteContract.deployed();

		const candidatecounts = await contract.callStatic.candidatesCount();
		const expectedResult = [
			ethers.BigNumber.from(0),
			ethers.BigNumber.from(0),
			ethers.BigNumber.from(0),
			ethers.BigNumber.from(0),
		];

		expect(JSON.stringify(candidatecounts)).to.equal(
			JSON.stringify(expectedResult)
		);
	});
});
