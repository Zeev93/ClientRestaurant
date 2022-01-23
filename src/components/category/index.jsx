import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { getCategoriesAction, setEditCategoryAction, deleteCategoryAction } from "../../actions/categoryActions";
import Table from '../ui/table'

const Category = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categories = useSelector( state => state.categories.categories )
    
    useEffect(() => {
        dispatch(getCategoriesAction())    
    }, [])

    const setEdit = (id) => {
        dispatch ( setEditCategoryAction(id) )
        navigate(`edit/${id}`)
    }

    const deleteItem = ( id ) => {
        dispatch (deleteCategoryAction(id))
    }
   

    
    const header = [
        {title: 'ID', field: 'id', cellStyle: { width: '10%' }}, 
        {title: 'NAME', field: 'name', cellStyle: {width: '70%'}},
        {title: '', field:'',  cellStyle: { width: '20%' }}
    ]


    return ( 
        <>
        <div className='flex'>
            <Sidebar/>
            <div className="w-11/12 bg-gray-200">
                <Header/>

                <div className="content">
                    <div className="m-10 bg-white shadow border rounded-lg p-5">
                        <div className="w-full flex">
                            <Link to={'/category/create'} className="ml-auto p-2 rounded m-2 bg-gray-700 uppercase text-white font-bold">Create</Link>
                        </div>
                            { categories && categories.length > 0 ? <Table header = {header} body={categories} title={'Categories'} setEdit={setEdit} deleteItem={deleteItem} /> : 
                            <p className="text-2xl text-red-500 font-bold text-center uppercase"> No records found </p> }
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
 
export default Category;