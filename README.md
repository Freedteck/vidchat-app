# Vid Chat

VidChat is a decentralized video sharing and chatting platform built on the Hedera network. VidChat empowers users to share content, engage with creators, and support them directly, all within a secure and decentralized environment.

# Pre-requisites:

- Have a GitHub account: https://github.com/
- Install the HashPack wallet (browser extension): https://www.hashpack.app/
- Create a Hedera testnet account: https://portal.hedera.com/register
- Sign up and Obtain your Pinata jwt and Gateway url: https://www.pinata.cloud/

# Slides:

- [Vid Chat - vidchat.pdf](./slides/vidchat.pdf)

# Setup

- clone this repo: `git clone https://github.com/Freedteck/vidchat-app.git`
- install packages: `npm install`
- add environment variables: see [Environment Variables](#environment-variables)
- Start application: `npm start`

## Environment Variables

- Create a `.env` in the root directory of your project.
- Paste the following in the `.env` file:

```
REACT_APP_PINATA_JWT=<Your Pinata Jwt>
REACT_APP_GATEWAY_URL=<Your Pinata Gateway url>
REACT_APP_MY_ACCOUNT_ID=<Your Hedera Account Id>
REACT_APP_TOPIC_ID=0.0.4702122 # Leave as it is
REACT_APP_TOKEN_ID=0.0.4680264 # Leave as it is
REACT_APP_MY_PRIVATE_KEY=<Hedera Private key>
```

# Live Url

You can view this project live at: [Live url](https://vidchat-app.netlify.app/)
