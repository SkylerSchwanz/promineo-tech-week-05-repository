// Define a class called ShoppingList
class ShoppingList {
  // Constructor function that initializes the `list` property as an empty array
  constructor() {
    this.list = [];
  }
  // Method to add a new item (an object) to the shopping list array
  add(item) {
    this.list.push(item);
    // Alert message to confirm that the item was successfully added to the list
    alert(`Successfully added ${item.Name} to list!`);
  }
  // Method to edit an existing item in the shopping list array
  edit(item, changes) {
    // Check if `item` and `changes` arguments are not empty strings or spaces
    if ((item !== '' || item !== ' ') && (changes !== '' || changes !== ' ')) {
      // Reassign the object in the `list` array using bracket notation
      this.list[item] = changes;
    }
    // Alert message to indicate that the input is invalid
    alert('Invalid input!');
  }
  // Method to remove an item from the shopping list array
  remove(item) {
    // Variable to store the item to be removed from the `list` array
    let foundItem = myList.list.find((object) => object.Name === item);
    // Check if the item exists in the `list` array
    if (foundItem !== undefined) {
      // Alert message to indicate that the item was removed from the list
      alert(`${foundItem.Name} removed!`);
      // Remove the item using splice method and the item's index
      this.list.splice(this.list.indexOf(foundItem), 1);
    } else {
      // Alert message to indicate that the item was not found in the list
      alert('Item not found in list!');
    }
  }
  // Method to list all items in the shopping list array
  listItems(type) {
    // Variable to store the sorted `list` array
    let filteredList = this.list.sort();
    // Check if `type` argument is not an empty string or undefined
    if (type !== '' && type !== undefined) {
      // Reassign `filteredList` to a new array that only contains items of the specified `type`
      filteredList = this.list.filter((item) => item.ClothingType === type).sort();
    }
    // Check if there are items in `filteredList`
    if (filteredList.length > 0) {
      // Alert message to display the item details for each item in the `filteredList` array
      alert(
        filteredList
          .map((item) => {
            return `Name: ${item.Name}, Clothing Type: ${item.ClothingType}, Size: ${item.Size}, Brand: ${item.Brand}, Price: $${item.Price}, Discount: $${
              item.Price * item.Discount
            }`;
          })
          .join('\n')
      );
    } else {
      // Alert message to indicate that no items were found in the list
      alert('No items found.');
    }
  }
  // Method to calculate the total cost of all items in the shopping list array
  findTotal() {
    // Variable to store the total cost of all items in the `list` array
    let total = 0;
    // Loop through each item in the `list` array
    for (let i = 0; i < this.list.length; i++) {
      // Check if the item has a discount
      if (this.list[i].Discount > 0) {
        // Calculate the discounted price of the item and add it to the `total` variable
        total += this.list[i].Price - this.list[i].Price * this.list[i].Discount;
      } else {
        // Add the price of the item to the 'total' variable
        total += this.list[i].Price;
      }
    }
    // Alert the browser the price of all the items
    alert(`Total cost of all items: $${total}`);
  }
}

// Arrow function returning a boolean if input (string) is empty or undefined;
let inputInvalid = (input) => input === ' ' || input === '' || input === undefined;

// Factory function returning clothing objects with properties and method(s).
function createClothing() {
  // line 90 - 115 are prompts which assign the property values returned from lime 121 - 127.
  const name = prompt('Enter the name of the clothing item:');
  if (inputInvalid(name)) {
    alert('Invalid input');
    return undefined;
  }
  const type = prompt('Enter the type of clothing (Top, Bottom, Shoes, Accessories, etc.):');
  if (inputInvalid(type)) {
    alert('Invalid input');
    return undefined;
  }
  const size = prompt('Enter the size of the clothing item:');
  if (inputInvalid(size)) {
    alert('Invalid input');
    return undefined;
  }
  const brand = prompt('Enter the brand of the clothing item:');
  if (inputInvalid(brand)) {
    alert('Invalid input');
    return undefined;
  }
  const price = parseFloat(prompt('Enter the price of the clothing item:'));
  if (inputInvalid(price)) {
    alert('Invalid input');
    return undefined;
  }
  const discount = parseFloat(prompt('Enter the discount percentage as a decimal (e.g. 0.2 for 20% off):'));
  if (inputInvalid(discount)) {
    alert('Invalid input');
    return undefined;
  }

  // Returning an object with a calculateDiscount method and all property values assigned
  return {
    Name: name,
    ClothingType: type,
    Size: size,
    Brand: brand,
    Discount: discount,
    Price: price,

    calculateDiscount() {
      // Determine if Discount is not undefined and greater than 0
      if (this.Discount !== undefined && this.Discount > 0) {
        return `${this.Name} is $${this.Price * this.Discount} off!`;
      }
      return `${this.Name} is not on sale!`;
    },
  };
}

// Instanciating a new ShoppingList object with myList.
const myList = new ShoppingList();

// Creating a while loop to ensure a prompt is always open, unless case is exit. 
while (true) {
  // First prompt (action) determining the user's command.
  let action = prompt('Enter an action (add, remove, list, edit, calculate discount, find total) or type "exit" to quit:');

  // Break the loop if user wants to exit
  if (action === 'exit') {
    break;
  }

  // Switch statement to handle the other cases and invoking the required method/function.
  switch (action) {
    case 'add':
      const newItem = createClothing();
      if (newItem !== undefined) {
        myList.add(newItem);
      }
      break;
    case 'remove':
      const itemToRemove = prompt('Enter the name of the item to remove:');
      myList.remove(itemToRemove);
      break;
    case 'list':
      const typeToFilter = prompt('Enter a type of clothing to filter by (optional):');
      myList.listItems(typeToFilter);
      break;
    case 'find total':
      myList.findTotal();
      break;
    case 'calculate discount':
      const itemToCalculate = prompt('Enter the name of the item to calculate the discount for:');
      let item = myList.list.find((object) => object.Name === itemToCalculate);
      if (item !== undefined) {
        alert(item.calculateDiscount());
      } else {
        alert('Item not found in list!');
      }
      break;
    case 'edit':
      const itemToEdit = prompt('Enter the name of the item to edit:');
      // Attempting to find the object user wants to edit
      let foundItem = myList.list.find((item) => item.Name === itemToEdit);
      // Determining if the item was found (not undefined). Otherwise alert the browser 'Item does not exist!'
      if (foundItem != undefined) {
        const propertyToEdit = prompt('What property do you need to edit: (Name, ClothingType, Size, Brand, Discount, Price)');
        if (foundItem.hasOwnProperty(propertyToEdit)) {
          const change = prompt(`What would you like to set ${propertyToEdit} to?`);
          foundItem[propertyToEdit] = change;
          alert(`${propertyToEdit} was successfully set to ${change}!`);
        }
        break;
      }
      alert('Item does not exist!');
    default:
      alert('Invalid action, please try again.');
      break;
  }
}
