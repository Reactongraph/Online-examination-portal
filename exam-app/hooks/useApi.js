import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { useSelector } from 'react-redux'

const useApi = () => {
    const formatFilter = (filters) => {
        return Object.keys(filters).reduce((acc, filterKey) => {
            const [name, operator = 'eq'] = filterKey.split(':')
            return {
                ...acc,
                [name]: `${filters[filterKey]}:${operator}`,
            }
        }, {})
    }

    //Setup our API Resources
    const rest = (resource, params) => {
        const { page: currentPage, perPage } = params.pagination || {}
        const { field: sortBy, order: orderBy } = params.sort || {}
        const data = params.data
        return { data }
    }

    //   Get the data
    const get = async (resource, params = {}) => {
        return new Promise((resolve, reject) => {
            //Call the API
            api.get(resource)
                .then((res) => {
                    if (res?.status === 200) {
                        resolve(res)
                    } else if (res) {
                        // Error handle null response
                        reject(res)
                    }
                })
                .catch((e) => reject(e))
        })
    }

    const post = async (resource, params) => {
        const { data: inData } = rest(resource, params)

        //Post data
        const postData = await api.post(resource, params)

        return postData
    }
    return { get, post }
}

export default useApi
