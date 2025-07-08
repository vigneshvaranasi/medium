import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'
import { useAuth } from './useAuth'

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
  const { user } = useAuth()
  // console.log('user: ', user);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/blog/bulk`,{
        headers:{
            Authorization: `Bearer ${user?.token}`
        }
    }).then(response => {
      setBlogs(response.data.posts)
      setLoading(false)
    })
  },[])
  return { loading, blogs }
}
