import axios from "axios";


export const getAllCatalogs = () =>{
    return axios.get('http://127.0.0.1:8000/api/estoc/layers');
}

export const getCatalogByURL = (url) =>{
    let body = {
        url: url
    }
    return axios.post('http://127.0.0.1:8000/api/estoc/layers', body);
}

export const getCoordinatesFromURL = (url, url_download) =>{
    console.log(url_download)
    let body = {
        url_download: url_download,
        url: url
    }
    return axios.post('http://127.0.0.1:8000/api/estoc/coords', body);
}

export const getCoordinatesFromFile = (url) =>{
    let body = {
        url: url
    }
    return axios.post('http://127.0.0.1:8000/api/estoc/coords', body);
}

export const getCoordinatesFromLocalFile = (name) =>{
    let body = {
        name: name
    }
    return axios.post('http://127.0.0.1:8000/api/estoc/coords', body);
}

export const getImageFromFile = () =>{
    return axios.get('http://127.0.0.1:8000/api/estoc/graphics');
}

export const getImageFromLocalFile = (name) =>{
    let body = {
        name: name
    }
    return axios.post('http://127.0.0.1:8000/api/estoc/graphics', body);
}


export const getDataToForm = (url, url_download) =>{
    let body = {
        url: url,
        url_download:url_download
    }
    return axios.post('http://127.0.0.1:8000/api/estoc/formdata', body);
}

export const getDatafromChooseForm = (dataForm) =>{
    let body = {
        dataForm: dataForm
    }
    return axios.post('http://127.0.0.1:8000/api/estoc/formdatachoose', body);
}

export const getCSVFileFromNetcdf = (url) =>{
    let body = {
        url: url,
        responseType: 'blob'
    }
    return axios.post('http://127.0.0.1:8000/api/estoc/convertcsv', body);
}

