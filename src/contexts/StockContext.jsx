import { createContext, useState } from "react";


export const StockContext = createContext({});

// { name, description, quantity, price, category, createdAt, updatedAt}
export function StockContextProvider({ children }) {

  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("obc-react-stock");
    if (!storedItems) return [];
    const items = JSON.parse(storedItems);
    items.forEach((item) => {
        item.createdAt = new Date(item.createdAt)
        item.updatedAt = new Date(item.updatedAt)
    });
    return items;
  });

  const addItem = (item)=>{
    setItems(currentState => {
        const updatedItems = [item, ...currentState]
        localStorage.setItem("obc-react-stock", JSON.stringify(updatedItems))
        return updatedItems
    }) 
  }
const stock = {
    items,
    addItem
}

  return (
  <StockContext.Provider value={stock}>
    {children}
    </StockContext.Provider>
  )
}