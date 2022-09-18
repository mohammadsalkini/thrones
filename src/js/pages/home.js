const wrapper = document.getElementById("wrapper");

const getCharacters = async () => {
    let uri = "https://thronesapi.com/api/v2/Characters";
    const result = await fetch(uri);
    const data = await result.json();
   
    console.log(data);

    let template = '';
/**
family
firstName
fullName
id
image
imageUrl
lastName
title
 */

/**
 * BEM 
 * Block Elements Modefire
 * 
 * 
 */

    data.forEach(element => {
        template += `
        <article class="card">
            <div class="card__header">
                <h3 class="card__title card__title--black">${element.fullName}</h3>
                <h4 class="card__title card__title--red">family: ${element.family}</h4>
            </div>
            <div class="card__body">
                <img class="card__image" src="${element.imageUrl}" alt="${element.image}">
            </div>
            <footer class="card__footer">
                <a class="card__footer btn btn__default btn__default--primary">add to fav</a>
            </footer>
        </article>

        
        
        `;
    });
    if(wrapper){
        wrapper.innerHTML = template;
    }

}

window.addEventListener("DOMContentLoaded", getCharacters);