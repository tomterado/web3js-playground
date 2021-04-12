const Web3 = require('web3');
const Router = require("@koa/router");
const web3 = new Web3(process.env.INFURA_URL);
const router = new Router();
const config = require('./config.json');

//Vanity ETH Address
web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
const adminAddress = web3.eth.accounts.wallet[0].address;

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
  
  try {
    const cTokenBalance = await cToken
      .methods
      .balanceOf(ctx.params.address)
      .call();
    ctx.body = {
      cToken: ctx.params.cToken,
      address: ctx.params.address,
      cTokenBalance
    };
  } catch(e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = {
      error: 'internal server error'
    };
  }

})

router.get('/cTokenBalance/:cToken/:address', async (ctx, next) => {
  const cToken = cTokens[ctx.params.cToken];
  if(typeof cToken === 'undefined') {
    ctx.status = 400;
    ctx.body = {
      error: `cToken ${ctx.params.cToken} does not exist`
    };
    return;
  }

  try {
    const cTokenBalance = await cToken
      .methods
      .balanceOf(ctx.params.address)
      .call();
    ctx.body = {
      cToken: ctx.params.cToken,
      address: ctx.params.address,
      cTokenBalance
    };
  } catch(e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = {
      error: 'internal server error'
    };
  }
});

router.get("/", ctx => {
    ctx.body = "Hello dApp";
})

// Mint new CToken
router.post("/mint/:cToken/:amount", async ctx => {
  const cToken = cTokens[ctx.params.cToken];
  if (typeof cToken === "undefined") {
      ctx.status = 400;
      ctx.body = {
          error: `cToken ${ctx.params.cToken} not found`
      }
      return;
  }

  const tokenAddress = await cToken.methods.underlying().call();
  const token = new web3.eth.Contract(config.ERC20Abi, tokenAddress);
  await token
      .methods
      .approve(cToken.options.address, ctx.params.amount)
      .send({ from: adminAddress });
  
  try {
    const cTokenBalance = await cToken
      .methods
      .mint(ctx.params.amount)
      .send({ from: adminAddress });
    ctx.body = {
      cToken: ctx.params.cToken,
      address: adminAddress,
      cTokenBalance
    };
  } catch(e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = {
      error: 'internal server error'
    };
  }

})

// Redeem new cToken
router.post("/redeem/:cToken/:amount", async ctx => {
  const cToken = cTokens[ctx.params.cToken];
  if (typeof cToken === "undefined") {
      ctx.status = 400;
      ctx.body = {
          error: `cToken ${ctx.params.cToken} not found`
      }
      return;
  }

  const tokenAddress = await cToken.methods.underlying().call();
  const token = new web3.eth.Contract(config.ERC20Abi, tokenAddress);
  await token
      .methods
      .redeem(ctx.params.amount)
      .send({ from: adminAddress });
  
  try {
    const cTokenBalance = await cToken
      .methods
      .mint(ctx.params.amount)
      .send({ from: adminAddress });
    ctx.body = {
      cToken: ctx.params.cToken,
      address: adminAddress,
      amountRedeemed:ctx.params.amount,
    };
  } catch(e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = {
      error: 'internal server error'
    };
  }

})

module.exports = router;