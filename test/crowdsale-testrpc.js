var DPW = artifacts.require("./DPIcoWhitelist.sol");
var CPCrowdsale = artifacts.require("./CPCrowdsale.sol");
var CPToken = artifacts.require("./CPToken.sol");

//DPW is deployed by the migration, so don't need to redo it
contract('CPCrowdsale', function(accounts) {

    var account1 = accounts[0];
    var account2 = accounts[1];
    var account3 = accounts[2];
    var account4 = accounts[3];
    var whitelist;
    var cpSale;
    var cpToken;

    const fiveDays = 5*24*60*60;
    const thirtyDays = 30*24*60*60;
    const wallet = account1;

    it("allows eth up to the cap; can't go over cap", async function() {
        var now = Math.floor(new Date().getTime() / 1000);
        var startTime = new web3.BigNumber(now);
        var endTime = new web3.BigNumber(startTime + thirtyDays);
        var whitelistEndTime = new web3.BigNumber(startTime + fiveDays);
        var rate = new web3.BigNumber(1000);
        var cap = web3.toWei(45000, "ether");


        CPCrowdsale.new(startTime, endTime, whitelistEndTime, rate, wallet, cap, DPW.address).then(instance => {
            cpSale = instance;
            return cpSale.token();
        }).then(addr => {
            cpToken = CPToken.at(addr);
        });
    });

    /*
    it("changes the rate at each level of Eth", function() {
        var rate1 = new web3.BigNumber(2000);
        var rate2 = new web3.BigNumber(1500);
        var rate3 = new web3.BigNumber(1000);
        var level1 = web3.toWei(2, "ether");
        var level2 = web3.toWei(4, "ether");
        var level3 = web3.toWei(7, "ether");

        var startBlock = web3.eth.blockNumber + 2;
        var endBlock = startBlock + 1000;
        var cap = web3.toWei(10, "ether");

        return CPCrowdsale.new(startBlock, endBlock, rate1, wallet, cap).then(instance => {

//            ins = instance;
  //          return ins.token();
//        }).then(addr => {
//            cpToken = CPToken.at(addr);
        });
    });
     */
});
