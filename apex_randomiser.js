const requestURl = 'https://raw.githubusercontent.com/HollyUndead/ApexLegendsRandomiser.github.io/main/weapon.json';

function changeColor()
{
    let arr = Array.from(document.querySelectorAll('input'));
    arr.forEach((a) =>
    {
        if (a.type == 'number' || a.type == 'range'){}
        else
        {
            if (a.checked)
            {
                ById(a.id).labels[0].style.color = 'white';
            }
            else
            {
                ById(a.id).labels[0].style.color = 'gray';
            }
        }
    })
}

document.addEventListener('DOMContentLoaded', UseSavedData());

document.addEventListener('DOMContentLoaded', changeColor())

document.querySelector('.weaponNumber').addEventListener('input', () => 
{
    document.getElementById('HowMany').value = document.querySelector('.weaponNumber').value;
    localStorage.setItem('weaponNumber', document.getElementById('weaponNumber').value);
})

function ClearStorage()
{
    localStorage.clear();
    location.reload();
}

// function for random

function RandomFromArray(array)
{
    let a;
    a=Math.floor(Math.random()*(array.length-1)+1);
    return(array[a]);
}

// buttons

function ButtonForRandom()
{
    ById('WeaponOutPut').innerHTML = '';
    ById('legendOutPut').innerHTML = '';
    if (ById('randomLegend').checked) {LegendUpdate(); RandomisedLegend();}else{LegendListOff()}
    if (ById('randomWeapon').checked) {WeaponUpdate(); RandomisedWeapon();}else{WeaponListOff()}
}

// create array

function LegendArray(array)
{
    let LegendClassCheckBox = Array.from(ByClassName('LegendClass'))
    let LegendClassT = [], LegendClass = []
    LegendClassCheckBox.forEach((a) =>
    {
        if (ById(a.id).checked)
        {
            LegendClassT = Array.from(array.legtype[a.id]);
            LegendClass = LegendClass.concat(LegendClassT);
        }
    })
    LegendClass.unshift(' ');
    return LegendClass;
}

function WeaponArray(array)
{
    let mixedCheckbox = ById('mixed').checked;
    let AmmoTypeCheckbox = Array.from(ByClassName('ammoType'))
    let ClassTypeCheckbox = Array.from(ByClassName('classType'))
    let AmmoType = [], ClassType = [], AmmoTypeT = [], ClassTypeT =[], WeaponArray = [];

    AmmoTypeCheckbox.forEach((a) =>
    {
        if (ById(a.id).checked)
        {
        AmmoTypeT = Array.from(array.weapon.ammoType[a.id]);
        AmmoType = AmmoType.concat(AmmoTypeT);
        }
    });
    

    ClassTypeCheckbox.forEach((a) =>
    {
        if (ById(a.id).checked)
        {
        ClassTypeT = Array.from(array.weapon.weaponType[a.id])
        ClassType = ClassType.concat(ClassTypeT);
        }
    });
    
    

    if (mixedCheckbox == true)
    {
        ClassType.forEach((a) =>
        {
            AmmoType.includes(a) ? WeaponArray.push(a) : {}
        });
        WeaponArray.unshift('');
        return WeaponArray;
    }
    if (mixedCheckbox != true 
            && ById('WhatTypeClass').checked == true)
    {
        ClassType.unshift('');
        return (ClassType);
    }
    if (mixedCheckbox != true 
            && ById('WhatTypeAmmo').checked == true)
    {
        AmmoType.unshift('')
        return (AmmoType);
    }
}

async function RandomisedWeapon()
{
    const request = new Request(requestURl);
    const response = await fetch(request);
    const array = await response.json();
    let weaponArray = WeaponArray(array);
    if (weaponArray.length == 1)
    {
        ById('weapons1').style.display = 'none';
        alert('Are you stupid? You want to shoot from finger?')
        return;
    }
    if (ById('redWeapon').checked == false)
    {
        Array.from(array.weapon.redWeapon).forEach((a) =>
        {
            let myIndex = weaponArray.indexOf(a);
            myIndex != -1 ? weaponArray.splice(myIndex, 1) : {}
        })            
    }

    let weapon, WeaponList = [];
    let WeaponImg = array.image;

    let weaponNumber = ById('weaponNumber').value
    if (ById('withRepeat').checked)
    {
    for (let i = 0; i < weaponNumber; i++)
    {
        weapon = RandomFromArray(weaponArray);
        WeaponList.push(weapon)
    }
    }
    else
    {
        for (let i = 0; i < weaponNumber; i++)
    {
        do
        {
            weapon = RandomFromArray(weaponArray);
        }
        while(WeaponList.includes(weapon))
        WeaponList.push(weapon)
    }
    }


    OutPutWeapon(WeaponList, WeaponImg)
}

