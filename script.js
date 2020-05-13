// TODO: add code here


window.addEventListener('load', function() {
    let container = document.getElementById('container');
    let astronautCount = document.getElementById('astronautcount');
    apiCall().then(result => {
        let innerHTML = [];
        astronautCount.innerHTML = `Astronaut count: ${result.length}`;
        result.sort(function (a, b) {
            return b.hoursInSpace - a.hoursInSpace;
        });
        for (let astronaut of result) {
            let astronautHTML = `<div class="astronaut">
                <div class="bio">
                    <h3>${astronaut.firstName} ${astronaut.lastName}</h3>
                    <ul>
                        <li>${astronaut.hoursInSpace}</li>
                        <li style="${activeColor(astronaut.active)};">Active: ${astronaut.active}</li>
                        <li>Skills: ${astronaut.skills.join(', ')}</li>
                    </ul>
                </div>
                <img class="avatar" src="${astronaut.picture}">
            </div>`
            innerHTML.push(astronautHTML);
        }
        container.innerHTML = innerHTML.join('');
    })
})

function activeColor(status) {
    console.log(status);
    if (status) {
        return 'color: green'
    }
}

async function apiCall() {
    let result = await fetch("https://handlers.education.launchcode.org/static/astronauts.json");
    return result.json();
}