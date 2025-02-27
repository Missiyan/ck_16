document.addEventListener("DOMContentLoaded", function () {
    // Калькулятор
    const num1 = document.getElementById("num1");
    const num2 = document.getElementById("num2");
    const result = document.getElementById("result");
    let currentOperation = null;

    function calculate(operation) {
        try {
            const n1 = parseFloat(num1.value);
            const n2 = parseFloat(num2.value);

            if (isNaN(n1) || isNaN(n2)) {
                throw new Error("Введите корректные числа.");
            }

            switch (operation) {
                case "+":
                    result.textContent = `Результат: ${n1 + n2}`;
                    break;
                case "-":
                    result.textContent = `Результат: ${n1 - n2}`;
                    break;
                case "*":
                    result.textContent = `Результат: ${n1 * n2}`;
                    break;
                case "/":
                    if (n2 === 0) throw new Error("Ошибка: деление на ноль.");
                    result.textContent = `Результат: ${n1 / n2}`;
                    break;
                default:
                    throw new Error("Выберите операцию.");
            }
        } catch (error) {
            result.textContent = error.message;
        }
    }

    function clearFields() {
        num1.value = "";
        num2.value = "";
        result.textContent = "";
        currentOperation = null;
    }

    document.querySelectorAll(".operation").forEach(button => {
        button.addEventListener("click", function () {
            currentOperation = this.textContent;
        });
    });

    document.getElementById("calculate").addEventListener("click", function () {
        if (currentOperation) {
            calculate(currentOperation);
        } else {
            result.textContent = "Выберите операцию.";
        }
    });

    document.getElementById("clear").addEventListener("click", function () {
        clearFields();
    });

    // Валидация даты
    function validateDate(input) {
        if (!input.value) return false;

        const date = new Date(input.value);
        const year = date.getFullYear();

        // Проверка на формат года (не менее 1900, не более текущего года, не больше 4 цифр)
        const yearRegex = /^\d{4}$/;
        if (year < 1900 || year > new Date().getFullYear() || !yearRegex.test(input.value)) {
            return false;
        }
        return true;
    }

    // Вычисление разницы между датами
    document.getElementById("calculateDifference").addEventListener("click", function () {
        try {
            const startDate = document.getElementById("startDate");
            const endDate = document.getElementById("endDate");
            const ageResult = document.getElementById("ageResult");

            if (!validateDate(startDate) || !validateDate(endDate)) {
                throw new Error("Некорректный ввод. Год должен быть не меньше 1900 и не больше текущего.");
            }

            const start = new Date(startDate.value);
            const end = new Date(endDate.value);

            if (end < start) {
                throw new Error("Дата окончания не может быть раньше даты начала.");
            }

            let years = end.getFullYear() - start.getFullYear();
            let months = end.getMonth() - start.getMonth();
            let days = end.getDate() - start.getDate();

            if (days < 0) {
                months--;
                days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
            }

            if (months < 0) {
                years--;
                months += 12;
            }

            ageResult.textContent = `Разница: ${years} лет, ${months} месяцев, ${days} дней`;
        } catch (error) {
            document.getElementById("ageResult").textContent = error.message;
        }
    });
});