async function RandomisedLegend()
{
    const request = new Request(requestURl);
    const response = await fetch(request);
    const array = await response.json();

    let legendArray = [], leg1, leg2, leg3;
    legendArray = LegendArray(array);
    let urlObj = array.image;
    let legends = [];
    if(ById('support').checked == true
         && ById('atack').checked == false 
            && ById('defence').checked == false 
               && ById('scout').checked == false
                  && ById('threeLegends').checked == true)
    {
        ById('legend').style.display = 'none';
        alert("Can't random because only two legends");
        return;
    }
    if (legendArray.length <= 1)
    {
        ById('legend').style.display = 'none';
        alert('On wich legend you want to play??? Maybe ghost?')
        return;
    }
    else
    {
        leg1 = RandomFromArray(legendArray);
        legends.push(leg1);
        if (ById('oneLegend').checked)
        {
            OutPutLegends(legends, urlObj)
        }
        if (ById('twoLegends').checked)
        {
            do
            {
                leg2 = RandomFromArray(legendArray);
            }
            while(leg1 == leg2)
            legends.push(leg2);
            OutPutLegends(legends, urlObj);
        }
        if (ById('threeLegends').checked)
        {
            do
            {
                leg2 = RandomFromArray(legendArray);
                leg3 = RandomFromArray(legendArray);
            }
            while(leg1==leg2 || leg2==leg3 || leg1==leg3)
            legends.push(leg2);
            legends.push(leg3);
            OutPutLegends(legends, urlObj);
        }
    }
}

// out put

function OutPutLegends(legendList, urlObj)
{
    ById('legend').style.display = 'block'
    const legendOutPut = ById("legendOutPut");
    ById('LegendTitle').innerHTML = 'Legend'
    let count = 1;
    legendList.forEach((legend) =>
    {
        const created = document.createElement('p')
        const img = document.createElement('img')
        const div = document.createElement('div')
        legendOutPut.appendChild(div)
        div.id = 'legendDiv' + count
        created.id = 'legend' + count
        created.className = 'LegendR'
        img.id = 'legendImg' + count
        div.className = 'LegendDiv'
        count++;
        img.src = urlObj[legend]
        img.className = 'legendImg'
        div.appendChild(img)
        div.appendChild(created);
        created.innerHTML = legend;
    })
}

function OutPutWeapon(WeaponList, WeaponImg)
{
    let weaponOutPut = ById('WeaponOutPut')
    ById('WeaponTitle').innerHTML = 'Weapon'
    let count = 1;
    WeaponList.forEach((weapon) =>
    {
        const created = document.createElement('p')
        const img = document.createElement('img')
        const div = document.createElement('div')
        weaponOutPut.appendChild(div)
        div.id = 'weaponDiv' + count
        created.id = 'weapon' + count
        img.id = 'weaponImg' + count
        count++;
        img.src = WeaponImg[weapon]
        created.className = 'WeaponName'
        div.className = 'weaponDivClass'
        img.className = 'weaponImg'
        div.appendChild(img)
        div.appendChild(created);
        created.innerHTML = weapon;
    })
}

// how many weapon

function HowManyWeapon()
{
    let value = parseInt(ById('HowMany').value)
    let max = parseInt(ById('weaponNumber').max)
    let min = parseInt(ById('weaponNumber').min)
    if(value > max)
    {
        ById('HowMany').value = max;
        ById('weaponNumber').value = max;
    } 
    if(value < min)
    {
        ById('HowMany').value = min;
        ById('weaponNumber').value = min;
    }
    if(value <= max 
        && value >= min)
    {
        ById('weaponNumber').value = value;
        localStorage.setItem('weaponNumber', ById('weaponNumber').value);
    }
}

// change display

