import CredentialsProvider from "next-auth/providers/credentials";
import {getTokenRefreshed, login} from "@/services";
import {Autenticacao} from "@/class/Autenticacao";

async function refreshAccessToken(autenticacao: Autenticacao) {
    try {
        const response = await getTokenRefreshed(autenticacao.usuario.id)
            .then(res => {
                return res.data
            }).catch(error => {
                console.log('ERRO NO GET REFRESH TOKEN', error.message)
            })
        
        return {
            ...autenticacao,
            token: response.token,
            expira: response.expira
        }
        
    } catch (error) {
        console.log(error)
        
        return {
            ...autenticacao,
            error: "RefreshAccessTokenError",
        }
    }
}

export const nextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email:",
                    type: "email",
                    placeholder: "your-email",
                },
                password: {
                    label: "password:",
                    type: "password",
                    placeholder: "your-password",
                },
            },
            async authorize(credentials) {
                try {
                    const foundUser = await login(credentials?.email, credentials?.password)
                        .then(res => {
                            return res.data
                        }).catch((error) => {
                            console.log('Erro no login', error);
                        })
                    if (foundUser) {
                        return foundUser
                    } else {
                        return null
                    }
                } catch (error) {
                    console.log(error);
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/',
        signOut: '/'
    },
    callbacks: {
        async jwt({token, user, account}: any) {

            if (token.token) {
                const dataExpiracao = new Date(token.expira * 1000)
                const dataAtual = new Date()
                
                if (dataAtual < dataExpiracao) {
                    return token
                }
                
                return refreshAccessToken(new Autenticacao(
                    token.usuario,
                    token.token,
                    token.expira,
                    token.nomeUsuario
                )).then(res => {
                    return res
                }).catch(error => {
                    console.log('ERRO DO MÉTODO ->', error.message)
                })
                
            } else if (user) {
                return {...token, ...user}
            }
        },
        async session({ session, token }: any) {
            session.user = token as any;
            return session;
        },
    },
};
