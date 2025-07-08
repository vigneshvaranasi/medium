import BlogCard from '../components/BlogCard'
import Navbar from '../components/Navbar'
import { useBlogs } from '../hooks/useBlogs'

function Blogs () {
  const {loading,blogs} = useBlogs()
  if (loading) {
    return <div className='flex justify-center items-center h-screen'>Loading...</div>
  }
  return (
    <div>
      <Navbar />
      <div className='flex justify-center'>
        <div className=''>
          {
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={
                  blog.author ? blog.author.name : 'Anonymous'
                }
                title={blog.title}
                content={blog.content}
                publishedDate={"2023-10-01T12:00:00Z"}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Blogs
