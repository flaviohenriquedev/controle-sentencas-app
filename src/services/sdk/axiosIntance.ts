import axios from "axios";
import {getSession} from 'next-auth/react';

async function getToken() {
    const session: any = await getSession();
    if (session) {
        return session.user.token;
    } else {
        return null;
    }
}

const endpoints = {
    production: "https://controle-sentencas-app-git-frontend-heldertosta.vercel.app/",
    develop: "https://controle-sentencas-app-git-frontend-heldertosta.vercel.app/",    
    test: "https://controle-sentencas-app-git-frontend-heldertosta.vercel.app/"
};

export const baseURL = endpoints.production;

export const axiosInstance = async (params: any) => {
    const token = await getToken();
    return axios({
        baseURL,
        ...params,
        headers: { Authorization: `${token ? 'Bearer '.concat(token) : ''}` }
    });
};
