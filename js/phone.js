const phoneButton = document.querySelector(".phone__button");
const phoneScreen = document.querySelector(".phone__screen");
phoneButton.addEventListener('click', (e) => {
    e.preventDefault();
    phoneScreen.classList.toggle("active");
});

const form = document.forms.phone__form;
const correspondenceHistory = document.querySelector(".correspondence-history");
correspondenceHistory.insertAdjacentHTML("beforeend", `
    <div class="correspondence-history__item chatGPT">
        <h5 class="correspondence-history__title">Luffy</h5>
        <p class="correspondence-history__message">
            Привіт, я Монкі Д. Луффі.
        </p>
        <span class="correspondence-history__date">${new Date().getHours()}:${new Date().getMinutes()}</span>
    </div>    
`)

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const prompt = form.phone__message.value;
    const errorPhone = document.querySelector(".error");
    if(prompt){
        errorPhone.classList.remove("active");
        const URL = "https://api.openai.com/v1/chat/completions";
        const API_KEY = "Api-key";
    
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${API_KEY}`);
        correspondenceHistory.insertAdjacentHTML("beforeend", `
            <div class="correspondence-history__item user">
                <h5 class="correspondence-history__title">You</h5>
                <p class="correspondence-history__message">
                    ${prompt}
                </p>
                <span class="correspondence-history__date">${new Date().getHours()}:${new Date().getMinutes()}</span>
            </div>    
        `)

        const body = JSON.stringify({
            "model": "gpt-3.5-turbo-16k",
            "messages": [
              {
                "role": "system",
                "content": "Ти ,assistant, поводь себе як Монкі Д. Луффі з манги One piece, відповідай всім на питання наче ти персонаж Монкі Д. Луффі."
              },
              {
                "role": "user",
                "content": `${prompt}`
              }
            ]
        });

        const request = new Promise((resolve, reject) => {
            form.phone__message.value = "";
            fetch(URL, {
            method: "POST",
            headers: headers,
            body: body,
        }).then((responce) =>{
            if(responce.ok) resolve(responce.json());
            else throw new Error("bad request");
        })
        });
        request.then(date => {
            let messages = date.choices[0].message.content;
                correspondenceHistory.insertAdjacentHTML("beforeend", `
                <div class="correspondence-history__item chatGPT">
                    <h5 class="correspondence-history__title">Luffy</h5>
                    <p class="correspondence-history__message">
                        ${messages}
                    </p>
                    <span class="correspondence-history__date">${new Date().getHours()}:${new Date().getMinutes()}</span>
                </div>
                `)
        })
        .catch(error => {
            console.log(error);
        })
    }else{
        errorPhone.classList.add("active");
        errorPhone.children[0].textContent = "Заповніть поле, напишіть щось!"
    }
});