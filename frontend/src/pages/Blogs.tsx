import { useEffect } from 'react'
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
  const {  initialLoading, loadingMore, blogs, hasMore, loadMoreBlogs } = useBlogs()

  useEffect(() => {
    const debounce = (func: (...args: any[]) => void, delay: number) => {
      let timeout: ReturnType<typeof setTimeout> | undefined = undefined
      return (...args: any[]) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), delay)
      }
    }

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreBlogs()
      }
    }

    const debouncedHandleScroll = debounce(handleScroll, 200)
    window.addEventListener('scroll', debouncedHandleScroll)
    return () => window.removeEventListener('scroll', debouncedHandleScroll)
  }, [loadMoreBlogs])


  if (initialLoading) {
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
              authorId={blog.author.id}
              publishedDate={blog.publishedDate}
            />
          ))}
          {loadingMore && 
          <div>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </div>
          }
          {!hasMore && (
            <div className='text-center text-gray-500 my-4'>
              No more blogs to load
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blogs
