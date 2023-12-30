import NProgress from "nprogress";
import axios from "axios";
// import { store } from "../redux/store.js";
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 50,
});

const instance = axios.create({
    baseURL: "http://localhost:7700",
});
// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // const access_token = store?.getState()?.user?.account?.access_token;
        // config.headers["Authorization"] = "Bearer " + access_token;

        NProgress.start();
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        NProgress.done();
        return response && response.data ? response.data : response;
    },
    function (error) {
        NProgress.done();
        // if (error.response.data && error.response.data.EC === -999) {
        //     window.location.href = "/login";
        // }

        return error && error.response && error.response.data
            ? error.response.data
            : Promise.reject(error);
    }
);

export default instance;
