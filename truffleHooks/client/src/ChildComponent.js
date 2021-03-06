import React, { useContext } from "react";
import BlockchainContext from './BlockchainContext.js';

export default function ChildComponent() {
    const blockchainContext = useContext(BlockchainContext);
    const { web3, contract, accounts } = blockchainContext;
}