import { useEffect, useState } from "react"
import type { Blog } from "./useBlogs"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const useBlog = (id:string)=>{
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>()

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/blog/id/${id}`, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(response => {
            setBlog(response.data.post)
            setLoading(false)
        })
    },[id])
    return { loading, blog }
}