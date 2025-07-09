import { useAuth } from '../hooks/useAuth'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/dateFormat'
import { useParams } from 'react-router-dom'

interface Blog {
  id: string
  title: string
  content: string
  publishedDate: string
  authorId: string
}

interface UserInfo {
  id: string
  name: string
  email: string
  avatarLetter: string
  blogs?: Blog[]
}

function Profile () {
  const { user } = useAuth()
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await axios.get(`${BACKEND_URL}/user/profile?id=${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })
      console.log('res: ', res)
      if (res.data.user) {
        setUserInfo(res.data.user)
      } else {
        console.error('Failed to fetch user info')
      }
    }
    fetchUserInfo()
  }, [])

  if (!userInfo) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading user info...
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className='flex flex-col items-center mt-10'>
        <div className='flex flex-col items-center'>
          <div className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold'>
            {userInfo.avatarLetter}
          </div>
          <h1 className='text-2xl font-bold mt-4'>{userInfo.name}</h1>
          <p className='text-gray-600'>{userInfo.email}</p>
        </div>

        <div className='mt-10 w-full max-w-4xl px-4'>
          <h2 className='text-xl font-bold mb-4'>My Blogs</h2>
          {userInfo.blogs && userInfo.blogs.length > 0 ? (
            userInfo.blogs.map(blog => (
              <Link
                to={`/blog/${blog.id}`}
                key={blog.id}
              >
                <div key={blog.id} className='border-b border-gray-200 py-4'>
                  <h3 className='text-lg font-semibold'>{blog.title}</h3>
                  <p className='text-gray-600'>
                    {blog.content.slice(0, 100)}...
                  </p>
                  <p className='text-sm text-gray-500'>
                    Published on{' '}
                    {
                        formatDate(blog.publishedDate)
                    }
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className='text-gray-600'>No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
