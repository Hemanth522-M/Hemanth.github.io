import React, {Component} from "react";

import axios from "axios";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

import Paper from '@material-ui/core/Paper';

import Header from './Header';
import SideBar from './sideBar';
import Footer from './Footer';

import './common.css';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loanAmountStart: 500,
			monthsStart: 6,
			interestRate: 0,
			monthlyPayment: 0,
			durationMonths: 0,
			data: [],
		};
	}
    
	componentDidMount() {
		axios
			.get(
				`https://ftl-frontend-test.herokuapp.com/interest?amount=${
					this.state.loanAmountStart
				}&numMonths=${this.state.monthsStart}`
			)
			.then(response => {
				console.log(response);
				this.state.data.push({
					"amountLoan": response.data.principal.amount,
					"loanDuration": response.data.numPayments,
					"interestRate": response.data.interestRate,
					"monthlyPayment": response.data.monthlyPayment.amount,
				})
				this.setState({
					interestRate: response.data.interestRate,
					monthlyPayment: response.data.monthlyPayment.amount,
					durationMonths: response.data.numPayments
				});
			})
			.catch(e => console.log(e));
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(prevState);

		if (
			this.state.loanAmountStart !== prevState.loanAmountStart ||
			this.state.monthsStart !== prevState.monthsStart
		) {
			axios
				.get(
					`https://ftl-frontend-test.herokuapp.com/interest?amount=${
						this.state.loanAmountStart
					}&numMonths=${this.state.monthsStart}`
				)
				.then(response => {
					console.log(response.data);
					if (response.data.status && response.data.status === "error") {
						console.log("Error occurred");
					} else {
						this.state.data.push({
							"amountLoan": response.data.principal.amount,
							"loanDuration": response.data.numPayments,
							"interestRate": response.data.interestRate,
							"monthlyPayment": response.data.monthlyPayment.amount,
						})
						this.setState({
							interestRate: response.data.interestRate,
							monthlyPayment: response.data.monthlyPayment.amount,
							durationMonths: response.data.numPayments,
							loanAmountStart: response.data.principal.amount,
						});
					}
				})
				.catch(e => console.log(e));
		}
    }
    
    amountFormatLabel = val => {
		return `$${val}`;
    };
    
    render() {

        return(
            <div>
                <Header />
				<div style={{display: 'inline-flex'}}>
					<SideBar data = {this.state.data} />
					<Paper className="paper">
						<form>
							<div className="form-heading">
								<label>Loan Amount</label>
								<div className="input">
									<InputRange
										maxValue={5000}
										minValue={500}
										value={this.state.loanAmountStart}
										onChange={loanAmountStart => this.setState({ loanAmountStart })}
										formatLabel={this.amountFormatLabel}
									/>
								</div>
							</div>
							<div className="form-heading">
								<label>Loan Duration (In Months)</label>
								<div className="input">
									<InputRange
										maxValue={24}
										minValue={6}
										value={this.state.monthsStart}
										onChange={monthsStart => this.setState({ monthsStart })}
									/>
								</div>
							</div>
						</form>
						<br />
						<div className="interestDetails">
							<h2>Interest Details: </h2>
							<p className="interestData">
								<span className="interestLabel">Interest Rate: </span>
								<span className="interestDisplay data-display">
									${this.state.interestRate}
								</span>
							</p>
							<p className="interestData">
								<span className="interestLabel">Monthly Payment:</span>{" "}
								<span className="paymentDisplay data-display">
									${this.state.monthlyPayment}
								</span>
							</p>
							<p className="interestData">
								<span className="interestLabel">Duration Months:</span>{" "}
								<span className="numberDisplay data-display">
									{this.state.durationMonths}
								</span>
							</p>
						</div>
					</Paper>
				</div>
                <Footer />
            </div>
        )
    }
}
