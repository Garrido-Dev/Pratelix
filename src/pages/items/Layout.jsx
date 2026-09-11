import { NavLink, Outlet, } from "react-router-dom";

export default function ItemsLayout(){


    return(
        <main>
            <h1>Stock Items</h1>
                <div className="tabs">

                    <NavLink to="/items"
                    end
                    className={({isActive})=> `tab ${isActive ? "active" : ""}`}
                    >Todos os itens</NavLink>

                    <NavLink to="/items/new"
                    className={({isActive})=> `tab ${isActive ? "active" : ""}`}
                    >Novo Item</NavLink>
            
                </div>
            <Outlet/>
        </main>
    )
}