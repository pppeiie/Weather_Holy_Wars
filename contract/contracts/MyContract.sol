pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "@chainlink/contracts/src/v0.5/interfaces/AggregatorInterface.sol";

contract MyContract {
  AggregatorInterface internal ref;

  struct Bet {
    uint256 amount;
    uint256 timeStart;
    int256 lastPrice;
    uint8 choice; // 0 < // 1 == // 2 >
    uint8 status; // 0 = not done // 1 = done
    int8 isWin;  //-1 = pending // 0 = lost // 1 = win
  }

  address Owner;                      // address of owner
  uint256 private rewardAmount = 0;   // frozen ethereum

  mapping(address => Bet[]) private users; //

  constructor(address _aggregator) public {
    ref = AggregatorInterface(_aggregator);
    Owner = msg.sender;
  }

  event AnswerUpdated(int256 indexed current, uint256 indexed roundId, uint256 timestamp);

  modifier isOwner() {
    require(msg.sender == Owner, "sender must be Owner.");
    _;
  }

  function getLatestAnswer() public view returns (int256) {
    return ref.latestAnswer();
  }

  function getLatestTimestamp() public view returns (uint256) {
    return ref.latestTimestamp();
  }

  function getPreviousAnswer(uint256 _back) public view returns (int256) {
    uint256 latest = ref.latestRound();
    require(_back <= latest, "Not enough history");
    return ref.getAnswer(latest - _back);
  }

  function getPreviousTimestamp(uint256 _back) public view returns (uint256) {
    uint256 latest = ref.latestRound();
    require(_back <= latest, "Not enough history");
    return ref.getTimestamp(latest - _back);
  }

  function CeoFunding(uint _amount) public payable isOwner {
    require(msg.value >= _amount, "Input not enough");
  }

  function BalanceOfContract() public view returns (uint256) {
    return address(this).balance;
  }

  function BalanceCeoCanWithdraw() public view isOwner returns (uint256){
    return address(this).balance - rewardAmount;
  }

  function getDetailBetOfPlayer(uint256 index) public view returns(Bet memory ){
    return users[msg.sender][index];
  }

  function getBetLengh() public view returns(uint256){
    return users[msg.sender].length;
  }

  function getAllBetOfPlayer() public view returns(Bet[] memory){
    return users[msg.sender];
  }

  function CeoWithdraw(uint256 _amount) external {
    require(msg.sender == Owner, 'Only Owner');
    require(_amount <= address(this).balance - rewardAmount, 'Can only withdraw balance not in reward');
    msg.sender.transfer(_amount);
  }

  function beting(uint8 _choice, uint256 _amount) external payable {
    require(msg.value >= _amount, "Input not enough");
    require((address(this).balance - rewardAmount) >= (_amount*3 - _amount/10),"contract don't have enough money for your bet");

    // _choice = 0 mean < going up
    // _choice = 1 mean = unchanged
    // _choice = 2 mean > going down
    require(_choice == 0 || _choice == 1 || _choice == 2, "User's choice must in range");

    // push user request to BET
    users[msg.sender].push(Bet(_amount, now, ref.latestAnswer(), _choice, 0, -1));

    rewardAmount += (_amount*3 - _amount/10);
  }

  function claim(uint256 _index) public {
    require(now >= users[msg.sender][_index].timeStart + 3600, "Must claim after 1 hours");
    require(users[msg.sender][_index].status == 0, "Bet must not be completed");

    uint256 latest = ref.latestRound();

    if((ref.latestTimestamp() <= users[msg.sender][_index].timeStart + 3600 )){
      // win
      if(((users[msg.sender][_index].lastPrice < ref.latestAnswer()) && users[msg.sender][_index].choice == 0 ) ||
      ((users[msg.sender][_index].lastPrice == ref.latestAnswer()) && users[msg.sender][_index].choice == 1 ) ||
      ((users[msg.sender][_index].lastPrice > ref.latestAnswer()) && users[msg.sender][_index].choice == 2 )){
        users[msg.sender][_index].isWin = 1;
        // transfer reward
        msg.sender.transfer(users[msg.sender][_index].amount*3 - users[msg.sender][_index].amount/10);
      }else{
        users[msg.sender][_index].isWin = 0;
      }
      // lose just update status done
      users[msg.sender][_index].status = 1;

      // unlock frozen amount
      rewardAmount -= (users[msg.sender][_index].amount*3 - users[msg.sender][_index].amount/10);
    }else{
      // loop 60 time ~ 60 hours
      for(uint256 i = 1; i <= 60; i++){
        if((ref.getTimestamp(latest - i) <= users[msg.sender][_index].timeStart + 3600) &&
        (users[msg.sender][_index].timeStart + 3600) < (ref.getTimestamp(latest - i + 1))){
          // win
          if(((users[msg.sender][_index].lastPrice < ref.getAnswer(latest - i)) && users[msg.sender][_index].choice == 0 ) ||
          ((users[msg.sender][_index].lastPrice == ref.getAnswer(latest - i)) && users[msg.sender][_index].choice == 1 ) ||
          ((users[msg.sender][_index].lastPrice > ref.getAnswer(latest - i)) && users[msg.sender][_index].choice == 2 )){
              users[msg.sender][_index].isWin = 1;
              // transfer reward
              msg.sender.transfer(users[msg.sender][_index].amount*3 - users[msg.sender][_index].amount/10);
          }else{
            users[msg.sender][_index].isWin = 0;
          }
          // lose just update status done
          users[msg.sender][_index].status = 1;

          // unlock frozen amount
          rewardAmount -= (users[msg.sender][_index].amount*3 - users[msg.sender][_index].amount/10);
          break;
        }
      }
    }
  }
}
