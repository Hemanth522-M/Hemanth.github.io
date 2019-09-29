import React, {Component} from 'react';

import { Paper } from '@material-ui/core';
import History from '@material-ui/icons/History';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import './common.css';

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            open: false,
            interestDetailsOpen: false,
            interestRate: '',
            monthlyPayment: '',
        }
    }

    handleOpen =() => {
        this.setState({
            open: true,
        });
    }

    handleClose =() => {
        this.setState({
            open: false,
        })
    }

    handleInterestDetailsOpen = (amount) => {
        let idAvailable = 0;
        for(var i = 0; i < this.props.data.length; i++) {
            if(this.props.data[i].amountLoan === amount) {
                idAvailable = 1;
                break;
            }
        }
        if(idAvailable) {
            var result = this.props.data[i];
            console.log(result);
            this.setState({
                interestRate: this.props.data[i].interestRate,
                monthlyPayment: this.props.data[i].monthlyPayment,
            })
        }
        this.setState({
            interestDetailsOpen: true,
        });
    }

    handleInterestDetailsClose = () => {
        this.setState({
            interestDetailsOpen: false,
        })
    }

    render() {

        return(
            <div>
                <Paper className="sideBar" style={{backgroundColor: '#c2cac9', color: 'white'}}>
                    <div className="data" onClick={this.handleOpen}>
                        <Tooltip title="History">
                            <History style={{width: '30px', height: '30px'}} />
                        </Tooltip>&nbsp;
                        <span className="historyName">History</span>
                    </div>
                </Paper>
                {/* Dialog for history Table */}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle className="dialogTitle">
                        Previous Loan Amount & Duration Combinations
                    </DialogTitle>
                    <DialogContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Loan Amount</TableCell>
                                    <TableCell>Loan Duration(In Months)</TableCell>
                                    <TableCell>Interest Amount Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.data.map(value => (
                                    <TableRow onClick={this.handleInterestDetailsOpen}>
                                        <TableCell>{value.amountLoan}</TableCell>
                                        <TableCell>{value.loanDuration}</TableCell>
                                        <TableCell onClick={(amount)=>this.handleInterestDetailsOpen(value.amountLoan)} style={{cursor: 'pointer', color: 'blue'}}>
                                            Interest Details
                                        </TableCell>
                                    </TableRow>
                                )
                                )}
                                
                            </TableBody>
                        </Table>
                        <br style={{clear: 'both'}} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" style={{textTransform: 'capitalize'}}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.interestDetailsOpen}
                    onClose={this.handleinterestDetailsClose}
                >
                    <DialogContent>
                        {/* Interest Rates and monthly payments */}
                        <Card className="card" style={{backgroundColor: 'aliceblue'}}>
                            <h2>Interest Details</h2>
                            <CardContent className="interestDetails">
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
                            </CardContent>
                        </Card>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleInterestDetailsClose} color="primary" style={{textTransform: 'capitalize'}}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}