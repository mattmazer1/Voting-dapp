import { ethers } from "ethers";
require("dotenv").config();

export const ABI = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "startTime",
				type: "uint256",
			},
		],
		name: "StartTimer",
		type: "event",
	},
	{
		inputs: [],
		name: "candidatesCount1",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "candidatesCount2",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "candidatesCount3",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "candidatesCount4",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "pick",
				type: "uint256",
			},
		],
		name: "pickPerson",
		outputs: [
			{
				internalType: "string",
				name: "winner",
				type: "string",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "timer",
				type: "uint256",
			},
		],
		name: "startTime",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "voteCount",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];

export const contractAddress = "0x1305afDf5803459bA9A59B9b3167D252867248AA";

export let provider = window.ethereum
	? new ethers.providers.Web3Provider(window.ethereum)
	: new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_PROVIDER);

export const signer = provider.getSigner();

export const contract = new ethers.Contract(contractAddress, ABI, signer);
