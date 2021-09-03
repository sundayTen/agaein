import Input from 'components/Input';
import React, { ChangeEvent, useContext, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import NavBar from 'components/NavBar';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
const Home = ({ history }: RouteComponentProps) => {
    const theme = useContext(ThemeContext);
    // TODO : DELETE - For Input Component Test
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState<string>();

    const _setInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const client = new ApolloClient({
        uri: 'https://48p1r2roz4.sse.codesandbox.io',
        cache: new InMemoryCache()
    });
    
    client
    .query({
    query: gql`
        query GetRates {
        rates(currency: "USD") {
            currency
        }
        }
    `})
    .then(result => console.log(result));

    
    return (
        <div style={{ backgroundColor: theme.light.background }}>
            <NavBar/>
            <h1>홈 페이지</h1>
            <Input ref={inputRef} value={inputValue} onChange={_setInputValue} />
            <button onClick={() => history.push('/createArticle/test')}>페이지 이동</button>
        </div>
    );
};

export default Home;
