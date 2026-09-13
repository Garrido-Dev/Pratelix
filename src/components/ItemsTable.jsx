import { Link } from 'react-router-dom'
import useStock from '../hooks/useStock'

export default function ItemsTable(){

    const {items}= useStock()

    return(
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Em Estoque</th>
                    <th>categoria</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.category}</td>
                        <td>
                            <Link to={`/items/${item.id}`} className='button is-primary is-small'>Ver</Link>
                            <Link to={`/items/${item.id}/update`} className="button is-small"></Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}