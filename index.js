import confetti from 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.module.mjs';


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
                if (screen.textContent === "222+222") {
                    confetti();
                }
                screen.textContent = eval(screen.textContent);
                isResult = true;
            } catch (e) {
                console.log(e);
                screen.textContent = "Error!";

                switchButtons(true, "btn-c", "btn-ce");
            }

            return;
        };

        //#region Btn C para reiniciar.
        if (button.id === "btn-c") {
            screen.textContent = "0";

            switchButtons(false, "btn-c");

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

            switchButtons(true, "btn-c", "btn-ce");
        };

    });
});

const switchButtons = (state, ignoreBtn1, ignoreBtn2) => {
    buttons.forEach(button => {
        if (button.id === ignoreBtn1) {
            return;
        }
        if (button.id === ignoreBtn2) {
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


document.addEventListener("keydown", function (e) {
    const availableKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "+", "-", "/", "*", "Backspace", "Enter", "Escape"];
    const actionKeys = ["Backspace", "Enter", "Escape"]

    // Verifica si el texto de la pantalla es "EEEE"
    if (screen.textContent === "EEEE") {
        // Solo permite "Backspace" y "Escape" cuando la pantalla muestra "EEEE"
        if (e.key === "Backspace" || e.key === "Escape") {
            if (e.key === "Backspace") {
                screen.textContent = "0";
                switchButtons(false);
            } else if (e.key === "Escape") {
                screen.textContent = "0";
                switchButtons(false, "btn-c");
            }
        }
        // Previene todas las demás teclas cuando está en el estado "EEEE"
        return;
    }

    if (!availableKeys.includes(e.key)) {
        return;
    }

    if (!actionKeys.includes(e.key)) {
        ingresarDigitos(e.key);
    }

    if (e.key === "Enter") {
        try {
            if (screen.textContent === "222+222") {
                confetti();
            }
            screen.textContent = eval(screen.textContent);
            isResult = true;
        } catch (e) {
            console.log(e);
            screen.textContent = "Error!";

            switchButtons(true, "btn-c", "btn-ce");
        }

        return;
    };

    if (e.key === "Backspace") {
        if (screen.textContent.length === 1 || screen.textContent === "Error!" || screen.textContent === "EEEE") {
            screen.textContent = "0";
            switchButtons(false);
        } else {
            screen.textContent = screen.textContent.slice(0, -1);
        }
        return;
    }

    if (e.key === "Escape") {
        screen.textContent = "0";

        switchButtons(false, "btn-c");

        return;
    };

    if (screen.textContent.length > 10) {
        screen.textContent = "EEEE"

        switchButtons(true, "btn-c", "btn-ce");
    };

});