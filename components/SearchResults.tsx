import { useMemo } from "react"
import { ProductItem } from "./ProductItem"
import { List, AutoSizer, ListRowRenderer } from "react-virtualized";

interface SearchResultsProps {
  results: Array<{
    id: number,
    price: number,
    priceFormatted: string,
    title: string,
  }>,
  onAddToWishList: (id: number) => void,
  totalPrice: number,
}

export function SearchResults({results, onAddToWishList, totalPrice}: SearchResultsProps) {

  const rowRender: ListRowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <ProductItem 
        product={results[index]} 
        onAddToWishList={onAddToWishList}
        />
      </div>
    );
  }

  /*
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]);
  */

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List 
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRender}
      />

      {/*results.map(product => {
        return (
          <ProductItem 
            key={product.id} 
            product={product} 
            onAddToWishList={onAddToWishList}
          />
        )
      })*/}

    </div>
  )
}