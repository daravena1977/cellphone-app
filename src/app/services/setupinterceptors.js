import cellPhoneApi from '@/api/cellPhoneApi'
import TokenService from './token-service'

const setup = (store) => {
    cellPhoneApi.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken()
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }        
    )

    cellPhoneApi.interceptors.response.use(
        (res) => {
            return res
        },
        async (err) => {
            const originalConfig = err.config
            console.log(err.config)

            if (originalConfig !== "/signin" && err.response) {
                //Access Token was expired
                console.log('pasas por el response del interceptor')
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true

                    try {
                        console.log('paso por el refresh')
                        console.log(store)
                        
                        const rs = await cellPhoneApi.post('/refreshtoken', {refreshToken: TokenService.getLocalRefreshToken()})


                        const { accessToken } = rs.data
                        await store.dispatch('auth/refreshToken', accessToken)
                        TokenService.updateLocalAccessToken(accessToken)

                        return cellPhoneApi(originalConfig)
                    } catch (_error) {
                        console.log('Refresh token failed', _error)
                        await store.dispatch('auth/logout')
                        return Promise.reject(_error)
                    }
                }
            }
            return Promise.reject(err)
        }
    )
}

export default setup