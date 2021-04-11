const Web3 = require('web3');
const Router = require("@koa/router");
const web3 = new Web3(process.env.INFURA_URL);
const router = new Router();
const config = require('./config.json');

//Web3 Init
const cTokens = {
  cBat: new web3.eth.Contract(
    config.cTokenAbi,
    config.cBatAddress,
  ),
  cDai: new web3.eth.Contract(
    config.cTokenAbi,
    config.cDaiAddress,
  )
};

router.get("/tokenBalance/:cToken/:address", async ctx => {
    const cToken = cTokens[ctx.params.cToken];
    if (typeof cToken === "undefined") {
        ctx.status = 400;
        ctx.body = {
            error: `cToken ${ctx.params.cToken} not found`
        }
        return;
    }

    // const tokenBalance = await cToken

} )

router.get("/", ctx => {
    ctx.body = "Hello dApp";
})

module.exports = router;