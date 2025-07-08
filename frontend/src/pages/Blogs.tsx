import BlogCard from '../components/BlogCard'
import Navbar from '../components/Navbar'
import { useBlogs } from '../hooks/useBlogs'

function BlogCardSkeleton () {
  return (
    <div className='flex justify-center'>
      <div className='notosans border-b border-[#dfdfdf] p-4 w-screen max-w-screen-sm animate-pulse'>
        <div className='flex gap-1 text-lg items-center'>
          <div className={`flex flex-col justify-center mt-0.5`}>
            <div className='h-2.5 bg-gray-200 rounded-full w-3 mb-4 p-3'></div>
          </div>
          <div className='h-2.5 bg-gray-200 rounded-full w-20 md:w-50 mb-4'></div>
          <div className='h-2.5 bg-gray-200 rounded-full w-20 md:w-50 mb-4'></div>
          <div className={`flex flex-col justify-center`}>
            <div className='h-2.5 bg-gray-200 rounded-full w-full mb-4'></div>
          </div>
        </div>
        <div className='h-2.5 bg-gray-200 rounded-full w-full mb-4'></div>
        <div className='h-2.5 bg-gray-200 rounded-full w-full mb-4'></div>
        <div className='h-2.5 bg-gray-200 rounded-full w-full mb-4'></div>
        <div className='h-2 bg-gray-200 rounded-full w-50'></div>
      </div>
    </div>
  )
}

function Blogs () {
  const { loading, blogs } = useBlogs()
  if (loading) {
    return (
      <div>
        <Navbar />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </div>
    )
  }
  return (
    <div>
      <Navbar />
      <div className='flex justify-center'>
        <div className=''>
          {blogs.map(blog => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author ? blog.author.name : 'Anonymous'}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.publishedDate}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs
