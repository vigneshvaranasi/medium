import { Link } from 'react-router-dom'
import mediumLogo from '../assets/mediumLogo.png'
import { Avatar } from './BlogCard'
function Navbar() {
  return (
    <div className='flex justify-between items-center py-3 px-10 border-b-2 border-[#dfdfdf]'>
      <Link to={'/blogs'}>
        <img src={mediumLogo} alt="medium-logo" className='w-30' />
      </Link>
        <Avatar
        authorName='Vignesh Varanasi'
        size={5}
        />
    </div>
  )
}

export default Navbar