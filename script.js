let orders = JSON.parse(localStorage.getItem("orders")) || [];

const pancakeType = document.querySelector("#type");
const toppings = document.querySelectorAll(".topping");
const extras = document.querySelectorAll(".extra");
const totalPriceDisplay = document.querySelector("#totalPriceDisplay");
const totalPriceBanner = document.querySelector("#totalPrice");
const pancakeForm = document.querySelector("#pancakeForm");
const seeOrderBtn = document.getElementById("seeOrder");
const summaryText = document.getElementById("summaryText");
const deliveryRadios = document.querySelectorAll("input[name='delivery']");

const changeHandler = () => {
  const basePrice = parseFloat(pancakeType.selectedOptions[0].dataset.price);

  const toppingTotal = [
    ...document.querySelectorAll(".topping:checked"),
  ].reduce((sum, topping) => sum + parseFloat(topping.dataset.price), 0);

  const extraTotal = [...document.querySelectorAll(".extra:checked")].reduce(
    (sum, extra) => sum + parseFloat(extra.dataset.price),
    0
  );

  const deliveryTotal = [
    ...document.querySelectorAll("input[name='delivery']:checked"),
  ].reduce((sum, delivery) => sum + parseFloat(delivery.dataset.price), 0);

  const totalPrice = basePrice + toppingTotal + extraTotal + deliveryTotal;
  totalPriceDisplay.textContent = `${totalPrice}€`;
  totalPriceBanner.textContent = `${totalPrice}€`;
};

pancakeForm.addEventListener("change", changeHandler);
seeOrderBtn.addEventListener("click", () => {
  const customerName = document.getElementById("customerName").value;
  const pancakeTypeValue = pancakeType.options[pancakeType.selectedIndex].text;
  const toppingsList = [...document.querySelectorAll(".topping:checked")]
    .map((topping) => topping.parentNode.textContent.trim())
    .join(", ");
  const extrasList = [...document.querySelectorAll(".extra:checked")]
    .map((extra) => extra.parentNode.textContent.trim())
    .join(", ");
  const selectedDelivery = document.querySelector(
    "input[name='delivery']:checked"
  );
  const deliveryMethod = selectedDelivery
    ? selectedDelivery.parentNode.textContent
    : "No delivery method selected";

  summaryText.textContent = `Order created by ${customerName} for ${pancakeTypeValue} with ${
    toppingsList || "No toppings selected"
  } and ${
    extrasList || "No extras selected"
  }. Delivery method: ${deliveryMethod}`;

  console.log(summaryText.textContent);

  const order = {
    orderId: Date.now(),
    customerName,
    pancakeType: pancakeTypeValue,
    extraToppings: toppingsList,
    deliveryMethod,
    totalPrice: parseFloat(totalPriceDisplay.textContent),
    status: "Pending",
  };

  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  document.getElementById("orderForm").reset();
  alert(
    "Order submitted successfully! Go to the 'All Orders' page to view your order."
  );
});
