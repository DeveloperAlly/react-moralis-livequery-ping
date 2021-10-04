## Description

A simple app that uses moralis LiveQuery and Moralis Cloud Function to subscribe to events from a contract deployed to Polygon, BSC and Kovan networks in real time.

Hosted Live on Vercel: https://react-moralis-livequery-ping.vercel.app/

![image](https://user-images.githubusercontent.com/12529822/135797271-a074c2dd-164a-4acf-9105-6b997aa0c3ba.png)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Framework

### Requirements:

Node ( https://nodejs.org/ )

Metamask ( https://docs.metamask.io )

Moralis.io account ( https://moralis.io/ )



### Faucets for testnets (check out bnb faucet - it basically uses liveQuery!)

Polygon: https://faucet.polygon.technology/

BSC testnet: https://testnet.binance.org/faucet-smart 

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


## Architecture diagrams


## BugList / To-do List

Authorisation needs updating incl. checking on account changes
React code needs Context and ErrorBoundary objects & should also bring props in on initial run (server side render some props)
React code could use breakdown / refactor to better components and typescript


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
