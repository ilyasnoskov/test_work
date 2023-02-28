let storageScale = document.querySelector('.storage-scale');
let storageValue = document.querySelector('.storage-num');
let transferScale = document.querySelector('.transfer-scale');
let transferValue = document.querySelector('.transfer-num');
let backblazeScale = document.querySelector('.backblaze')
let backblazePrice = document.querySelector('.backblaze-price')
let bunnyScale = document.querySelector('.bunny')
let bunnyPrice = document.querySelector('.bunny-price')
let typeDiskList = document.querySelectorAll('.ul-bunny li')
let typeScaleway = document.querySelectorAll('.ul-scaleway li')
let scalewayScale = document.querySelector('.scaleway')
let scalewayPrice = document.querySelector('.scaleway-price')
let vultrScale = document.querySelector('.vultr')
let vultrPrice = document.querySelector('.vultr-price')
let diskType = 'HDD'
let scalewayType = 'Multi'


let prices = {
    "backblaze.com": {
        min: 7.00,
        max: null,
        storage: 0.005,
        transfer: 0.01
    },

    "vultr.com": {
        min: 5.00,
        max: null,
        storage: 0.01,
        transfer: 0.01
    },

    "bunny.net": {
        min: null,
        max: 10,
        HDD: {
            storage: 0.01,
            transfer: 0.01
        },
        SSD: {
            storage: 0.02,
            transfer: 0.01
        }
    },

    "scaleway.com": {
        min: null,
        max: null,
        Multi: {
            storage: 0.06,
            transfer: 0.02
        },
        Single: {
            storage: 0.03,
            transfer: 0.02
        }
    }
}

typeDiskList.forEach((value,index) => {
    value.addEventListener('click', e => {
        diskType = value.id
        calculate(prices,diskType,scalewayType)
        typeDiskList.forEach((val,idx) => {
            (index === idx) ? val.classList.add('active') : val.classList.remove('active')
        })
    });
});

typeScaleway.forEach((value,index) => {
    value.addEventListener('click', e => {
        scalewayType = value.id
        calculate(prices,diskType,scalewayType)
        typeScaleway.forEach((val,idx) => {
            (index === idx) ? val.classList.add('active') : val.classList.remove('active')
        })
    });
});


let changeStorageValue = storageScale.oninput = function () {
    storageValue.style.left = this.value/10 - 1 + '%';
    storageValue.innerHTML = this.value;
    calculate(prices,diskType, scalewayType)

}
let changeTransferValue = transferScale.oninput = function () {
    transferValue.style.left = this.value/10 - 1 + '%';
    transferValue.innerHTML = this.value;
    calculate(prices,diskType, scalewayType)
}

let calculate = function (prices,diskType, scalewayType) {
    screenType = screen.orientation.type
    screen.orientation.addEventListener("change", function(e) {
        screenType = screen.orientation.type
    });


    backblazePrice.innerHTML = (Number(transferValue.innerHTML) * 0.01 + Number(storageValue.innerHTML) * 0.005 < prices["backblaze.com"].min)
            ? prices["backblaze.com"].min.toFixed(2)
        : (Number(transferValue.innerHTML) * 0.01 + Number(storageValue.innerHTML) * 0.005).toFixed(2)
    // backblazeScale.style.width = '-'.repeat(Number(backblazePrice.innerHTML))
    screenType === 'portrait-primary' ?
        backblazeScale.style.height = 15*backblazePrice.innerHTML + '%'
        : backblazeScale.style.width = 1.5*backblazePrice.innerHTML + '%'

    vultrPrice.innerHTML = (Number(transferValue.innerHTML) * 0.01 + Number(storageValue.innerHTML) * 0.01 < prices["vultr.com"].min)
        ? prices["vultr.com"].min.toFixed(2)
        : (Number(transferValue.innerHTML) * 0.01 + Number(storageValue.innerHTML) * 0.01).toFixed(2)
    screenType === 'portrait-primary' ?
        vultrScale.style.height = 15*vultrPrice.innerHTML + '%'
        : vultrScale.style.width = 1.5*vultrPrice.innerHTML + '%'

    if (diskType === 'HDD') {
        bunnyPrice.innerHTML = (Number(transferValue.innerHTML) * 0.01 + Number(storageValue.innerHTML) * 0.01 > prices["bunny.net"].max)
            ? prices["bunny.net"].max.toFixed(2)
            : (Number(transferValue.innerHTML) * 0.01 + Number(storageValue.innerHTML) * 0.01).toFixed(2)
        screenType === 'portrait-primary' ?
            bunnyScale.style.height = 15*bunnyPrice.innerHTML + '%'
            : bunnyScale.style.width = 1.5*bunnyPrice.innerHTML + '%'
    }else if (diskType === 'SSD') {
        bunnyPrice.innerHTML = (Number(transferValue.innerHTML) * 0.01 + Number(storageValue.innerHTML) * 0.02 > prices["bunny.net"].max)
            ? prices["bunny.net"].max.toFixed(2)
            : (Number(transferValue.innerHTML) * 0.01 + Number(storageValue.innerHTML) * 0.02).toFixed(2)
        screenType === 'portrait-primary' ?
            bunnyScale.style.height = 15*bunnyPrice.innerHTML + '%'
            : bunnyScale.style.width = 1.5*bunnyPrice.innerHTML + '%'
    }

    if (scalewayType === 'Multi') {
        scalewayPrice.innerHTML = ((Number(transferValue.innerHTML) > 75 ? Number(transferValue.innerHTML) - 75 : 0) * 0.02 + (Number(storageValue.innerHTML) > 75 ? Number(storageValue.innerHTML) - 75 : 0) * 0.06).toFixed(2)
        screenType === 'portrait-primary' ?
            scalewayScale.style.height = 15*scalewayPrice.innerHTML + '%'
            : scalewayScale.style.width = 1.5*scalewayPrice.innerHTML + '%'
    }else if (scalewayType === 'Single') {
        scalewayPrice.innerHTML = ((Number(transferValue.innerHTML) > 75 ? Number(transferValue.innerHTML) - 75 : 0) * 0.02 + (Number(storageValue.innerHTML) > 75 ? Number(storageValue.innerHTML) - 75 : 0) * 0.03).toFixed(2)
        screenType === 'portrait-primary' ?
            scalewayScale.style.height = 15*scalewayPrice.innerHTML + '%'
            : scalewayScale.style.width = 1.5*scalewayPrice.innerHTML + '%'
    }

    let scalesArr = [bunnyScale,backblazeScale,scalewayScale,vultrScale]
    let priceArr = [Number(bunnyPrice.innerHTML),Number(backblazePrice.innerHTML),Number(scalewayPrice.innerHTML),Number(vultrPrice.innerHTML)]
    let minElIdx = (Math.min(...priceArr))


    for (let i=0;i<scalesArr.length;i++){
        (priceArr[i] === minElIdx) ? scalesArr[i].classList.add('scale-min') : scalesArr[i].classList.remove('scale-min')
    }


}

changeStorageValue(value = 0)
changeTransferValue(value = 0)