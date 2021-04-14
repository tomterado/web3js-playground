
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";


contract QuizCertificate is ERC721URIStorage, Ownable {
    constructor() ERC721("QuizNFT", "QUIZ") public { }
    
    struct Gradient {
      string outer;
      string inner;
    }
    
    Gradient[] gradients;
    
    function mintCertificate(string memory _outer, string memory _inner) public onlyOwner {
        Gradient memory _gradient = Gradient({ outer: _outer, inner: _inner });
        gradients.push(_gradient);
        uint _gradientId = gradients.length - 1;
        _mint(msg.sender, _gradientId);
    }
    
    function getGradient( uint _gradientId ) public view returns(string memory outer, string memory inner){
      Gradient memory _grad = gradients[_gradientId];
      outer = _grad.outer;
      inner = _grad.inner;
    }
    
}

