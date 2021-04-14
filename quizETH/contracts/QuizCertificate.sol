// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract QuizCertificate is ERC721, Ownable {
    constructor() public ERC721("QuizNFT", "QUIZ") {}

    struct Certficate {
        string firstName;
        string lastName;
    }

    Certficate[] certicates;

    function mintCertificate(string memory _firstName, string memory _lastName)
        public
    {
        Certficate memory _gradient =
            Certficate({firstName: _firstName, lastName: _lastName});
        certicates.push(_gradient);
        uint256 _certId = certicates.length - 1;
        _mint(msg.sender, _certId);
    }

    function getGradient(uint256 _certId)
        public
        view
        returns (string memory firstName, string memory lastName)
    {
        Certficate memory _cert = certicates[_certId];
        firstName = _cert.firstName;
        lastName = _cert.lastName;
    }
}
