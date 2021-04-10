export const address = "0xA75cF19B8ec1e3Cf72202019B3A3ed0b23dC53F1";

export const ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "eventHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
    ],
    name: "addEvent",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "eventHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "randomNumber",
        type: "uint256",
      },
    ],
    name: "endEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "eventHash",
        type: "string",
      },
    ],
    name: "enterEvent",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "viewAllEvHashes",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "eventHash",
        type: "string",
      },
    ],
    name: "viewEvent",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "address payable[]",
            name: "players",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "pool",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "open",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "winner",
            type: "uint256",
          },
        ],
        internalType: "struct RandomNumber.Event",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
