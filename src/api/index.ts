import axios, { AxiosResponse } from 'axios'
import { ResTestsType } from './types'

const instance = axios.create({
  baseURL: 'https://opentdb.com/',
  withCredentials: false
})

export const testsAPI = {
  getTests(amount: number) {
    return instance.get('api.php', { params: { amount } }).then((res: AxiosResponse<ResTestsType>) => res.data)
  }
}
