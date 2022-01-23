import React from 'react';

import Sidebar from '../layout/Sidebar'
import Header from '../layout/Header'

const Dashboard = () => {
    return ( 
        <>
            <div className='flex'>
                <Sidebar/>
                <div className="w-11/12 bg-gray-200">
                    <Header/>
                    <div className="content">
                        
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Dashboard;