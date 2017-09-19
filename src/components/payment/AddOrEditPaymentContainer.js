import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as paymentAction from '../../action/PaymentAction';
import PaymentForm from './PaymentForm';
import ChartsContainer from '../charts/ChartsContainer';

export class AddOrEditPaymentContainer extends Component {

    constructor() {
        super();
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.props.action.getPaymentAction(this.props.match.params.id)
            .catch(error => {
                toastr.error(error);
            });
    }

    handleSave(values) {
        const payment = {
            id: values.id,
            title: values.title,
            category: values.category,
            count: "$" + values.count
        };

        this.props.action.savePaymentAction(payment)
            .then(() => {
                toastr.success('Payment saved');
                this.props.history.push('/payments');
            }).catch(error => {
                toastr.error(error);
            });
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.replace('/payments');
    }

    render() {
        const { initialValues } = this.props;
        const heading = initialValues && initialValues.id ? 'Edit' : 'Add';
        // const chartData = payment.count;

        return (
            <div className="container">
                <PaymentForm
                    heading={heading}
                    handleSave={this.handleSave}
                    handleCancel={this.handleCancel}
                    initialValues={this.props.initialValues}
                />
                <ChartsContainer />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const paymentId = ownProps.match.params.id;

    if (paymentId && state.selectedPaymentReducer.payment && paymentId === state.selectedPaymentReducer.payment.id) {
        return {
            initialValues: state.selectedPaymentReducer.payment,
        };
    }
};

const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(paymentAction, dispatch)
});

AddOrEditPaymentContainer.propTypes = {
    action: PropTypes.object.isRequired,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    match: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditPaymentContainer);
