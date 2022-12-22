let royal = document.getElementById("seats-royal");
let seatrow = Number(royal.getAttribute("seatrow"));
let seatcol = Number(royal.getAttribute("seatcol"));
let currentrow;
// for(let i=0;i<seatrow;i++){
//     royal.innerHTML = royal.innerHTML + `<div class='row' id='row-${i}'><span class="light-grey-text">${String.fromCharCode(65+i)} &nbsp; &nbsp; </span></div>&nbsp;`;
//     currentrow = document.getElementById(`row-${i}`);
//     for(let j=0;j<seatcol;j++){
//         currentrow.innerHTML = currentrow.innerHTML + `<a class='seat pointer' id="r-${j}">${j+1}</a>`;
//     }
// }

for(let i=0;i<seatrow;i++){
  royal.innerHTML = royal.innerHTML + `<div class='row' id='row-${i}'><span class="light-grey-text">${String.fromCharCode(65+i)} &nbsp; &nbsp; </span></div>&nbsp;`;
  currentrow = document.getElementById(`row-${i}`);
  for(let j=0;j<seatcol;j++){
    currentrow.innerHTML = currentrow.innerHTML + `<a class='seat pointer' id="r-${i}-${j}">${j+1}</a>`;
  }
}

//With out Local storage
// const seats = document.querySelectorAll('.seat');
// const ticketPrice = document.getElementById('ticket-price').textContent;

// let selectedSeats = [];
// let ticketCount = 0;
// let ticketTotal = 0;



// seats.forEach(seat => {
//   seat.addEventListener('click', e => {
 
//     if (seat.classList.contains('selected')) {
//       seat.classList.remove('selected');
//       ticketCount--;
    
//     } else {
//       seat.classList.add('selected');
//       ticketCount++;
//     }
   
//     ticketTotal = ticketCount * ticketPrice;
  
//     console.log(`${ticketCount} tickets, total cost: ${ticketTotal}`);
//   });
// });



//With Local storage


const seats = document.querySelectorAll('.seat');
const ticketPrice = document.getElementById('ticket-price').textContent;

const storagePrefix = 'seatbooking-';
let selectedSeats = [];
let ticketCount = 0;
let ticketTotal = 0;

// Check if there is any data stored in local storage
if (localStorage.getItem(storagePrefix + 'selectedSeats')) {
  // If there is, retrieve the stored data
  selectedSeats = JSON.parse(localStorage.getItem(storagePrefix + 'selectedSeats'));
  ticketCount = Number(localStorage.getItem(storagePrefix + 'ticketCount'));
  ticketTotal = ticketCount * ticketPrice;
}

// Loop through the seats and add a click event listener to each
seats.forEach(seat => {
  // If the seat is in the selected seats array, add the 'selected' class and set the occupied color
  if (selectedSeats.includes(seat.id)) {
    seat.classList.add('selected');
    seat.style.backgroundColor = 'grey';
  }
  // Add a click event listener to the seat
  seat.addEventListener('click', e => {
    // If the seat has the 'selected' class, remove it and decrement the ticket count
    if (seat.classList.contains('selected')) {
      seat.classList.remove('selected');
      ticketCount--;
      // Remove the seat from the selected seats array
      selectedSeats = selectedSeats.filter(s => s !== seat.id);
      // Otherwise, add the 'selected' class and increment the ticket count
    } else {
      seat.classList.add('selected');
      ticketCount++;
      // Add the seat to the selected seats array
      selectedSeats.push(seat.id);
    }
    // Update the ticket total based on the ticket count and price
    ticketTotal = ticketCount * ticketPrice;
    // Display the ticket count and total
    console.log(`${ticketCount} tickets, total cost: ${ticketTotal}`);
    // Store the selected seats and ticket count in local storage
    localStorage.setItem(storagePrefix + 'selectedSeats', JSON.stringify(selectedSeats));
    localStorage.setItem(storagePrefix + 'ticketCount', ticketCount);
  });
});