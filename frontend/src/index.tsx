import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './Routes';

const client = new ApolloClient({
  uri: GQL_URL,
  credentials: 'include', // or 'same-origin'
});

const App = hot(module)(() => (
  <ApolloProvider client={client}>
    <Router>
      <Routes />
    </Router>
  </ApolloProvider>
));

render(<App />, document.getElementById('root'));
