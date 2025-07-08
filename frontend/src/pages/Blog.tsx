import { useBlog } from '../hooks/useBlog'
import { useParams } from 'react-router-dom'
import { Avatar } from '../components/BlogCard'
import Navbar from '../components/Navbar'
import { formatDate } from '../utils/dateFormat'

function Blog () {
  const { id } = useParams<{ id: string }>()
  if (!id) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Blog ID not found
      </div>
    )
  }
  const { loading, blog } = useBlog(id)
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    )
  }
  if (!blog) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Blog not found
      </div>
    )
  }
  return (
    <div>
      <Navbar/>
      <div className='grid grid-cols-12 px-6 lg:px-12 mt-10 gap-4'>
        <div className='notosans mx-auto col-span-12 lg:col-span-8'>
          <h1 className='text-3xl font-bold mb-2'>{blog.title}</h1>
          <p className='text-xs text-[#797979] my-2'>
            Posted on {formatDate(blog.publishedDate)}
          </p>
          <p className='text-md text-[#6b6b6b] mb-4 text-justify'>{blog.content}</p>
        </div>
        <div className='col-span-12 mb-4 lg:col-span-4'>
          <p className='text-md font-semibold mb-1 text-[#0f0f0f]'>
            Author
          </p>
          <div className='flex items-center gap-1'>
            <Avatar
              authorName={blog.author.name}
              size={4}
            />
            <h1 className='text-lg font-bold'>{blog.author.name}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
