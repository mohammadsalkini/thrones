const form = document.querySelector("#form-newsletter");
if (form) {
    form.addEventListener("submit", async (event)=> {
        event.preventDefault();
        const name = form.name.value.toString().trim();
        const email = form.email.value.toString().trim();

        if(name !== "" || email !== ""){
            alert(`your name is ${name} and your email is ${email}`);
        }else {
            document.querySelector("form input[type='submit']").setAttribute("disabled", true);
            alert("name and email should be not empty ;(")
        }

    })
}
