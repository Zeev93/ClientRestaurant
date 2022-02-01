import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProductsAction, editProductAction, deleteProductAction } from "../../actions/productActions";
import Table from '../ui/table'

const Product = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const products = useSelector( state => state.products.products )
    
    useEffect(() => {
        dispatch(getProductsAction())    
    }, [])

    const setEdit = (id) => {
        dispatch ( editProductAction(id) )
        navigate(`edit/${id}`)
    }

    const deleteItem = ( id ) => {
        dispatch (deleteProductAction(id))
    }
   

    
    const header = [
        {title: 'ID', field: 'id', cellStyle: { 'textAlign':'center', width: '10%' }}, 
        {title: 'IMAGE', field: 'image', sorting: false, filtering: false, cellStyle: { 'textAlign':'center', width: '15%'}, render: rowData => <img className="rounded-md w-12 flex m-auto" src={rowData.image} />},
        {title: 'NAME', field: 'name', cellStyle: { 'textAlign':'center', width: '15%'}},
        {title: 'COST ($)', field: 'cost', cellStyle: { 'textAlign':'center', width: '10%'}, render: rowData => <p>$ {rowData.cost}</p>},
        {title: 'SALE PRICE ($)', field: 'price', cellStyle: { 'textAlign':'center', width: '10%'}, render: rowData => <p>$ {rowData.price}</p>},
        {title: 'STOCK', field: 'stock', cellStyle: { 'textAlign':'center', width: '10%'}, render: rowData => rowData.stock > rowData.minimal_stock ? <p className="text-green-500"> {rowData.stock} </p> : <p className="text-red-500">{rowData.stock}</p> },
        {title: 'MINIMAL STOCK', field: 'minimal_stock', cellStyle: { 'textAlign':'center', width: '10%'}},
        {title: 'CATEGORY', field: 'category_name', cellStyle: { 'textAlign':'center', width: '10%'}},
        {title: 'PROVIDER', field: 'provider_name', cellStyle: { 'textAlign':'center', width: '10%'}},
    ]


    return ( 
        <>
            { products && products.length > 0 ? 
            <Table 
                header = {header} 
                body={products} 
                title={'PRODUCTS'} 
                setEdit={setEdit} 
                deleteItem={deleteItem} 
                show={false}
                edit={false}
                del={true}
                showItem={''} /> : 
            <p className="text-2xl text-red-500 font-bold text-center uppercase"> No records found </p> }  
        </>
    );
}
 
export default Product;