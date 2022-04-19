# XRP Junkies NFT Minting Server

An implementation of an NFT minting server which makes use of the XLS-20d proposal for the Ripple XRPL blockchain.

## Merging Metadata
This application can merge the metadata of two compatible NFTs from the user wallet to yield a new NFT. This is a general purpose mechanism for use in play-to-earn games.

## Server
API is written in TypeScript using the NestJS framework.

# Usage

1. Clone repository
2. Set up:
    1. `npm build`
    2. `mv env.example .env` and update parameters for local environment
    3. `npm run start:dev`
3. The authorization sequence implements server sent events(SSE): `const source = new EventSource("[https://<host>/auth/sse](http://localhost:3001/auth/sse)");`. This creates a stream which which returns:

```jsx
https://xumm.app/sign/9045b9ee-208b-4614-8baf-66a05fd9091a
{"message":"Welcome 9045b9ee-208b-4614-8baf-66a05fd9091a"}
{"expires_in_seconds":86400}
{"expires_in_seconds":86385}
...
```

After following the link, you will see the form of authorisation:

![Screenshot 2022-03-29 at 00.13.17.png](XRP%20Junkie%2072e5b/Screenshot_2022-03-29_at_00.13.17.png)

1. Go to your XUMM wallet application, click on the down-middle blue button and click on “Scan QR code”;
2. Scan the code to complete authorization;
3. You will receive receive a signing request:

```json
{
  "payload_uuidv4": "aa368eaa-cbbf-41df-803a-34f143f9f869",
  "reference_call_uuidv4": "d47e3c40-539b-40dc-b075-19bca6697f98",
  "signed": true,
  "user_token": true,
  "return_url": {
    "app": null,
    "web": null
  },
  "txid": "EC8E5F5335BCF6AA6C2F71AA369D6002E4C7E15CE344982EEBA66DC8FAC745E3",
  "opened_by_deeplink": false,
  "custom_meta": {
    "identifier": null,
    "blob": null,
    "instruction": "Hello! Please sign!"
  }
}
```

1. To combine metadata, make a `GET` request to `https://<host>/combine-metadata` with a request body following this format: 

`characterMetadata` as: 

```json
{
  "name": "King Soloman",
  "image": "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/8152.png",
  "attributes": [
    {
      "trait_type": "Type",
      "value": "Human"
    },
    {
      "trait_type": "Hair",
      "value": "Blue Flame Spiky"
    }
  ]
}
```

`equipmentMetadata` as: 

```json
{
  "name": "Fire Sword",
  "image": "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/8152.png",
  "attributes": [
    {
      "trait_type": "Weapon",
      "value": "Fire Sword"
    }
  ]
}
```

The response will follow this format:

```json
{
  "metadata": {
    "name": "King Soloman",
    "image": "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/8152.png",
    "attributes": [
      {
        "trait_type": "Type",
        "value": "Human"
      },
      {
        "trait_type": "Hair",
        "value": "Blue Flame Spiky"
      },
      {
        "trait_type": "Weapon",
        "value": "Fire Sword"
      }
    ]
  },
  "image": "iVBORw0KGg...aEg3632Rqwe...AAAElFTkSuQmCC"
}
```
