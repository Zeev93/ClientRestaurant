import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrdersAction, editOrderAction, deleteOrderAction, showOrderAction } from "../../actions/orderActions";
import Table from '../ui/table'

const ShowOrder = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const order = useSelector( state => state.orders.showOrder )
    const products = useSelector( state => state.orders.showProducts )
  
    console.log(order)
    console.log(products)
    useEffect( () => {
        if(!order || products){
            dispatch(showOrderAction(params.id))
        }
        // setProvider(editProvider)
    }, [])

    
    return ( 
        <>
        
        <button type="button" onClick={ () => { navigate(-1) } } className="font-bold bg-gray-700 rounded p-3 text-white uppercase hover:bg-gray-300 hover:text-gray-700 text-center">Back</button>
        {order ? 
            <div className="grid grid-cols-3 gap-3 py-10 mx-10">
                <p className="text-gray-700"><span className="font-bold uppercase">Description:</span> { order.description} </p>
                <p className="text-gray-700"><span className="font-bold uppercase">Payment Method:</span> {order.payment} </p>
                <p className="text-gray-700"><span className="font-bold uppercase">Due on:</span> {order.realized} </p>
                <p className="text-gray-700"><span className="font-bold uppercase">Items bought:</span> {order.count} </p>
                <p className="text-gray-700"><span className="font-bold uppercase">Total:</span> $ {order.total} </p>
            </div>
        :
        ''
        }

        {products?
        
            <table className="table-auto w-full border-2">
                <thead>
                    <tr className="text-gray-700 font-bold uppercase">
                        <th>Name</th>
                        <th>Image</th>
                        <th>Invoice</th>
                        <th>Cost</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map( item => (
                    <tr className="text-center"> 
                        <td className="py-2 font-bold">{item.name}</td>
                        <td>{item.image}</td>
                        <td>{item.order_id}</td>
                        <td>$ {item.cost}</td>
                        <td>{item.amount}</td>
                    </tr>
                    ))}
                </tbody>
            </table>

            :
            ''
        }
        
        </>
    );
}
 
export default ShowOrder;