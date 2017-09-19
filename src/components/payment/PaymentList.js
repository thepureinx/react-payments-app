import React, { PropTypes, Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const getCaret = direction => {
    if (direction === 'asc') {
        return (
            <span> <i className="fa fa-sort-asc" aria-hidden="true"/></span>
        );
    }

    if (direction === 'desc') {
        return (
            <span> <i className="fa fa-sort-desc" aria-hidden="true"/></span>
        );
    }

    return (
        <span> <i className="fa fa-sort" aria-hidden="true" /></span>
    );
};

class PaymentList extends Component {

    constructor(props) {
        super(props);

        this.options = {
            sortIndicator: true,
            noDataText: 'No data'
        };

        this.selectRowProp = {
            mode: 'radio',
            bgColor: '#b1d5d8',
            onSelect: props.handleRowSelect,
            clickToSelect: true,
            hideSelectColumn: true
        };
    }

    render() {

        return (
            <BootstrapTable data={this.props.payments}  selectRow={this.selectRowProp}  options={this.options} bordered={false} striped hover condensed>
                <TableHeaderColumn dataField="id" isKey hidden>Id</TableHeaderColumn>

                <TableHeaderColumn
                    dataField="title"
                    dataSort={true}
                    caretRender={getCaret}
                    filter={{type: 'TextFilter', delay: 0 }}
                    columnTitle
                >
                    Title
                </TableHeaderColumn>

                <TableHeaderColumn
                    dataField="category"
                    dataSort={true}
                    caretRender={getCaret}
                    filter={{type: 'TextFilter', delay: 0 }}
                    columnTitle
                >
                    Category
                </TableHeaderColumn>
                
                <TableHeaderColumn
                    dataField="count"
                    dataSort={true}
                    caretRender={getCaret}
                    columnTitle
                >
                    Count
                </TableHeaderColumn>

            </BootstrapTable>
        );
    }

}

PaymentList.propTypes = {
    payments: PropTypes.array.isRequired,
    handleRowSelect: PropTypes.func.isRequired
};

export default PaymentList;
