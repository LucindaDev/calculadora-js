
const screen = document.querySelector(".calc__pantalla")
const buttons = document.querySelectorAll(".calc__button");
let isResult = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const btnSelected = button.textContent;

        //#region Btn Igual.
        if (button.id === "btn-igual") {
            console.log(screen.textContent);
            try {
                screen.textContent = eval(screen.textContent);
                isResult = true;
            } catch (e) {
                console.log(e);
                screen.textContent = "Error!";

                switchButtons(true,"btn-c","btn-ce");
            }

            return;
        };

        //#region Btn C para reiniciar.
        if (button.id === "btn-c") {
            screen.textContent = "0";

            switchButtons(false,"btn-c");

            return;
        };

        //#region Btn CE para borrar.
        if (button.id === "btn-ce") {
            if (screen.textContent.length === 1 || screen.textContent === "Error!" || screen.textContent === "EEEE") {
                screen.textContent = "0";
                switchButtons(false);
            } else {
                screen.textContent = screen.textContent.slice(0, -1);
            }
            return;
        };


        //#region Estado inicial y agregar dígitos.
        ingresarDigitos(btnSelected);

        //#region Validación límite de dígitos.
        if (screen.textContent.length > 10) {
            screen.textContent = "EEEE"

                switchButtons(true,"btn-c","btn-ce");
        };

    });
});

const switchButtons = (state, ignoreBtn1, ignoreBtn2) => {
    buttons.forEach(button => {
        if(button.id === ignoreBtn1){
            return;
        }
        if(button.id === ignoreBtn2){
            return;
        }
        
        button.disabled = state;
    });
};

const ingresarDigitos = (btnSelected) => {
    if (screen.textContent === "0") {
        screen.textContent = btnSelected;
    } else {
        if (isResult == true) {
            screen.textContent = btnSelected;
            isResult = false;
        } else {
            screen.textContent += btnSelected;
        }
    };
}