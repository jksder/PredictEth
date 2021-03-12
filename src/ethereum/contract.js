export const address = "0x3E594ceA0e5653c0c2dEd6B6b9D0a761A4373005";

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
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
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
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
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
