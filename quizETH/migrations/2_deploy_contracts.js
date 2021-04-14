var QuizCertificate = artifacts.require("./QuizCertificate.sol");

module.exports = function(deployer) {
  deployer.deploy(QuizCertificate);
};
