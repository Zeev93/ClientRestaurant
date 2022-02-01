import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSalesAction, editSaleAction, deleteSaleAction, showSaleAction } from "../../actions/saleActions";
import Table from '../ui/table'

const Sale = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sales = useSelector( state => state.sales.sales )
    
    useEffect(() => {
        dispatch(getSalesAction())    
    }, [])

    const setEdit = (id) => {
        dispatch ( editSaleAction(id) )
        navigate(`edit/${id}`)
    }

    const deleteItem = ( id ) => {
        dispatch (deleteSaleAction(id))
    }

    const showItem = (id)=>{
        dispatch(showSaleAction(id))
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
            <Link to={'/sale/create'} className="ml-auto p-2 rounded m-2 bg-gray-700 uppercase text-white font-bold">Create</Link>
        </div>
            { sales && sales.length > 0 ? 
            <Table 
            header = {header} 
            body={sales} 
            title={'Sales'} 
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
 
export default Sale;