import { useEffect, useState } from "react"
import type { Blog } from "./useBlogs"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useAuth } from "./useAuth"

export const useBlog = (id:string)=>{
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>()
    const {user} = useAuth()

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/blog/id/${id}`, {
            headers:{
                Authorization: `Bearer ${user?.token}`
            }
        }).then(response => {
            setBlog(response.data.post)
            setLoading(false)
        })
    },[id])
    return { loading, blog }
}