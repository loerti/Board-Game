//Returns a random member of the array
export function chooseRandom(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const chosen = array[randomIndex];
    return chosen;
}

export function toggleOn(id) {
    document.getElementById(id).style.display = 'block';
}
export function toggleOff(id) {
    document.getElementById(id).style.display = 'none';
}

export function checkAvatar(avatar1, avatar2) {
    let checkCount = 0;

    for (let i = 0; i < avatar1.length; i++) {
        if (avatar1[i].checked == false) {
            checkCount += 1;
        }
    }
    for (let i = 0; i < avatar2.length; i++) {
        if (avatar2[i].checked == false) {
            checkCount += 1;
        }
    }
    if (checkCount >= 7) {
        return true;
    }
}

export function activateButton(id, toggleId) {
    document.getElementById(id).addEventListener('click', () => {
        toggleOn(toggleId);
    });
}
export function deactivateButton(id, toggleId) {
    document.getElementById(id).addEventListener('click', () => {
        toggleOff(toggleId);
    });
}