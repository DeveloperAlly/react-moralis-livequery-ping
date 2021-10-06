## Description

This DApp uses moralis server, DB and functions (LiveQuery and Cloud Function) to subscribe to onchain events from a contract deployed to Polygon, BSC and Kovan networks in real time. When a user pings the front end, the react DApp will increment the count and show the latest ping information.

Hosted Live on Vercel: https://react-moralis-livequery-ping.vercel.app/

![image](https://user-images.githubusercontent.com/12529822/135797271-a074c2dd-164a-4acf-9105-6b997aa0c3ba.png)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Framework

### Requirements:

[Node js](https://nodejs.org/en/). 

[Moralis Account](https://moralis.io/)

[Metamask Wallet](https://metamask.io/) => NB: USE A FRESH WALLET WITH NO REAL VALUABLE ASSETS ON IT (test only). 

Technically not a dependency - you can use remix to make and deploy your contracts
[Truffle](https://www.trufflesuite.com/truffle) => install using npm command. 
[Remix](http://remix.ethereum.org/) => browser based contract development & deployment

> npm install -g truffle


**Contracts**: [Truffle](https://www.trufflesuite.com/truffle), Solidity, [Moralis](https://moralis.io/), [Metamask](https://docs.metamask.io/guide/)

**Front-end**: React, [Next](https://nextjs.org/) (routing, SSR)

**Other npm libs**: @react-moralis, @truffle/hdwallet-provider, dotenv, semantic-ui-react 



## **Running the App**

1. Clone the repo `git clone https://github.com/DeveloperAlly/react-moralis-livequery-ping.git`
2. Install dependencies `npm install`
3. Create a Moralis server [see here for more help](https://docs.moralis.io/moralis-server/getting-started/quick-start)
4. (OPTIONAL) Deploy the contracts either through remix or using truffle `truffle migrate --network kovan`, `truffle migrate --network bsc`, `truffle migrate --network polygon`. OR use the contract addresses found in .env.example to try this out
6. Create a .env file `> touch .env`
7. Add the moralis details & the smart contract deployed addresses to the .env file (as per the .env.example file)
8. Create a moralis sync event on your server with details 
11. Run the front end from your terminal locally >`npm run dev`
12. Navigate to [http://localhost:3000](http://localhost:3000/) to see the app in action!


## Architecture diagrams


Components
![Architecture diagram](https://user-images.githubusercontent.com/12529822/136002786-6bdf39d4-07f6-48e4-aff8-2d73517fea5b.png)


Authorisation / Web3 Logon
![Authorisation](https://user-images.githubusercontent.com/12529822/136002321-f383a620-ce70-4d23-afa6-39c3a5bbd8a8.png)



## BugList / To-do List 

Probably some around here... but is it a bug or an undocumented feature??? Just kidding - submit an issue or PR :P


## Resources

Moralis: https://moralis.io

React-moralis: https://github.com/MoralisWeb3/react-moralis

Moralis YouTube: https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw

Moralis Forum: https://forum.moralis.io/



### Faucets for testnets 

Polygon: https://faucet.polygon.technology/

BSC testnet: https://testnet.binance.org/faucet-smart (check out bnb faucet - it basically uses liveQuery to show most recent addresses that have requested funds!)

Kovan Eth: https://kovan.chain.link/ 

### Handy links for chainIds:

https://chainlist.org/ 

### Docs for used framework
Moralis
Docs: https://docs.moralis.io/ 
Discord: 
Forum: https://forum.moralis.io/ 
Moralis npm: https://www.npmjs.com/package/moralis 
React-moralis: https://www.npmjs.com/package/react-moralis & https://github.com/MoralisWeb3/react-moralis & https://docs.moralis.io/moralis-server/tools/react-moralis 
YouTube: https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw 

Solidity lang
https://docs.soliditylang.org/ 

Nextjs (not needed - have not really used the features that make next cool so you could just use a react app)
https://nextjs.org/docs

React
https://reactjs.org/docs 

Truffle
https://www.trufflesuite.com/ 
React Semantic-ui (I prefer material-ui though)
https://react.semantic-ui.com/ 

React-moralis

Metamask
https://docs.metamask.io/ 

Remix (for testing contracts initially)
http://remix.ethereum.org/


### Block explorer links

Mumbai polygon: https://mumbai.polygonscan.com/ 

Kovan eth: https://kovan.etherscan.io/ 

BSC testnet: https://testnet.bscscan.com/ 



## Nextjs DOCS - Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
