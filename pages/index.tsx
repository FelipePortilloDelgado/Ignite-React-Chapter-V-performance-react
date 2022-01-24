import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react';
import { SearchResults } from '../components/SearchResults';

type Results = {
  totalPrice: number,
  data: any[],
} 

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if(!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const products = data.map((product: any) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      }
    });

    const totalPrice = data.reduce((total: number, product: any) => {
      return total + product.price;
    }, 0);

    setResults({totalPrice, data: products});
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type='text' 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type='submit'>Buscar</button>
      </form>

      <SearchResults 
        results={results.data} 
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}
      />
    </div>
  )
}

export default Home


/**
 * 1. Cria uma nova versão do componente
 * 2. Compara com a versão anterior
 * 3. Se houverem alterações, vai atualizar o que alterou
 */

/**
 * Quando usar o memo
 * 1. Pure Functional Components
 * 2. Rendes too often
 * 3. Re-renders with same props
 * 4. Medium to big size
 */

/**
 * useMemo - Quando usar
 * Usado para salvar valor
 * 1. Cálculos pesados
 * 2. Igualdade referencial (quando a gente repassa aquela informação a um componente filho)
 */

/**
 * useCallback - Quando usar
 * Usado para salvar função
 */