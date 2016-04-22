function printReceipt(inputs) {
   var allItems = loadAllItems();
   var cartItems = buildCartItems(inputs,allItems);

   var receiptItems = buildReceiptItems(cartItems);
   console.log(receiptItems);
   var receipt = buidReceipt(receiptItems);

   var receiptText = printReceiptText(receipt);


   console.log(receiptText);
 }

function buildCartItems(inputs, allItems) {
  var cartItems = [];

  inputs.forEach(function (input) {
    var item = findItem(input, allItems);
    var cartItem = findCartItem(input, cartItems);

    if (cartItem) {
      cartItem.count++;
    }else {
      cartItems.push({item: item, count:1});
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


function buildReceiptItems(cartItems) {
  var receiptItems = [];
  var subTotal = 0;

  cartItems.forEach(function (cartItem) {
      subTotal= cartItem.item.price * cartItem.count;
     receiptItems.push({cartItems:cartItem,subTotal:subTotal});
  });

  return receiptItems;
}

  function buidReceipt(receiptItems){
    var receipt ={receiptItems:receiptItems,total:0};

    receiptItems.forEach(function(receiptItem){
      receipt.total+= receiptItem.subTotal;
    });

    return receipt;

  }

  function printReceiptText(receipt) {
    var receiptText = '';

    receipt.receiptItems.forEach(function (receiptItem){
      receiptText += '名称：' + receiptItem.cartItems.item.name + '，数量：' + receiptItem.cartItems.count +
        receiptItem.cartItems.item.unit + '，单价：' + receiptItem.cartItems.item.price.toFixed(2) + '(元)，小计：' +
        receiptItem.subTotal.toFixed(2) + '(元)\n';
    });

    receiptText = '***<没钱赚商店>收据***\n' +
      receiptText
      + '----------------------\n'
      + '总计：'+ receipt.total.toFixed(2) +'(元)\n'
      + '**********************';

    return receiptText;
  }
