let siz = 4;
let is_moved = 0, total = 0;
function Random(x) {
    return Math.floor(Math.random() * x);
}

function getPos() {
    return Random(siz) + "" + Random(siz);
}

function genColor(val) {
    let color = "#FFFFFF";
    switch(val) {
        case 0:     color = "#ffffff"; break;
        case 2:		color = "#eee4da"; break;
        case 4:		color = "#ede0c8"; break;
        case 8:		color = "#f2b179"; break;
        case 16:	color = "#f59563"; break;
        case 32:	color = "#f67c5f"; break;
        case 64:	color = "#f65e3b"; break;
        case 128:	color = "#edcf72"; break;
        case 256:	color = "#edcc61"; break;
        case 512:	color = "#edc850"; break;
        case 1024:	color = "#edc53f"; break;
        case 2048:	color = "#edc22e"; break;
        default:	color = "#3c3a32"; break;
    }
    return color;
}

function SetColor() {
    for (let i = 0; i < siz; ++i) {
        for (let j = 0; j < siz; ++j) {
            document.getElementById(i + "" + j).style;
            document.getElementById(i + "" + j).style.backgroundColor = genColor(getVal(i, j));
        }
    }
}

function init() {
    total = 0;
    siz = document.getElementById("size").value;
    if (siz == null || siz == "") siz = 4;
    let str = '<table border=1">';
    for (let i = 0; i < siz; ++i) {
        str += '<tr>';
        for (let j = 0; j < siz; ++j) {
            let idx = i + "" + j;
            str += '<td style="font-size: 40px;" align="center" width="80" height="80" id=' + idx + '></td>';
        }
        str += '</tr>';
    }
    str += "</table>";
    document.getElementById("main").innerHTML = str;
    let i1 = getPos(), i2 = getPos();
    while (i1 == i2) i2 = getPos();
    document.getElementById(i1).innerHTML = Random(10) < 9 ? 2 : 4;
    document.getElementById(i2).innerHTML = Random(10) < 9 ? 2 : 4;
    SetColor();
    return false;
}

function getVal(i, j) {
    let val = parseInt(document.getElementById(i + "" + j).innerHTML);
    if (isNaN(val)) return 0;
    else return val;
}

function GameOver() {
    for (let i = 0; i < siz; ++i) {
        for (let j = 0; j < siz; ++j) {
            if (getVal(i, j) == 0) {
                return false;
            }
        }
    }
    for (let i = 0; i < siz; ++i) {
        for (let j = 0; j < siz - 1; ++j) {
            if (getVal(i, j) == getVal(i, j + 1)) {
                return false;
            }
        }
    }
    for (let i = 0; i < siz - 1; ++i) {
        for (let j = 0; j < siz; ++j) {
            if (getVal(i, j) == getVal(i + 1, j)) {
                return false;
            }
        }
    }
    return true;
}

function NewBlock() {
    let lis = [];
    for (let i = 0; i < siz; ++i) {
        for (let j = 0; j < siz; ++j) {
            if (getVal(i, j) == 0) {
                lis.push(i + "" + j);
            }
        }
    }
    if (lis.length == 0) return;
    let idx = Random(lis.length);
    document.getElementById(lis[idx]).innerHTML = Random(10) < 9 ? 2 : 4;
}

function Move(seq) {
    let A = [], B = [], value = 0;
    for (let i = 0; i < siz; ++i) {
        if (seq[i] > 0) {
            if (A.length == 0 || A[A.length - 1] != seq[i]) {
                A.push(seq[i]);
            } else {
                A[A.length - 1] *= 2;
                value += A[A.length - 1];
                for (let j = 0; j < A.length; ++j) B.push(A[j]);
                A = [];
            }
        }
    }
    for (let j = 0; j < A.length; ++j) B.push(A[j]);
    while (B.length < siz) B.push("");
    total += value;
    document.getElementById("score").innerHTML = "score = " + total;
    return B;
}

function Left() {
    for (let i = 0; i < siz; ++i) {
        let st = []; 
        for (let j = 0; j < siz; ++j) {
            st.push(getVal(i, j));
        }
        let ed = Move(st);
        for (let j = 0; j < siz; ++j) {
            document.getElementById(i + "" + j).innerHTML = ed[j];
        }
        if (st != ed) is_moved = 1;
    }
}

function Right() {
    for (let i = 0; i < siz; ++i) {
        let st = []; 
        for (let j = siz - 1; j >= 0; --j) {
            st.push(getVal(i, j));
        }
        let ed = Move(st);
        for (let j = 0; j < siz; ++j) {
            document.getElementById(i + "" + j).innerHTML = ed[siz - 1 - j];
        }
        if (st != ed) is_moved = 1;
    }
}

function Up() {
    for (let i = 0; i < siz; ++i) {
        let st = []; 
        for (let j = 0; j < siz; ++j) {
            st.push(getVal(j, i));
        }
        let ed = Move(st);
        for (let j = 0; j < siz; ++j) {
            document.getElementById(j + "" + i).innerHTML = ed[j];
        }
        if (st != ed) is_moved = 1;
    }
}

function Down() {
    for (let i = 0; i < siz; ++i) {
        let st = []; 
        for (let j = siz - 1; j >= 0; --j) {
            st.push(getVal(j, i));
        }
        let ed = Move(st);
        for (let j = 0; j < siz; ++j) {
            document.getElementById(j + "" + i).innerHTML = ed[siz - 1 - j];
        }
        if (st != ed) is_moved = 1;
    }
}

document.onkeydown = function(e) {
    let code = e.which, sorry = 0;
    is_moved = false;
    switch(code) {
        case 37: Left();    break;
        case 38: Up();      break;
        case 39: Right();   break;
        case 40: Down();    break;
        default: sorry = 1; break;
    }
    if (!sorry) {
        if (is_moved) NewBlock();
        SetColor();
        if (GameOver()) {
            alert("game over!");
        }
    }
};
