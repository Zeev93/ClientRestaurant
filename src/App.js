import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Redux
import { Provider } from 'react-redux'
import store from './store'

// Auth
import tokenAuth from './config/tokenAuth'
import routes from './config/routes'

const token = localStorage.getItem('Bearer')

if(token){
  tokenAuth(token)
}

function App() {
  return (

      <BrowserRouter>
        <Provider store={store}>
            <Routes>
              { routes.map( (route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={ 
                          <route.layout>
                            <route.component />
                          </route.layout> 
                        }
                  />
                  )
                )
              }
            </Routes>
        </Provider>
      </BrowserRouter>
  );
}


export default App;
