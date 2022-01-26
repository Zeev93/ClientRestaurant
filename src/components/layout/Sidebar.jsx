import { Link } from "react-router-dom";

const Sidebar = () => {
    return ( 
        <aside className='min-h-screen w-64 shadow flex-col justify-between hidden sm:flex bg-gray-700'>
            <ul className='my-12'>
                <Link to={'/dashboard'}><li className='text-white font-bold py-2 text-center uppercase shadow'>Dashboard</li></Link>
                <Link to={'/category'}><li className='text-white font-bold py-2 text-center uppercase shadow'>Category</li></Link>
                <Link to={'/product'}><li className='text-white font-bold py-2 text-center uppercase shadow'>Product</li></Link>
                <Link to={'/provider'}><li className='text-white font-bold py-2 text-center uppercase shadow'>Provider</li></Link>

                <Link to={'/purchase'}><li className='text-white font-bold py-2 text-center uppercase shadow'>Purchase</li></Link>
                <Link to={'/sale'}><li className='text-white font-bold py-2 text-center uppercase shadow'>Sales</li></Link>
            </ul>
        </aside>
     );
}
 
export default Sidebar;