import axios from "axios";


export const getAllCatalogs = (baselayer) =>{
    if(baselayer === "fixedobs"){
        return axios.get('http://192.168.35.218:8000/api/estoc/fixedobslayers');
    }else{
        return axios.get('http://192.168.35.218:8000/api/estoc/gliderslayers');
    }
}


export const getCatalogsThredds = () =>{
    return axios.get('http://192.168.35.218:8000/api/estoc/threddscatalog');
}

export const getCatalogByURL = (url, baselayer) =>{
    console.log(baselayer);
    let body = {
        url: url
    }
    if(baselayer === "fixedobs"){
        return axios.post('http://192.168.35.218:8000/api/estoc/fixedobslayers', body);
    }else{
        return axios.post('http://192.168.35.218:8000/api/estoc/gliderslayers', body);
    }
}

export const getCoordinatesFromURL = (url, url_download) =>{
    console.log(url_download)
    let body = {
        url_download: url_download,
        url: url
    }
    return axios.post('http://192.168.35.218:8000/api/estoc/coords', body);
}

export const getCoordinatesGlidersFromURL = (url) =>{
    let body = {
        url: url
    }
    return axios.post('http://192.168.35.218:8000/api/gliders/dataset', body);
}

export const getCoordinatesProfilesFromURL = (url, url_download) =>{
    let body = {
        url_download: url_download,
        url: url
    }
    return axios.post('http://192.168.35.218:8000/api/estoc/coordsprofiles', body);
}

export const getCoordinatesFromFile = (url) =>{
    let body = {
        url: url
    }
    return axios.post('http://192.168.35.218:8000/api/estoc/coords', body);
}

export const getCoordinatesFromLocalFile = (name) =>{
    let body = {
        name: name
    }
    return axios.post('http://192.168.35.218:8000/api/estoc/coords', body);
}

export const getImageFromFile = () =>{
    return axios.get('http://192.168.35.218:8000/api/estoc/graphics');
}

export const getImageFromLocalFile = (name) =>{
    let body = {
        name: name
    }
    return axios.post('http://192.168.35.218:8000/api/estoc/graphics', body);
}


export const getDataToForm = (url, url_download) =>{
    let body = {
        url: url,
        url_download:url_download
    }
    return axios.post('http://192.168.35.218:8000/api/estoc/formdata', body);
}

export const getDataToFormProfiles = (url, url_download) =>{
    let body = {
        url: url,
        url_download:url_download
    }
    return axios.post('http://192.168.35.218:8000/api/estoc/formdataProfiles', body);
}

export const getDatafromChooseForm = (dataForm) =>{
    let body = {
        dataForm: dataForm
    }
    return axios.post('http://192.168.35.218:8000/api/estoc/formdatachoose', body);
}

export const getCSVFileFromNetcdf = (url) =>{
    let body = {
        url: url,
        responseType: 'blob'
    }
    return axios.post('http://192.168.35.218:8000/api/estoc/convertcsv', body);
}

//Gliders

export const getDatasetGliderFromVariableName = (url, name_variable) =>{
    let body = {
        url: url,
        name_variable:name_variable
    }
    return axios.post('http://192.168.35.218:8000/api/gliders/datasetvariable', body);
}