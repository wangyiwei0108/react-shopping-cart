import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Route, Link } from "react-router-dom";
import ProductsScreen from './screens/ProductsScreen';
import AdminScreen from './screens/AdminScreen';
import HomeScreen from './screens/HomeScreen';

class App extends React.Component {
    render () {
        return (  
            <Provider store={store}>
                <BrowserRouter>
                    <div className="container">
                        <header className="container__header">
                            <Link to="/">Store</Link>
                            <Link to="/products">Product</Link>
                            <Link to="/admin">Admin</Link>
                        </header>
                        <main className="container__main">
                            <Route path="/" component={HomeScreen} exact/>
                            <Route path="/admin" component={AdminScreen} />
                            <Route path="/products" component={ProductsScreen} />
                        </main>
                        <footer className="container__footer">
                            Sources of text and images are from <a href="https://www.isseymiyake.com/" target="_blank" rel="noreferrer">ISSEY MIYAKE</a>
                        </footer>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App;