import { axiosWithAuth } from '@/api/interceptors'
import { IAnketRequest } from '@/types/anket.types'

class AnketService {
  async createAnket(data: IAnketRequest) {
    const response = await axiosWithAuth.post<IAnketRequest>('/profile', data)
    return response.data
  }

  async getAnket() {
    const response = await axiosWithAuth.get('/profile')
    return response.data
  }
}

export const anketService = new AnketService()