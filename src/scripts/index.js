import { getUser } from "/src/scripts/services/user.js"
import { getRepos  } from "/src/scripts/services/repositories.js"
import { user } from "/src/scripts/objects/user.js"
import { screen } from "/src/scripts/objects/screen.js"

document.getElementById("btn-search").addEventListener("click", ()=>{
    const userName = document.getElementById("input-search").value
    if(validateEmptyInput(userName)) return;
    getUserData(userName)
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário')
        return true
    }
}

document.getElementById("input-search").addEventListener( "keyup", (e) =>{
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterPressed = key === 13
    if(isEnterPressed){
        if(validateEmptyInput(userName)) return;
        getUserData(userName)
    }
} )

async function getUserData(userName){

    const userResponse = await getUser(userName)
    if(userResponse.message =="Not Found"){
        screen.renderNotFound()
        return
    }
    const repositoriesResponse = await getRepos(userName)
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    screen.renderUser(user)
}
