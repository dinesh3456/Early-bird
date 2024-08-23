import {
	createThirdwebClient,
	getContract,
} from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";

const clientId = process.env.REACT_APP_THIRDWEB_CLIENT_ID;

if (!clientId) {
	throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
	clientId: clientId,
});

export const chain = defineChain(42026);
export const openEditionDropAddress =
	process.env.REACT_APP_OPEN_EDITION_DROP_ADDRESS;

export const editionDropTokenId =
	process.env.REACT_APP_EDITION_DROP_TOKEN_ID;

export const openEditionContract = getContract({
	address: openEditionDropAddress,
	chain,
	client,
});

export const accountAbstraction = {
	chain,
	sponsorGas: true,
};

export const wallets = [
	inAppWallet({
		auth: {
			options: ["google"],
		},
	}),
];
