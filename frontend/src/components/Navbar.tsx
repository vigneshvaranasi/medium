import { Link } from 'react-router-dom'
import mediumLogo from '../assets/mediumLogo.png'
import { Avatar } from './BlogCard'
import { useAuth } from '../hooks/useAuth'
function Navbar () {
  const { authStatus } = useAuth()
  // console.log('authStatus: ', authStatus);
  return (
    <div className='flex justify-between items-center py-5 px-10 border-b-2 border-[#dfdfdf]'>
      <Link to={'/'}>
        <img src={mediumLogo} alt='medium-logo' className='w-30' />
      </Link>
      {
        authStatus &&
        <div className='flex items-center gap-4'>
          <Link
            to={'/newBlog'}
            className='bg-black text-white px-3 rounded-md hover:bg-gray-800 transition-colors'
          >
            New Blog
          </Link>
          <Avatar authorName='Vignesh Varanasi' size={8} />
        </div>
      }
    </div>
  )
}

export default Navbar
