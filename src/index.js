import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
// import reportWebVitals from './reportWebVitals';
import App from './App';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';

    // uri: 'http://localhost:5000'

const client = new ApolloClient({
    // link: new HttpLink({
    //     uri: 'https://graphql-api-merng.herokuapp.com/'
    // }),
    uri: 'https://graphql-api-merng.herokuapp.com/',
    connectToDevTools: true,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
