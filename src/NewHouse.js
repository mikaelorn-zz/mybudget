import React, { Component } from 'react';
import './App.css';
import NumberFormat from 'react-number-format';
import { Container, Row, Col } from 'react-grid-system';
import { setConfiguration } from 'react-grid-system';

class NewHouse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      whatWeGet: null,
      loanLeft: null,
      derivedCashDeposit: null,
      extraCashDeposit: null,
      totalCashDeposit: null,
      newHouseCost: null,
      newHouseFee: null,
      newLoanAmount: null,
      loanShare: null,
      interest: null,
      amortgage: null,
      monthlyCost: null,
      yearlyCost: null
    }

    setConfiguration({ gutterWidth: 30 });
  }

  setWhatWeGet(val) {
    let whatWeGet = val.floatValue;
    this.setState({
      whatWeGet: whatWeGet
    });
    let loanLeft = this.state.loanLeft;
    if(loanLeft) {
      let newCashDeposit = whatWeGet - loanLeft;
      //let newCashDepositSpaced = newCashDeposit.toLocaleString();
      this.setState({
        cashDepositAvailable: newCashDeposit
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
      derivedCashDeposit: newCashDeposit
    });
  }

  setNewHouseCost(val) {
    let newHouseCost = Number.parseInt(val.floatValue, 10);
    this.setState({
      newHouseCost: newHouseCost
    });
    let totalCashDeposit = this.state.totalCashDeposit;
    if(newHouseCost > totalCashDeposit) {
      let newLoanAmount = newHouseCost - totalCashDeposit;
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
    });

  }

  SetInterest(val) {
    let interest = val.floatValue;
    this.setState({
      interest: interest
    });
  }

  Calculate() {

    let newLoanAmount = this.state.newLoanAmount;
    let interest = this.state.interest;
    let fee = this.state.newHouseFee;
    let amortgage = this.state.amortgage;

    if(newLoanAmount > 0 && interest > 0 && fee) {

      let monthlyInterest = Math.round(newLoanAmount * (interest / 100) / 12);
      let monthlyCost = Math.round(monthlyInterest + fee + amortgage);
      let yearlyCost = Math.round(monthlyCost * 12 + (amortgage * 12));

      this.setState({
        monthlyCost: monthlyCost,
        yearlyCost: yearlyCost
      });
    }
  }

  setExtraCashDeposit(val) {
    let extraCashDeposit = val.floatValue;
    this.setState({
      extraCashDeposit: extraCashDeposit
    }, () => {this.updateTotalCashDeposit()});
  }

  setDerivedCashDeposit(val) {
    let derivedCashDeposit = val.floatValue;
    this.setState({
      derivedCashDeposit: derivedCashDeposit
    }, () => {this.updateTotalCashDeposit()});
  }

  SetAmortgage(val) {
    let amortgage = val.floatValue;
    this.setState({
      amortgage: amortgage
    });
  }

  updateTotalCashDeposit() {
    let derivedCashDeposit = this.state.derivedCashDeposit;
    let extraCashDeposit = this.state.extraCashDeposit;

    if(derivedCashDeposit && extraCashDeposit) {
      let newTotal = derivedCashDeposit + extraCashDeposit;
      this.setState({
        totalCashDeposit: newTotal
      });
    }
    if(derivedCashDeposit && !extraCashDeposit) {
      this.setState({
        totalCashDeposit: derivedCashDeposit
      });
    }
    if(!derivedCashDeposit && extraCashDeposit) {
      this.setState({
        totalCashDeposit: extraCashDeposit
      });
    }
    if(!derivedCashDeposit && !extraCashDeposit) {
      this.setState({
        totalCashDeposit: 0
      });
    }
  }
   
  render() {
    return (
      <div className="NewHouse">
        <Container>
          <Row className="containerRow">
            <Col sm={4} className="columnRow">
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
                <NumberFormat readOnly thousandSeparator={true} value={this.state.derivedCashDeposit} onValueChange={this.setDerivedCashDeposit.bind(this)} />
              </label>
              <label  className="inputLabel">
                Extra kontantinsats
                <NumberFormat thousandSeparator={true} value={this.state.extraCashDeposit} onValueChange={this.setExtraCashDeposit.bind(this)} />
              </label>
            </Col>
            <Col sm={4} className="columnRow">
              <label className="inputLabel">
                Nya boendets kostnad
                <NumberFormat thousandSeparator={true} value={this.state.newHouseCost} onValueChange={this.setNewHouseCost.bind(this)} />
              </label>
              <label className="inputLabel">
                Nya boendets avgift
                <NumberFormat thousandSeparator={true} value={this.state.newHouseFee} onValueChange={this.setNewHouseFee.bind(this)} />
              </label>
            </Col>
            <Col sm={4} className="columnRow">
              <label className="inputLabel">
                Ränta
                <NumberFormat value={this.state.interest} onValueChange={this.SetInterest.bind(this)} />
              </label>
              <label className="inputLabel">
                <br/>
                Rak amortering / mån
                <NumberFormat value={this.state.amortgage} onValueChange={this.SetAmortgage.bind(this)} />
              </label>
            </Col>
          </Row>
          <Row className="containerRow">
            <Col sm={4} className="columnRow">
            <label className="inputLabel">
              Total kontantinsats
              <NumberFormat thousandSeparator={true} value={this.state.totalCashDeposit} />
            </label>
            </Col>
            <Col sm={4} className="columnRow">
              <label className="inputLabel">
                Nytt lånebelopp
                <NumberFormat readOnly thousandSeparator={true} value={this.state.newLoanAmount} />
              </label>
            </Col>
            <Col sm={4}>
              <button onClick={this.Calculate.bind(this)}>Beräkna</button>
            </Col>
          </Row>
          <Row className="containerRow">
            <Col lg={12} className="columnRow">
            <label className="inputLabel">
              Ger månadskostnad
              <input type="number" value={this.state.monthlyCost}></input>
            </label>
            <br />
            <label className="inputLabel">
              Ger årskostnad
              <input type="number" value={this.state.yearlyCost}></input>
            </label>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default NewHouse;
