import { Request, Response } from 'express'
import { UserType } from '../types/types'
import ResponseDTO from '../dtos/ResponseDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import AuthServices from '../services/AuthServices'

class AuthControllers {
    async register(req: Request, res: Response) {
        const avatar =
            'https://i.ytimg.com/vi/U-FcMQQQJT0/maxresdefault.jpg'
        const banner =
            'https://img.freepik.com/free-vector/realistic-neon-lights-background_23-2148907367.jpg'
        const { username, email, name, password, bio } = req.body

        const { error, payload }: ServiceResponseDTO<UserType> = await AuthServices.register({
            username,
            email,
            name,
            password,
            avatar,
            banner,
            bio: bio ? bio : null,
        })

        if (error) {
            return res.status(500).json(
                new ResponseDTO<null>({
                    error,
                    message: payload,
                    data: null,
                })
            )
        }

        delete payload.password
        return res.status(200).json(
            new ResponseDTO<UserType>({
                error,
                message: {
                    status: 'User created!',
                },
                data: payload,
            })
        )
    }

    async login(req: Request, res: Response) {
        const { username, password } = req.body

        const { error, payload }: ServiceResponseDTO<string> = await AuthServices.login({
            username,
            password,
        })

        if (error) {
            return res.status(500).json(
                new ResponseDTO<null>({
                    error,
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDTO<string>({
                error,
                message: {
                    status: 'User logged in!',
                },
                data: {
                    token: payload,
                },
            })
        )
    }

    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body

        const { error, payload }: ServiceResponseDTO<string> = await AuthServices.forgotPassword({
            email,
        })

        if (error) {
            return res.status(500).json(
                new ResponseDTO<null>({
                    error,
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDTO<UserType>({
                error,
                message: {
                    status: 'Ready to reset password!',
                },
                data: {
                    token: payload,
                },
            })
        )
    }

    async resetPassword(req: Request, res: Response) {
        const requester = res.locals.user
        const { password } = req.body

        const { error, payload }: ServiceResponseDTO<string> = await AuthServices.resetPassword({
            email: requester.email,
            password,
        })

        if (error) {
            return res.status(500).json(
                new ResponseDTO<null>({
                    error,
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDTO<string>({
                error,
                message: {
                    status: 'Password changed!',
                },
                data: {
                    token: payload,
                },
            })
        )
    }
}

export default new AuthControllers()
