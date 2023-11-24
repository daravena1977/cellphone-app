import cellPhoneApi from '@/api/cellPhoneApi'

class AuthService {
    async login(user){
        return await cellPhoneApi
            .post('/signin', user)
            .then(response => {
                const { data } = response
                if (data.accessToken){
                    localStorage.setItem('user', JSON.stringify(data))
                    console.log('localStorage.setItem')
                }

                return data
            })
    }

    logout() {
        localStorage.removeItem('user')
    }

    register(user) {
        return cellPhoneApi.post('/signup', user)
    }


}

export default new AuthService()