function WhatRandomise()
{
    if (ById('randomLegend').checked)
    {
        LegendOn();
    }
    else
    {
        LegendOff();
    }

    if (ById('randomWeapon').checked)
    {
        WeaponOn();
        WhatTypeWeapon();
        if (ById('allWeapon').checked)
        {
            AllWeapon()
        }
        if (ById('mixed').checked)
        {
            MixedWeapon();
        }
    }
    else
    {
        WeaponOff();
    }
}

// save data

function SaveData(id) //saveData
{
localStorage.setItem(id, ById(id).checked);
}

function SaveLegNumber(id)
{
const LegendNumber = Array.from(ByClassName('LegendNumber'))
LegendNumber.forEach((a) =>
{
    if (a.id === id)
    {
        localStorage.setItem(id, true)
    }
    else
    {
        localStorage.setItem(a.id, false)
    }
})
}

// use saved data to local storage

function UseSavedData() //savedData
{
let SavedData = [];
let SavedDataT = Array.from(ByClassName('Saved'));
SavedDataT.forEach((a) =>
{
    SavedData.push(a.id);
})
SavedData.forEach((id) =>
{
    let T = localStorage.getItem(id);
    if (T != null)
    {
        let result = T == 'true';
        ById(id).checked = result;
    }
})

WhatRandomise();
WeaponArrayLength();
DisplayLegendsClass();
if(localStorage.getItem('randomWeapon') == true)
{
WhatTypeWeapon();
}
}

function DisplayLegendsClass()
{
let array = Array.from(ByClassName('LegendClass'));
if (ById('allClass').checked)
{
    AllClassOff();
    array.forEach((a) =>
    {
        a.checked = true;
        localStorage.setItem(a.id, true)
    })
}
else
{
    AllClassOn();
}
}

function WhatTypeWeapon()
{
if (ById('WhatTypeClass').checked)
{
    classTypeOn();
    // ById('classType').style.display = 'block';
    // ById('ammoType').style.display = 'none';
}
if (ById('WhatTypeAmmo').checked)
{
    ammoTypeOn();
    // ById('classType').style.display = 'none';
    // ById('ammoType').style.display = 'inline';
}
localStorage.setItem('WhatTypeClass', ById('WhatTypeClass').checked);
localStorage.setItem('WhatTypeAmmo', ById('WhatTypeAmmo').checked);
WeaponArrayLength();
}

async function WeaponArrayLength()
{
const request = new Request(requestURl);
const response = await fetch(request);
const array = await response.json();

let weaponArray = WeaponArray(array);
let redWeaponArray = Array.from(array.weapon.redWeapon);
if (ById('redWeapon').checked == false)
{
    redWeaponArray.forEach((a) =>
    {
        let myIndex = weaponArray.indexOf(a);
        if (myIndex != -1)
        {
            weaponArray.splice(myIndex, 1);
        }
    })
}

let length = weaponArray.length-1;
ById('weaponNumber').max = length;
ById('weaponNumber').value = length;
ById('HowMany').max = length;
ById('HowMany').value = length;

let weaponNumber = localStorage.getItem('weaponNumber')
if(weaponNumber != null)
{
    if(weaponNumber < length)
    {
        ById('weaponNumber').value = weaponNumber;
        ById('HowMany').value = weaponNumber;
    }
}
}

function MixedWeapon()
{
    WeaponArrayLength();
if (ById('mixed').checked)
{
    mixedOn();
    ById('allWeapon').checked = false;
    localStorage.setItem('allWeapon', false)
    changeColor()
}
else
{
    if(ById('allWeapon').checked == false)
    {
        mixedOff();
        WhatTypeWeapon();
    }
}
}

function AllWeapon()
{
let array = Array.from(ByClassName('ammoType'));
array = array.concat(Array.from(ByClassName('classType')));
if (ById('allWeapon').checked)
{
    AllWeaponOn();
    ById('mixed').checked = false;
    localStorage.setItem('mixed', false)
    array.forEach((a) =>
    {
        a.checked = true;
        localStorage.setItem(a.id, true)
        WeaponArrayLength();
    })
    changeColor()
}
else
{
    AllWeaponOff();
    WhatTypeWeapon();
}
}


// setTimeout(function(){
// 	location.reload();
// }, 5000);
