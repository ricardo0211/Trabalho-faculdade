const imgs = document.getElementById("img");
const img = document.querySelectorAll("#img img");

let idx = 0;

function carrossel(){
    idx++;

    if (idx > img.length - 1) {
            idx = 0;
    }

    imgs.style.transform = `translateX(${-idx * 400}px)`;

}
setInterval(carrossel, 4000);



carrossel();

const QUESTION = document.querySelector('#question');
const RESULT = document.querySelector('#camo-pergunta');
const OPEN_API_KEY = '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';

QUESTION.addEventListener('keypress', (e) => {
    if (QUESTION.value && e.key === 'Enter')  {
        sendQuestion();
    }
});

let sendQuestion = () => {
    
    RESULT.scrollTop = RESULT.scrollHeight;

    if (RESULT.value) {
        RESULT.value += "\n";
    }   

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPEN_API_KEY,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: QUESTION.value,
            max_tokens: 2048,
            temperature: 0.8,

        })
    })
    .then((response) => response.json())
    .then((json) => {

        if (RESULT.value) {
            RESULT.value += "\n";
        }

        if (json.error?.message) {
            RESULT.value += `Error: ${json.error.mesage}`
        } else if (json.choices?.[0].text) {
            let text = json.choices[0].text || "No response";
            RESULT.value += `Chat GPT: ${text}`;
        }

    })
    .catch((error) => console.error("Error: ", error))
    .finally(() => {
        QUESTION.value = "";
        QUESTION.disabled = false;
        QUESTION.focus();
    });

    RESULT.value += `Eu: ${QUESTION.value}`;
    QUESTION.value = "Garregando resposta...";
    QUESTION.disabled = true;

}

function limpa () {
    RESULT.value = "";
}