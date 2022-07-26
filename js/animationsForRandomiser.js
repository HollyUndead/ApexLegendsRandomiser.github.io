function LegendOn(){
    const move = anime({
        targets: '#Legend',
        translateY: 0,
    });
}

function LegendOff(){
    const move = anime({
        targets: '#Legend',
        translateY:-300,
    });
}

function AllClassOn(){
    const move = anime({
        targets: '#DivLegendClass',
        translateY: 0,
    });
}

function AllClassOff(){
    const move = anime({
        targets: '#DivLegendClass',
        translateY:-400,
    });
}

function WeaponOff(){
    const move = anime({
        targets: '#Weapon',
        translateY:-500,
    });
}

function WeaponOn(){
    const move = anime({
        targets: '#Weapon',
        translateY: 0,
    });
}

function ammoTypeOn(){
    const move = anime({
        targets: '#ammoType',
        translateX: 175,
    });
    const move1 = anime({
        targets: '#classType',
        translateX: 900,
    });
}

function classTypeOn(){
    const move = anime({
        targets: '#classType',
        translateX: 175,
    });
    const move1 = anime({
        targets: '#ammoType',
        translateX: 900,
    });
}

function mixedOn(){
    const move = anime({
        targets: '#classType',
        translateX: 175,
    });
    const move1 = anime({
        targets: '#ammoType',
        translateX: 0,
    });
    const move2 = anime({
        targets: '#WhatTypeWeapon',
        translateX: 900,
    });
}

function mixedOff(){
    const move2 = anime({
        targets: '#WhatTypeWeapon',
        translateX: 0,
    });
}

function AllWeaponOn(){
    const move = anime({
        targets: '#classType',
        translateX: 900,
    });
    const move1 = anime({
        targets: '#ammoType',
        translateX: 900,
    });
    const move2 = anime({
        targets: '#WhatTypeWeapon',
        translateX: 900,
    });
}

function AllWeaponOff(){
    const move2 = anime({
        targets: '#WhatTypeWeapon',
        translateX: 0,
    });
}

function LegendListOn(){
    const move = anime({
        targets: '#legend',
        translateY: 0,
    })
}

function LegendListOff(){
    const move = anime({
        targets: '#legend',
        translateX: -2000
    })
}
const move = anime({
    targets: '#legend',
    translateX: -2000,
    translateY: 40
})
function LegendUpdate(){
    const move = anime({
        targets: '#legend',
        translateX: -2000,
    })
    setTimeout(() =>
    {const move1 = anime({
        targets: '#legend',
        translateX: 0,
    })}, 1000)
}
const move1 = anime({
    targets: '#weapons1',
    translateX: -2000,
    translateY: 40
})
function WeaponUpdate(){
    const move = anime({
        targets: '#weapons1',
        translateX: -2000,
    })
    setTimeout(() =>
    {const move1 = anime({
        targets: '#weapons1',
        translateX: 0,
    })}, 1000)
}

function WeaponListOff(){
    const move = anime({
        targets: '#weapons1',
        translateX: -2000
    })
}