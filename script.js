const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

convertBtn.addEventListener("click", async function () {

    const value = Number(amount.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!Number.isFinite(value) || value <= 0) {
        result.textContent = "Please enter a valid amount";
        return;
    }

    result.textContent = "Converting...";

    try {
        const response = await fetch(
            `https://open.er-api.com/v6/latest/${from}`
        );

        if (!response.ok) {
            throw new Error("Network error");
        }

        const data = await response.json();

        if (data.result !== "success" || !data.rates[to]) {
            throw new Error("Currency not supported");
        }

        const rate = data.rates[to];
        const convertedAmount = value * rate;

        result.textContent =
            `Converted Amount: ${convertedAmount.toLocaleString(
                "en-US",
                { maximumFractionDigits: 2 }
            )} ${to}`;

    } catch (error) {
        result.textContent =
            "Conversion failed. Check your internet and try again.";
    }
});