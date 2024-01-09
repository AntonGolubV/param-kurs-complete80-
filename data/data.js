const path = require("path");
const fs = require("fs");
const dataApple = require("./iphone.json");
const dataSamsung = require("./samsung.json");
const dataHonor = require("./honor.json");
const dataRealme = require("./realme.json");
const dataPoco = require("./poco.json");
const dataVivo = require("./vivo.json");
const dataXiaomi = require("./xiaomi.json");
const dataHuawei = require("./huawei.json");

function dataSmartphone(brand) {
    let smartFilteredObj;
    switch (brand) {
        case "apple":
            smartFilteredObj = filterObjects(dataApple.products, ["extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "samsung":
            smartFilteredObj = filterObjects(dataSamsung.products, ["extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "honor":
            smartFilteredObj = filterObjects(dataHonor.products, ["extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "realme":
            smartFilteredObj = filterObjects(dataRealme.products, ["extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "poco":
            smartFilteredObj = filterObjects(dataPoco.products, ["extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "vivo":
            smartFilteredObj = filterObjects(dataVivo.products, ["extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "xiaomi":
            smartFilteredObj = filterObjects(dataXiaomi.products, ["extended_name", "images", "description", "prices", "description_list"]);
            break;
        case "huawei":
            smartFilteredObj = filterObjects(dataHuawei.products, ["extended_name", "images", "description", "prices", "description_list"]);
            break;
    }
    return smartFilteredObj;
}

function filterObjects(array, keys) {
    return array.map((obj) => {
        const filteredObj = {};
        keys.forEach((key) => {
            if (obj.hasOwnProperty(key)) {
                filteredObj[key] = obj[key];
            }
        });
        return filteredObj;
    });
}

function templ(string, smart) {
    for (let key in smart) {
        if (key == "images") {
            for (let item in smart[key]) {
                if (item == "header") {
                    string = string.replace(`{{${key}}}`, `${smart[key][item]}`);
                }
            }
        }
        if (key == "prices" && smart.prices) {
            string = string.replace(`{{${key}}}`, `${smart.prices.price_min.amount} BYN`);
        }

        if (key == "prices" && !smart.prices) {
            string = string.replace(`{{${key}}}`, `Нет в наличии`);
        }
        string = string.replace(`{{${key}}}`, `${smart[key]}`);
    }
    return string;
}

function filterByParam(obj) {
    let arrBrand = [];
    let filteredBrand = [];
    for (let item in obj) {
        if (item == "brand" && obj[item]) {
            for (let i = 0; i < obj[item].length; i++) {
                arrBrand.push(dataSmartphone(obj[item][i]));
            }
        }
    }
    for (let i = 0; i < arrBrand.length; i++) {
        for (let k = 0; k < arrBrand[i].length; k++) {
            if (arrBrand[i][k].prices != null && parseInt(arrBrand[i][k].prices.price_min.amount) >= parseInt(obj.price[0]) && parseInt(arrBrand[i][k].prices.price_min.amount) <= parseInt(obj.price[1])) {
                filteredBrand.push(arrBrand[i][k]);
            }
        }
    }
    let filteredBrand2 = rangeRam(filteredBrand, 4, obj.storage);
    let filteredBrand3 = rangeRam(filteredBrand2, 3, obj.ram);
    let filteredBrand4 = rangeRam(filteredBrand3, 5, obj.camera);
    return filteredBrand4;
}

function rangeRam(arr, numberParam, obj_param) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        let variable = arr[i].description_list[parseInt(`${numberParam}`)].split(" ");
        if (parseInt(obj_param[0]) <= variable[1] && parseInt(obj_param[1]) >= variable[1]) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

module.exports = {
    dataSmartphone,
    templ,
    filterByParam,
};
