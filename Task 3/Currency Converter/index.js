let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");


currencies.forEach((currency) => {
    const [code, country] = currency.split(" - ");
  const option = document.createElement("option");
  option.value = code;
  option.text = `${code} - ${country}`;
  fromDropDown.add(option);
  });
  
  // Repeat same thing for the other dropdown
  currencies.forEach((currency) => {
    const [code, country] = currency.split(" - ");
  const option = document.createElement("option");
  option.value = code;
  option.text = `${code} - ${country}`;
  toDropDown.add(option);
  });
  
  // Setting default values
  fromDropDown.value = "USD";
  toDropDown.value = "INR";
  
  let convertCurrency = () => {
    // Create References
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;
  
    // If amount input field is not empty
    if (amount.length != 0) {
      fetch(api)
        .then((resp) => resp.json())
        .then((data) => {
          if (data.conversion_rates) {
            let fromExchangeRate = data.conversion_rates[fromCurrency];
            let toExchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
            const result = document.querySelector("#result");
            result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
          } else {
            alert("Error fetching exchange rates");
          }
        })
        .catch((error) => {
          console.error("Error fetching exchange rates:", error);
          alert("Error fetching exchange rates");
        });
    } else {
      alert("Please fill in the amount");
    }
  };
  
  document.querySelector("#convert-button").addEventListener("click", convertCurrency);
  window.addEventListener("load", convertCurrency);