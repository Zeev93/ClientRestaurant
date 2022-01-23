import { Link } from 'react-router-dom';


const Header = () => {
    return ( 
        <nav className='bg-white py-3 px-2 flex shadow w-full '>
            <Link to={'/'} className='text-gray-700 font-bold uppercase'> AbrahamAG-CRM </Link>

            <span className='ml-auto text-gray-700 font-bold uppercase'> Abraham </span>
            <Link className='mx-5 text-gray-700 font-bold uppercase' to={''}> Log out </Link>
        </nav>
     );
}
 
export default Header;