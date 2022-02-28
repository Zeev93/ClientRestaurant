import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getOrdersAction, editOrderAction, deleteOrderAction, showOrderAction } from "../../actions/orderActions";
import Table from '../ui/table'

const Order = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orders = useSelector( state => state.orders.orders )

    console.log(orders);
    
    useEffect(() => {
        dispatch(getOrdersAction())    
    }, [])

    const setEdit = (id) => {
        dispatch ( editOrderAction(id) )
        navigate(`edit/${id}`)
    }

    const deleteItem = ( id ) => {
        dispatch (deleteOrderAction(id))
    }

    const showItem = (id)=>{
        dispatch(showOrderAction(id))
        navigate(`show/${id}`)
    }
   

    
    const header = [
        {title: 'ID', field: 'id', cellStyle: { 'textAlign':'center', width: '20%' }, render: rowData => <p> #{ rowData.id } </p>}, 
        {title: 'SHIPPING NAME', field: 'shipping_name', cellStyle: { 'textAlign':'center', width: '20%'}},
        {title: 'SHIPPING STATE', field: 'shipping_state', cellStyle: { 'textAlign':'center', width: '20%'}},
        {title: 'SHIPPING CITY', field: 'shipping_city', cellStyle: { 'textAlign':'center', width: '20%'}},
        {title: 'SHIPPING ZIP', field: 'shipping_zip', cellStyle: { 'textAlign':'center', width: '20%'}},
        {title: 'TRACKING_NUMBER', field: 'tracking_number', cellStyle: { 'textAlign':'center', width: '20%'}},
        {title: 'PAYMENT', field: 'payment_method_id', cellStyle: { 'textAlign':'center', width: '20%'}},
        {title: 'TOTAL', field: 'total_cost', cellStyle: { 'textAlign':'center', width: '20%'}, render: rowData => <p> $ {rowData.total_cost}</p>},
    ]


    return ( 
        <>
        <div className="w-full flex">
            <Link to={'create'} className="ml-auto p-2 rounded m-2 bg-gray-700 uppercase text-white font-bold">Create</Link>
        </div>
            { orders && orders.length > 0 ? 
            <Table 
            header = {header} 
            body={orders} 
            title={'Orders'} 
            setEdit={setEdit} 
            deleteItem={deleteItem} 
            showItem={showItem}
            show={true}
            edit={false}
            del={true}
            /> : 
            <p className="text-2xl text-red-500 font-bold text-center uppercase"> No records found </p> }  
        </>
    );
}
 
export default Order;