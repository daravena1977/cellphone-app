import cellPhoneApi from '@/api/cellPhoneApi'
import tokenService from './token-service'

class AuthService {
    async login(user){
        return await cellPhoneApi
            .post('/signin', user)
            .then(response => {
                const { data } = response
                if (data.accessToken){
                    tokenService.setUser(response.data)
                }

                return data
            })
    }

    logout() {
        tokenService.removeUser()
    }

    async register(user) {
        return await cellPhoneApi.post('/signup', user)
    }
}

export default new AuthService()

