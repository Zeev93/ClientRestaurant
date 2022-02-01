import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPurchasesAction, editPurchaseAction, deletePurchaseAction, showPurchaseAction } from "../../actions/purchaseActions";
import Table from '../ui/table'

const ShowPurchase = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const purchase = useSelector( state => state.purchases.showPurchase )
    const products = useSelector( state => state.purchases.showProducts )
  
    console.log(purchase)
    console.log(products)
    useEffect( () => {
        if(!purchase || products){
            dispatch(showPurchaseAction(params.id))
        }
        // setProvider(editProvider)
    }, [])

    
    return ( 
        <>
        
        <Link to={'/admin/purchase'} className="font-bold bg-gray-700 rounded p-3 text-white uppercase hover:bg-gray-300 hover:text-gray-700 text-center">Back</Link>
            {purchase ? 
                <div className="grid grid-cols-3 gap-3 py-10 mx-10">
                    <p className="text-gray-700"><span className="font-bold uppercase">Description:</span> { purchase.description} </p>
                    <p className="text-gray-700"><span className="font-bold uppercase">Payment Method:</span> {purchase.payment} </p>
                    <p className="text-gray-700"><span className="font-bold uppercase">Due on:</span> {purchase.realized} </p>
                    <p className="text-gray-700"><span className="font-bold uppercase">Items bought:</span> {purchase.count} </p>
                    <p className="text-gray-700"><span className="font-bold uppercase">Total:</span> $ {purchase.total} </p>
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
                            <td>{item.purchase_id}</td>
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
 
export default ShowPurchase;