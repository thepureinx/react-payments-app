import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as paymentAction from '../../action/PaymentAction';
import PaymentList from './PaymentList';

export class PaymentListContainer extends Component {

    constructor() {
        super();

        this.state = {
            selectedPaymentId: undefined
        };

        this.handleAddPayment = this.handleAddPayment.bind(this);
        this.handleEditPayment = this.handleEditPayment.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }

    componentDidMount() {
        this.props.action.getPaymentsAction()
            .catch(error => {
                toastr.error(error);
            });
    }

    handleAddPayment() {
        this.props.history.push('/payment');
    }

    handleEditPayment() {
        const selectedPaymentId = this.state.selectedPaymentId;

        if (selectedPaymentId) {
            this.setState({selectedPaymentId: undefined});
            this.props.history.push(`/payment/${selectedPaymentId}`);
        }
    }

    handleDelete() {
        const selectedPaymentId = this.state.selectedPaymentId;

        if (selectedPaymentId) {
            this.setState({selectedPaymentId: undefined});
            this.props.action.deletePaymentAction(selectedPaymentId)
                .catch(error => {
                    toastr.error(error);
                });
        }
    }

    handleFork() {
        //const selectedParentPaymentId = this.state.selectedPaymentId;
        this.props.history.push('/payment');
    }

    handleRowSelect(row, isSelected) {
        if (isSelected) {
            this.setState({
                selectedPaymentId: row.id,
            });
        }
    }

    render() {
        const { payments } = this.props;

        if (!payments) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Payments</h1>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleAddPayment}
                            >
                                <i className="fa fa-plus" aria-hidden="true"/> Add
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning ml-2"
                                onClick={this.handleEditPayment}
                            >
                                <i className="fa fa-pencil" aria-hidden="true"/> Edit
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger ml-2"
                                onClick={this.handleDelete}
                            >
                                <i className="fa fa-trash-o" aria-hidden="true" onClick={this.handleDelete}/> Delete
                            </button>

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleFork}
                                style={{ display: this.state.selectedPaymentId ? 'block' : 'none' }}
                            >
                                <i className="fa fa-plus" aria-hidden="true"/> Fork
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <PaymentList payments={payments} handleRowSelect={this.handleRowSelect}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    payments: state.paymentReducer.payments
});

const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(paymentAction, dispatch)
});

PaymentListContainer.propTypes = {
    payment: PropTypes.array,
    action: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentListContainer);
