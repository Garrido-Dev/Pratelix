import { RouterProvider } from "react-router-dom";
import router from "./router";
import { StockContext } from "./contexts/StockContext.jsx";

export default function App() {
  return (
    <StockContext.Provider>
      <RouterProvider router={router} />
    </StockContext.Provider>
  );
}
