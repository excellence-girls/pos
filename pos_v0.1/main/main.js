//TODO: Please write code in this file.

function printReceipt(items) {

  var cartItems = buildCartItems(items);

  var receiptItems = buildReceiptItems(cartItems);

  var receipt = buildReceipt(receiptItems);

  var receiptText = printReceiptText(receipt)

  console.log(receiptText);
}

function buildCartItems(items) {
  var cartItems = [];
  items.forEach(function (item) {
    var cartItem = findCartItem(item.barcode, cartItems);
    if (cartItem) {
      cartItem.count++;
    }
    else {
      cartItems.push({item: item, count: 1});
    }
  });
  return cartItems;
}


function findCartItem(barcode, cartItems) {
  var flag = false;

  cartItems.forEach(function (cartItem) {
    if (cartItem.item.barcode === barcode) {
      flag = cartItem;
    }
  });

  return flag;
}


function buildReceiptItems(cartItems) {
  var receiptItems = [];
  var subTotal = 0;

  cartItems.forEach(function (cartItem) {
    subTotal = cartItem.item.price * cartItem.count;
    receiptItems.push({cartItems: cartItem, subTotal: subTotal});
  });

  return receiptItems;
}


function buildReceipt(receiptItems) {
  var receipt = {receiptItems: receiptItems, total: 0};

  receiptItems.forEach(function (receiptItem) {
    receipt.total += receiptItem.subTotal;
  });

  return receipt;
}


function printReceiptText(receipt) {
  var receiptText = '';

  receipt.receiptItems.forEach(function (receiptItem) {
    receiptText += '名称：' + receiptItem.cartItems.item.name + '，数量：' + receiptItem.cartItems.count +
      receiptItem.cartItems.item.unit + '，单价：' + receiptItem.cartItems.item.price.toFixed(2) + '(元)，小计：' +
      receiptItem.subTotal.toFixed(2) + '(元)\n';
  });

  receiptText = '***<没钱赚商店>收据***\n' +
    receiptText
    + '----------------------\n'
    + '总计：' + receipt.total.toFixed(2) + '(元)\n'
    + '**********************';

  return receiptText;
}






