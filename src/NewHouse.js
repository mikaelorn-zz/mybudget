import React, { Component } from 'react';
import './App.css';
import NumberFormat from 'react-number-format';

class NewHouse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      whatWeGet: undefined,
      loanLeft: undefined,
      cashDepositAvailable: undefined,
      newHouseCost: undefined,
      newHouseFee: undefined,
      newLoanAmount: undefined,
      loanShare: undefined,
      interest: undefined,
      monthlyCost: undefined,
      yearlyCost: undefined
    }
    this.setFinalCost.bind(this);
  }

  setWhatWeGet(val) {
    let whatWeGet = val.floatValue;
    this.setState({
      whatWeGet: whatWeGet
    });
    let loanLeft = this.state.loanLeft;
    if(typeof loanLeft !== "undefined" ) {
      let newCashDeposit = whatWeGet - loanLeft;
      let newCashDepositSpaced = newCashDeposit.toLocaleString();
      this.setState({
        cashDepositAvailable: newCashDepositSpaced
      });
    }
  }

  setLoanLeft(val) {
    let loanLeft = val.floatValue;
    this.setState({
      loanLeft: loanLeft
    });
    let whatWeGet = this.state.whatWeGet;
    let newCashDeposit = whatWeGet - loanLeft;
    this.setState({
      cashDepositAvailable: newCashDeposit
    });
  }

  setNewHouseCost(val) {
    let newHouseCost = Number.parseInt(val.floatValue, 10);
    this.setState({
      newHouseCost: newHouseCost
    });
    let cashDepositAvailable = this.state.cashDepositAvailable;

    if(newHouseCost > cashDepositAvailable) {
      let newLoanAmount = newHouseCost - cashDepositAvailable;
      this.setState({
        newLoanAmount: newLoanAmount
      });
    }
    else {
      this.setState({
        newLoanAmount: undefined
      });
    }
  }

  setNewHouseFee(val) {
    let newHouseFee = val.floatValue;
    this.setState({
      newHouseFee: newHouseFee
    }, () => {this.setFinalCost()});

  }

  SetInterest(val) {
    let interest = val.floatValue;
    this.setState({
      interest: interest
    }, () => {this.setFinalCost()});
  }

  setFinalCost() {
    let newLoanAmount = this.state.newLoanAmount;
    let interest = this.state.interest;
    let fee = this.state.newHouseFee;
    if(newLoanAmount > 0 && interest > 0 && fee) {
      let yearlyCost = Math.round((newLoanAmount * (interest / 100)) + (fee * 12));
      let monthlyCost = Math.round((yearlyCost / 12) + fee);
      this.setState({
        monthlyCost: monthlyCost,
        yearlyCost: yearlyCost
      });
    }
  }
 
  render() {
    return (
      <div className="NewHouse">
        <div className="newHouseForm">
          <form>
            <label className="inputLabel">
              Vad vi får
              <NumberFormat thousandSeparator={true} value={this.state.whatWeGet} onValueChange={this.setWhatWeGet.bind(this)} />
            </label>
            <label className="inputLabel">
              Lån kvar
              <NumberFormat thousandSeparator={true} value={this.state.loanLeft} onValueChange={this.setLoanLeft.bind(this)} />
            </label>
            <label className="inputLabel">
              Ger kontantinsats
              <NumberFormat thousandSeparator={true} value={this.state.cashDepositAvailable} />
            </label>
            <label className="inputLabel">
              Nya boendets kostnad
              <NumberFormat thousandSeparator={true} value={this.state.newHouseCost} onValueChange={this.setNewHouseCost.bind(this)} />
            </label>
            <label className="inputLabel">
              Nya boendets avgift
              <NumberFormat thousandSeparator={true} value={this.state.newHouseFee} onValueChange={this.setNewHouseFee.bind(this)} />
            </label>
            <label className="inputLabel">
              Nytt lånebelopp
              <NumberFormat thousandSeparator={true} value={this.state.newLoanAmount} />
            </label>
            <label className="inputLabel">
              Belåningsgrad
              <input type="number" value={this.state.loanShare}></input>
            </label>
            <label className="inputLabel">
              Ränta
              <NumberFormat value={this.state.interest} onValueChange={this.SetInterest.bind(this)} />
            </label>
            <label className="inputLabel">
              Ger månadskostnad
              <input type="number" value={this.state.monthlyCost}></input>
            </label>
            <label className="inputLabel">
              Ger årskostnad
              <input type="number" value={this.state.yearlyCost}></input>
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default NewHouse;
