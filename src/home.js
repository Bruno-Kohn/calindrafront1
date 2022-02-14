import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [searchProduct, setSearchProduct] = useState('');
  const [infos, setInfos] = useState('');

  function searchProductRequest() {
    const req = axios.get(
      `https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=${searchProduct}&source=nanook`
    );
    req.then((resp) => {
      setInfos(resp.data);
      console.log(resp.data);
    });
    req.catch((error) => console.log(error));
  }

  return (
    <Container>
      <SearchBar
        type='text'
        placeholder='What are you looking for?'
        onChange={(e) => setSearchProduct(e.target.value)}
      ></SearchBar>
      <CepButton onClick={() => searchProductRequest()}>Send</CepButton>
      <Card>
        {infos === '' ? (
          <h1>Type a product name and press the 'send' button 😀</h1>
        ) : infos.products ? (
          infos.products.map((i) => (
            <ProductCard>
              <h1>Product: {i.name}</h1>
              <h1>SKU: {i.id}</h1>
            </ProductCard>
          ))
        ) : (
          <h1>Please, type a valid CEP code</h1>
        )}
      </Card>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(63, 94, 251);
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 0%,
    rgba(70, 252, 232, 1) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 0;
`;

const SearchBar = styled.input`
  width: 480px;
  height: 40px;
  border-radius: 8px;
  border: none;
  padding-left: 20px;
`;

const CepButton = styled.button`
  width: 500px;
  height: 40px;
  border-radius: 8px;
  border: none;
  margin-top: 20px;
  cursor: pointer;
`;

const Card = styled.div`
  width: 500px;
  min-height: 150px;
  height: auto;
  margin-top: 20px;
  border-radius: 8px;
  border: none;
  background: rgba(168, 251, 63, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const ProductCard = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: none;
  background: rgba(255, 213, 128, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  h1 {
    margin: 10px;
    font-size: 18px;
  }
`;
