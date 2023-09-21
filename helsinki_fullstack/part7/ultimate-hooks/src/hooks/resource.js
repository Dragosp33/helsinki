import { useState, useEffect } from "react"
import axios from 'axios'

export const useResource = (baseUrl) => {

    const [resources, setResources] = useState([])
    useEffect(() => {
        async function fetchdata() {
            const request =  await axios.get(baseUrl)
            console.log(request.data)
            setResources(request.data)
        }
        fetchdata() },
        [baseUrl],
      );

    const fetchData = async (baseUrl) => {
        const request =  await axios.get(baseUrl)
        setResources(request.data)
    }
  
    const create = async (resource) => {
        const request =  await axios.post(baseUrl, resource)
        const response = request.data
        setResources(resources.concat(response))
    }
  
    const service = {
      fetchData, create
    }

    return [
      resources, service
    ]
  }