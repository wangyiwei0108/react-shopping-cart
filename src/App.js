import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { HashRouter, Route, Link } from "react-router-dom";
import ProductsScreen from './screens/ProductsScreen';
import AdminScreen from './screens/AdminScreen';

class App extends React.Component {
    render () {
        return (  
            <Provider store={store}>
                <HashRouter>
                    <div className="container">
                        <header className="container__header">
                            <Link to="/">Product</Link>
                            <Link to="/admin">Admin</Link>
                        </header>
                        <main className="container__main">
                            <Route path="/" component={ProductsScreen} exact/>
                            <Route path="/admin" component={AdminScreen} />
                        </main>
                        <footer className="container__footer">
                            <a href="https://www.isseymiyake.com/" target="_blank" rel="noreferrer">ISSEY MIYAKE</a>
                        </footer>
                    </div>
                </HashRouter>
            </Provider>
        )
    }
}

export default App;