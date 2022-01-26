import {
    CREATE_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    VIEW_CATEGORIES,
    VIEW_CATEGORIES_SUCCESS,
    VIEW_CATEGORIES_ERROR,
    DELETE_CATEGORY,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    EDIT_CATEGORY,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_ERROR,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_ERROR,
} from '../types'
import clientAxios from '../config/axios'
import Swal from 'sweetalert2'


// Create 

export function createNewCategoryAction(category){
    return dispatch => {
        // Change state
        dispatch(addCategory())
        // API
        clientAxios.post('categories', category)
        .then( response => {
            dispatch(addCategorySuccess(response.data.category))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your category has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch( error => {
            dispatch(addCategoryError(error.response.data))
        }) 
    }
}

const addCategory = () => ({
    type: CREATE_CATEGORY,
    payload: true
})

const addCategorySuccess = payload => ({
    type: CREATE_CATEGORY_SUCCESS,
    payload
})

const addCategoryError = payload => ({
    type: CREATE_CATEGORY_ERROR,
    payload
}) 


// all categories

export function getCategoriesAction(){
    return async (dispatch) => {
        dispatch (getCategories())
        await clientAxios.get('/categories')
        .then( response => {
            dispatch(getCategoriesSuccess(response.data.categories))
        })
        .catch(error => {
            dispatch(getCategoriesError(error.response.data))
        })
    }
}

const getCategories = () => ({
    type: VIEW_CATEGORIES,
    payload: true
})

const getCategoriesSuccess = payload => ({
    type: VIEW_CATEGORIES_SUCCESS,
    payload
})

const getCategoriesError = payload => ({
    type: VIEW_CATEGORIES_ERROR,
    payload
})


// Get EDIT

export function editCategoryAction(id) {
    return async (dispatch) => {
        dispatch(editCategory())
        await clientAxios.get(`/categories/${id}/edit`)
        .then(response =>{
            dispatch(editCategorySuccess(response.data.category))
        })
        .catch( error => {
            editCategoryError(error.response.data)
        })
    }
}


const editCategory = () => ({
    type: EDIT_CATEGORY,
    payload: true
})

const editCategorySuccess = payload => ({
    type: EDIT_CATEGORY_SUCCESS,
    payload
})

const editCategoryError = payload => ({
    type: EDIT_CATEGORY_ERROR,
    payload: payload
})


// Update Category

export function updateCategoryAction(category){
    return async dispatch => {
        dispatch(updateCategory())
        await clientAxios.put(`/categories/${category.id}`, category)
        .then( response => {
            dispatch(updateCategorySuccess(response.data.category))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your category has been updated',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch( error => {
            dispatch(updateCategoryError(error.response.data))
        })
    }
}

const updateCategory = () => ({
    type: UPDATE_CATEGORY,
    payload: true
})

const updateCategorySuccess = payload => ({
    type: UPDATE_CATEGORY_SUCCESS,
    payload
})

const updateCategoryError = payload => ({
    type: UPDATE_CATEGORY_ERROR,
    payload
})


export function deleteCategoryAction(id){
    return async dispatch => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCategory(id))        
                clientAxios.delete(`/categories/${id}`)
                .then( response => {
                    dispatch(deleteCategorySuccess(response.data.category))
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                })
                .catch( error => {
                    dispatch(deleteCategoryError(error.response.data.message))
                    Swal.fire(
                        'Error!',
                        'Your file could not be deleted.',
                        'error'
                      )
                })
            }
          })
        
    }
}

const deleteCategory = payload => ({
    type: DELETE_CATEGORY,
    payload
})

const deleteCategorySuccess = payload => ({
    type: DELETE_CATEGORY_SUCCESS,
    payload
})

const deleteCategoryError = payload => ({
    type: DELETE_CATEGORY_ERROR,
    payload
})