import { useState, useEffect, useContext } from "react";
import { provider, contract, signer } from "../../ABI";
import { ethers } from "ethers";
import { ErrorContext, TextContext } from "../../App";
/*eslint-disable*/
export default function Navbar({
	loggedIn,
	setLoggedIn,
	pick,
	setPick,
}: {
	loggedIn: boolean;
	pick: boolean;
	setLoggedIn: (loggedIn: boolean) => void;
	setPick: (setPick: boolean) => void;
}) {
	const { setText } = useContext(TextContext);
	const { setShowError } = useContext(ErrorContext);

	const [buttonText, setButtonText] = useState("Connect Wallet");
	const [vote, setVote] = useState<number>(0);
	const [userBalance, setUserBalance] = useState<string>("");

	const connectNetwork = async () => {
		const chainId = 3; //ropsten
		if (window.ethereum.networkVersion !== chainId) {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: "0x3" }],
			});

			setLoggedIn(true);
			setButtonText("Balance:");
		}
	};
	const connectWallet = async () => {
		if (window.ethereum) {
			await provider.send("eth_requestAccounts", []);
			connectNetwork();

			window.ethereum.on("networkChanged", function () {
				window.location.reload();
			});

			window.ethereum.on("accountsChanged", function () {
				accountBalance();
			});
		} else {
			setButtonText("Connect Wallet");
			setShowError(true);
			setText("Please install MetaMask");

			const err3 = setTimeout(() => {
				setShowError(false);
			}, 2000);

			return () => clearTimeout(err3);
		}
	};

	const accountBalance = async () => {
		const signerAddress = await signer.getAddress();
		const balance = await provider.getBalance(signerAddress);
		let ethBalance: any = ethers.utils.formatEther(balance);
		ethBalance = Math.round(ethBalance * 1e4) / 1e4;
		setUserBalance(ethBalance);
	};

	const liveCount = async () => {
		const votecount = await contract.voteCount();
		setVote(votecount.toString());
	};

	useEffect(() => {
		liveCount();
	}, [vote, loggedIn, pick]);

	useEffect(() => {
		connectWallet();
	}, []);

	useEffect(() => {
		accountBalance();
	}, [userBalance, loggedIn, pick]);

	return (
		<div>
			<div className="navBar">
				<div className="leftNav">Voting dapp</div>
				<div className="currentCount">Total votes: {vote}</div>
				<button className="walletButton" onClick={connectWallet}>
					{buttonText} {userBalance}
				</button>
			</div>
		</div>
	);
}
