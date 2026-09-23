import { createContext, useState } from "react";


// eslint-disable-next-line react-refresh/only-export-components
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

  const deleteItem = (itemId)=>{
    setItems((currentState) =>{
      const updatedItems = currentState.filter(item=>item.id !== itemId)
      localStorage.setItem('obc-react-stock', JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  const getItem = (itemId)=>{
    return items.find(item => item.id === +itemId)
  }

  const updateItem = (updatedItem)=>{
    setItems((currentState) => {
      const itemIndex = currentState.findIndex((item) => item.id === +updatedItem.id)

      if (itemIndex === -1) {
        return currentState
      }

      const updatedItems = currentState.map((item) =>
        item.id === +updatedItem.id ? { ...item, ...updatedItem, updatedAt: new Date() } : item
      )

      localStorage.setItem("obc-react-stock", JSON.stringify(updatedItems))
      return updatedItems
    })
  }

const stock = {
    items,
    addItem,
    deleteItem,
    getItem,
    updateItem
}

  return (
    <StockContext.Provider value={stock}>
    {children}
    </StockContext.Provider>
  )
}