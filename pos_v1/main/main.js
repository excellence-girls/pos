function printReceipt(inputs) {
  var allItems = loadAllItems();

  var promotions = loadPromotions();

  var cartItems = buildCartItems(inputs, allItems);

  var receiptItems = buildReceiptItems(promotions, cartItems);

  var receipt = buidReceipt(receiptItems);

  var receiptText = printReceiptText(receipt);

  console.log(receiptText);
}


function buildCartItems(inputs, allItems) {
  var cartItems = [];

  inputs.forEach(function (input) {
    var splitedArray = input.split("-");
    var barcode = splitedArray[0];
    var count = parseFloat(splitedArray[1] || 1);
    var item = findItem(barcode, allItems);
    var cartItem = findCartItem(barcode, cartItems);

    if (cartItem) {
      cartItem.count++;
    } else {
      cartItems.push({item: item, count: count});
    }
  });

  return cartItems;
}


function findCartItem(barcode, items) {
  var flag;

  for (var i = 0; i < items.length; i++) {
    if (items[i].item.barcode === barcode) {
      flag = items[i];
    }
  }

  return flag;
}


function findItem(barcode, allItems) {
  var flag = false;

  allItems.forEach(function (items) {
    if (items.barcode === barcode) {
      flag = items;
    }
  });

  return flag;
}


function buildReceiptItems(promotions, cartItems) {
  var receiptItems = [];
  var subTotal;
  var savingSubTotal = 0;

  cartItems.forEach(function (cartItem) {
    subTotal = cartItem.item.price * cartItem.count;
    var isPromotions = checkIsPromotions(promotions, cartItem.item.barcode);


    if (isPromotions) {
      savingSubTotal = cartItem.item.price * parseInt(cartItem.count / 3);
      subTotal = cartItem.item.price * (cartItem.count - parseInt(cartItem.count / 3));
    }
    ;
    receiptItems.push({cartItem: cartItem, savingSubTotal: savingSubTotal, subTotal: subTotal});
  });

  return receiptItems;
}


function checkIsPromotions(promotions, name) {
  var flag = false;

  promotions[0].barcodes.forEach(function (barcode) {
    if (barcode === name) {
      flag = barcode;
    }
  });

  return true;
}


function buidReceipt(receiptItems) {
  var receipt = {receiptItems: receiptItems, savingTotal: 0, total: 0};

  receiptItems.forEach(function (receiptItem) {
    receipt.savingTotal += receiptItem.savingSubTotal;
    receipt.total += receiptItem.subTotal;
  });

  return receipt;
}


function printReceiptText(receipt) {
  var receiptText = '';

  receipt.receiptItems.forEach(function (receiptItem) {
    receiptText += '名称：' + receiptItem.cartItem.item.name + '，数量：' + receiptItem.cartItem.count +
      receiptItem.cartItem.item.unit + '，单价：' + receiptItem.cartItem.item.price.toFixed(2) + '(元)，小计：' +
      receiptItem.subTotal.toFixed(2) + '(元)\n';
  });

  receiptText = '***<没钱赚商店>收据***\n' +
    receiptText
    + '----------------------\n'
    + '总计：' + receipt.total.toFixed(2) + '(元)\n'
    + '节省：' + receipt.savingTotal.toFixed(2) + '(元)\n'
    + '**********************';

  return receiptText;
}



