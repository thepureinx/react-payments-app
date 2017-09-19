import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from './common/PageNotFound';
import Home from './landing/Home';
import PaymentListContainer from './payment/PaymentListContainer';
import AddOrEditPaymentContainer from './payment/AddOrEditPaymentContainer';
import createBrowserHistory from 'history/createBrowserHistory';
import HeaderNavContainer from './landing/HeaderNavContainer';

const history = createBrowserHistory();

const App = () => {
    return (
        <div >
            <Router history={history}>
                <div>
                    <HeaderNavContainer />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/payments" component={PaymentListContainer} />
                        <Route exact path="/payment" component={AddOrEditPaymentContainer} />
                        <Route path="/payment/:id" component={AddOrEditPaymentContainer} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
