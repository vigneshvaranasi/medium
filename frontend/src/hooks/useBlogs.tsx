import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'

export interface Blog {
    id: string
    title: string
    content: string
    author:{
        name: string
    }
    publishedDate: string
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    axios.get(`${BACKEND_URL}/blog/bulk`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    }).then(response => {
      setBlogs(response.data.posts)
      setLoading(false)
    })
  },[])
  return { loading, blogs }
}
