class ShoppingList {
  constructor() {
    this.list = [];
  }
  add(item) {
    this.list.push(item);
    alert(`Successfully added ${item.Name} to list!`);
  }
  edit(item, changes) {
    if ((item !== '' || item !== ' ') && (changes !== '' || changes !== ' ')) {
      this.list[item] = changes;
    }
    alert('Invalid input!');
  }
  remove(item) {
    let foundItem = myList.list.find((object) => object.Name === item);
    if (foundItem !== undefined) {
      alert(`${foundItem.Name} removed!`);
      this.list.splice(this.list.indexOf(foundItem), 1);
    } else {
      alert('Item not found in list!');
    }
  }
  listItems(type) {
    let filteredList = this.list.sort();
    if (type !== '' && type !== undefined) {
      filteredList = this.list.filter((item) => item.ClothingType === type).sort();
    }
    if (filteredList.length > 0) {
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
      alert('No items found.');
    }
  }
  findTotal() {
    let total = 0;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].Discount > 0) {
        total += this.list[i].Price - this.list[i].Price * this.list[i].Discount;
      } else {
        total += this.list[i].Price;
      }
    }
    alert(`Total cost of all items: $${total}`);
  }
}

let inputInvalid = (input) => input === ' ' || input === '' || input === undefined;

function createClothing() {
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

  return {
    Name: name,
    ClothingType: type,
    Size: size,
    Brand: brand,
    Discount: discount,
    Price: price,

    calculateDiscount() {
      if (this.Discount !== undefined && this.Discount > 0) {
        return `${this.Name} is $${this.Price * this.Discount} off!`;
      }
      return `${this.Name} is not on sale!`;
    },
  };
}

const myList = new ShoppingList();

while (true) {
  let action = prompt('Enter an action (add, remove, list, edit, calculate discount, find total) or type "exit" to quit:');

  if (action === 'exit') {
    break;
  }

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
      let foundItem = myList.list.find((item) => item.Name === itemToEdit);
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
