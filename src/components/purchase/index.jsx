import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPurchasesAction, editPurchaseAction, deletePurchaseAction, showPurchaseAction } from "../../actions/purchaseActions";
import Table from '../ui/table'

const Purchase = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const purchases = useSelector( state => state.purchases.purchases )
    
    useEffect(() => {
        dispatch(getPurchasesAction())    
    }, [])

    const setEdit = (id) => {
        dispatch ( editPurchaseAction(id) )
        navigate(`edit/${id}`)
    }

    const deleteItem = ( id ) => {
        dispatch (deletePurchaseAction(id))
    }

    const showItem = (id)=>{
        dispatch(showPurchaseAction(id))
        navigate(`show/${id}`)
    }
   

    
    const header = [
        {title: 'ID', field: 'id', cellStyle: { 'textAlign':'center', width: '20%' }, render: rowData => <p> #{ rowData.id } </p>}, 
        {title: 'REALIZED', field: 'realized', cellStyle: { 'textAlign':'center', width: '20%'}},
        {title: 'DESCRIPTION', field: 'description', cellStyle: { 'textAlign':'center', width: '20%'}},
        {title: 'TOTAL', field: 'total', cellStyle: { 'textAlign':'center', width: '20%'}, render: rowData => <p> $ {rowData.total}</p>},
        {title: 'ITEMS', field: 'count', cellStyle: { 'textAlign':'center', width: '20%'}},
        {title: 'PAYMENT', field: 'payment', cellStyle: { 'textAlign':'center', width: '20%'}},
    ]


    return ( 
        <>
        <div className="w-full flex">
            <Link to={'create'} className="ml-auto p-2 rounded m-2 bg-gray-700 uppercase text-white font-bold">Create</Link>
        </div>
            { purchases && purchases.length > 0 ? 
            <Table 
            header = {header} 
            body={purchases} 
            title={'PURCHASES'} 
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
 
export default Purchase;