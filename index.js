
const screen = document.querySelector(".calc__pantalla")
const buttons = document.querySelectorAll(".calc__button");
let isResult = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const btnSelected = button.textContent;

        if (button.id === "btn-igual") {
            console.log(screen.textContent);
            try {
                screen.textContent = eval(screen.textContent);
                isResult = true;
            } catch (e) {
                console.log(e);
                screen.textContent = "Error!";
            }

            return;
        }

        if (button.id === "btn-c") {
            screen.textContent = "0";

            buttons.forEach(button => {
                button.disabled = false;
            });

            return;
        };
        
        if (button.id === "btn-ce") {
            if (screen.textContent.length === 1 || screen.textContent === "Error!") {
                screen.textContent = "0";
            } else {
                screen.textContent = screen.textContent.slice(0, -1);
            }
            return;
        }

        if (screen.textContent === "0") {
            screen.textContent = btnSelected;
        } else {
            if(isResult == true){
                screen.textContent = btnSelected;
                isResult = false;
            } else {
                screen.textContent += btnSelected;
            }
        }

        if (screen.textContent.length > 10) {
            screen.textContent = "EEEE"

            buttons.forEach(button => {
                if (button.id !== "btn-c") {
                    button.disabled = true;
                }
            });
        }

    })
})