import Table from '../ui/table'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

import {getProvidersAction, editProviderAction, deleteProviderAction} from '../../actions/providerActions'


const ProductProvider = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const providers = useSelector(state => state.providers.providers)

    const header = [
        {title: 'ID', field: 'id', cellStyle: { 'textAlign':'center', width: '10%' }}, 
        {title: 'NAME', field: 'name', cellStyle: { 'textAlign':'center', width: '20%'}},
        {title: 'E-MAIL', field:'email',  cellStyle: { 'textAlign':'center', width: '20%' }},
        {title: 'PHONE', field:'phone',  cellStyle: { 'textAlign':'center', width: '20%' }},
        {title: 'ADDRESS', field:'address',  cellStyle: { 'textAlign':'center', width: '30%' }},
    ]

    useEffect(() => {
        dispatch(getProvidersAction())
        // eslint-disable-next-line
    }, [])

    const setEdit = (id) => {
        dispatch ( editProviderAction(id) )
        navigate(`edit/${id}`)
    }

    const deleteItem = (id) => {
        dispatch (deleteProviderAction(id))
    }

    return ( 
        <>
        <div className='flex'>
            <Sidebar/>
            <div className="w-11/12 bg-gray-200">
                <Header/>

                <div className="content">
                    <div className="m-10 bg-white shadow border rounded-lg p-5">
                        <div className="w-full flex">
                            <Link to={'/provider/create'} className="ml-auto p-2 rounded m-2 bg-gray-700 uppercase text-white font-bold">Create</Link>
                        </div>
                        { providers && providers.length > 0 ? 
                        <Table 
                        header={header} 
                        body={providers} 
                        title={'PROVIDERS'} 
                        setEdit={setEdit} 
                        deleteItem={deleteItem}
                        showItem={''}
                        show={false}
                        edit={true}
                        del={true} /> : 
                        <p className="text-2xl text-red-500 font-bold text-center uppercase"> No records found </p>}
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default ProductProvider;