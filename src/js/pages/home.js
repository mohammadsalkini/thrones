const wrapper = document.getElementById("wrapper");

const getCharacters = async () => {
    let uri = "https://thronesapi.com/api/v2/Characters";
    const result = await fetch(uri);
    const data = await result.json();
    let template = '';

    data.forEach(item => {
        template += `<div class="wrapper-thrones">
                        <h4>${item.fullName}</h4>
                        <img src="${item.imageUrl}" alt="${item.title}">
                    </div>`;
    });
    if(wrapper){
        wrapper.innerHTML = template;
    }

}

window.addEventListener("DOMContentLoaded", getCharacters);
