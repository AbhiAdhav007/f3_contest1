// getMenu() function: Fetch food items from the JSON and display them
// let firstScript = document.getElementsByTagName("script")[0];
// firstScript.addEventListener("load" , getMenu)
let foods;
async function getMenu() {
    try {
      
    let response = await fetch(`https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`)

    let result = await response.json();
    
    foods = result;
    for(let i = 0 ; i < result.length; i++){

        let Container = document.getElementsByClassName("container")[0];

        let item = result[i];

        let food = document.createElement("div")
        food.className = "food-info"
        food.innerHTML = `<img src="${item.imgSrc}" alt="">
        <div class="specs">
        <p>Name:${item.name}</p>
        <p>Price:${item.price}$</p>
        </div>
        <span class="material-symbols-outlined btn">
            done
            </span>`;

            Container.append(food);


    }   
    } catch (error) {
      console.log("Error fetching menu:", error);
    }
  }
  
  // takeOrder() function: Return a promise that resolves after 2500 milliseconds
  function takeOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const burgers = foods;
        const order = {
          burgers: burgers.sort(() => 0.5 - Math.random()).slice(0, 3) // Select 3 random burgers
        };
        resolve(order);
      }, 2500);
    });
  }
  
  // orderPrep() function: Return a promise that resolves after 1500 milliseconds
  function orderPrep() {
    return new Promise(resolve => {
      setTimeout(() => {
        const orderStatus = true;
        const paid = false;
        resolve({ order_status: orderStatus, paid });
      }, 1500);
    });
  }
  
  // payOrder() function: Return a promise that resolves after 1000 milliseconds
  function payOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const orderStatus = true;
        const paid = true;
        resolve({ order_status: orderStatus, paid });
      }, 1000);
    });
  }
  
  // thankyouFnc() function: Display an alert message on the screen
  function thankyouFnc() {
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert";
    alertDiv.textContent = "Thank you for eating with us today!";
    document.body.appendChild(alertDiv);
    window.alert("Thank you for eating with us today!")
  }
  
  // Function to handle the promises sequentially
  async function handlePromises() {
    try {
      await getMenu(); // Fetch and display the menu
      console.log("Menu:",foods)
      console.log("Note:Go below and click order now to take the orders")
  
      const orderBtn = document.getElementById("order-btn");
      orderBtn.addEventListener("click", async () => {
        const order = await takeOrder();
        console.log("Order:", order);
  
        const orderPrepResult = await orderPrep();
        console.log("Order Preparation Status:", orderPrepResult);
  
        const payOrderResult = await payOrder();
        console.log("Payment Status:", payOrderResult);
  
        thankyouFnc();
      });
    } catch (error) {
      console.log("Error:", error);
    }
  }
  //
  // Call the function to start the process now
  handlePromises();
  