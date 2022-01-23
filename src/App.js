import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// High order component
import PrivateRoute from './components/routes/PrivateRoute'
import PublicRoute from './components/routes/PublicRoute'

// Redux
import { Provider } from 'react-redux'
import store from './store'

// Auth
import tokenAuth from './config/tokenAuth'

// Componentes
import Register from './components/auth/register'
import Login from './components/auth/login'
import Dashboard from './components/dashboard'
//Category
import Category from './components/category'
import CreateCategory from './components/category/create'
import EditCategory from './components/category/edit'
//Provider
import ProductProvider from './components/provider'
import CreateProvider from './components/provider/create'
import EditProvider from './components/provider/edit'


const token = localStorage.getItem('Bearer')
if(token){
  tokenAuth(token)
}

function App() {
  return (
    <Fragment>
      <Router>
        <Provider store={store}>
            <Routes>
                
                <Route path="/" element={ <PrivateRoute/> }>
                  <Route exact path='/dashboard' element={<Dashboard/>}/>
                  <Route exact path='/category' element={<Category/>}/>
                  <Route exact path='/category/create' element={<CreateCategory/>}/>
                  <Route exact path='/category/edit/:id' element={<EditCategory />}/>

                  <Route exact path='/provider' element={<ProductProvider/>}/>
                  <Route exact path='/provider/create' element={<CreateProvider/>}/>
                  <Route exact path='/provider/edit/:id' element={<EditProvider />}/>
                </Route> 
                <Route path="/" element={ <PublicRoute/> }>
                  <Route path="/login" element={ <Login/> } />
                  <Route path="/register" element={ <Register/> } />
                </Route> 
            </Routes>
        </Provider>
      </Router>
    </Fragment>
  );
}

export default App;
