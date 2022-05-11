import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  // Example with injected providers
  injected: {
    display: {
      logo: "data:image/gif;base64,INSERT_BASE64_STRING",
      name: "Injected",
      description: "Connect with the provider in your Browser",
    },
    package: null,
  },
  // Example with WalletConnect provider
  walletconnect: {
    display: {
      logo: "data:image/gif;base64,INSERT_BASE64_STRING",
      name: "Mobile",
      description: "Scan qrcode with your mobile wallet",
    },
    package: WalletConnectProvider,
    options: {
      infuraId: "INFURA_ID", // required
    },
  },
};

export default providerOptions;
