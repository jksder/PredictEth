export const address = "0x9050e9300a12b938D013CCEf6D6429b778E5Dc95";

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
        internalType: "address payable",
        name: "winner",
        type: "address",
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
            internalType: "address payable",
            name: "winner",
            type: "address",
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
