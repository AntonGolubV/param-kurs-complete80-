async function getSmartphoneByBrand(brand) {
    const response = await fetch(`/getSmartphoneByBrand?brand=${brand}`);
    if (response.ok) {
        const responseObj = await response.text();
        let aside = document.querySelector("aside");
        aside.innerHTML = `${responseObj}`;
        return;
    }
    alert("error");
}
function getValueOfInput(arr) {
    let newArr = [];
    if (arr.length == 8) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].checked) {
                newArr.push(arr[i].value);
            }
        }
    } else {
        for (let i = 0; i < arr.length; i++) {
            newArr.push(arr[i].value);
        }
    }
    return newArr;
}
async function getSmartphoneByParam() {
    let price = document.querySelectorAll(".price_input");
    let brand = document.querySelectorAll(".inp");
    let storage = document.querySelectorAll(".storage_input");
    let ram = document.querySelectorAll(".ram_input");
    let camera = document.querySelectorAll(".camera_input");

    const data = {
        price: getValueOfInput(price),
        brand: getValueOfInput(brand),
        storage: getValueOfInput(storage),
        ram: getValueOfInput(ram),
        camera: getValueOfInput(camera),
    };

    const response = await fetch("/getSmartphoneByParam", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const responseObj = await response.text();
        let aside = document.querySelector("aside");
        aside.innerHTML = `${responseObj}`;
        return;
    }
}
