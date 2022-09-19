/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  MarketFactory,
  MarketFactoryInterface,
} from "../../contracts/MarketFactory";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "sku",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_predictionPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "closingDate",
        type: "uint256",
      },
    ],
    name: "marketCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allMarkets",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_predictionPrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_oracleFeed",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_closingDate",
        type: "uint256",
      },
      {
        internalType: "contract IERC20",
        name: "_usdc",
        type: "address",
      },
      {
        internalType: "string",
        name: "sku",
        type: "string",
      },
    ],
    name: "createNewMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllMarkets",
    outputs: [
      {
        internalType: "address[]",
        name: "valid",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "sku",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_predictionPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "closingDate",
        type: "uint256",
      },
    ],
    name: "getMarket",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "markets",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b61065a8061007e6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80637564912b1161005b5780637564912b146100ed5780638da5cb5b14610116578063b0772d0b14610127578063f2fde38b1461013c57600080fd5b806352d84d1e1461008d57806355201b13146100bd578063695189a3146100d0578063715018a6146100e5575b600080fd5b6100a061009b3660046103a5565b61014f565b6040516001600160a01b0390911681526020015b60405180910390f35b6100a06100cb36600461047a565b610179565b6100e36100de3660046104dd565b6101c8565b005b6100e36101d8565b6100a06100fb3660046103a5565b6001602052600090815260409020546001600160a01b031681565b6000546001600160a01b03166100a0565b61012f6101ec565b6040516100b4919061057c565b6100e361014a3660046105c9565b61024e565b6002818154811061015f57600080fd5b6000918252602090912001546001600160a01b0316905081565b600080848484604051602001610191939291906105ed565b60408051808303601f190181529181528151602092830120600090815260019092529020546001600160a01b031695945050505050565b6101d06102e3565b505050505050565b6101e06102e3565b6101ea600061033d565b565b6060600280548060200260200160405190810160405280929190818152602001828054801561024457602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610226575b5050505050905090565b6102566102e3565b6001600160a01b0381166102d75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6102e08161033d565b50565b6000546001600160a01b031633146101ea5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102ce565b600080546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156103b757600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f8301126103fe57600080fd5b813567ffffffffffffffff80821115610419576104196103be565b604051601f8301601f19908116603f01168101908282118183101715610441576104416103be565b8160405283815286602085880101111561045a57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060006060848603121561048f57600080fd5b833567ffffffffffffffff8111156104a657600080fd5b6104b2868287016103ed565b9660208601359650604090950135949350505050565b6001600160a01b03811681146102e057600080fd5b60008060008060008060c087890312156104f657600080fd5b863567ffffffffffffffff8082111561050e57600080fd5b61051a8a838b016103ed565b97506020890135965060408901359150610533826104c8565b9094506060880135935060808801359061054c826104c8565b90925060a0880135908082111561056257600080fd5b5061056f89828a016103ed565b9150509295509295509295565b6020808252825182820181905260009190848201906040850190845b818110156105bd5783516001600160a01b031683529284019291840191600101610598565b50909695505050505050565b6000602082840312156105db57600080fd5b81356105e6816104c8565b9392505050565b6000845160005b8181101561060e57602081880181015185830152016105f4565b509190910192835250602082015260400191905056fea2646970667358221220c8b67244f7cde6da9be26d044666a8518ce56a81e77fb789df4d0a995f590b9f64736f6c63430008100033";

type MarketFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MarketFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MarketFactory__factory extends ContractFactory {
  constructor(...args: MarketFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MarketFactory> {
    return super.deploy(overrides || {}) as Promise<MarketFactory>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MarketFactory {
    return super.attach(address) as MarketFactory;
  }
  override connect(signer: Signer): MarketFactory__factory {
    return super.connect(signer) as MarketFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MarketFactoryInterface {
    return new utils.Interface(_abi) as MarketFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MarketFactory {
    return new Contract(address, _abi, signerOrProvider) as MarketFactory;
  }
}
