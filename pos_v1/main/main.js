function printReceipt(inputs) {
  var allItems = loadAllItems();

  var promotions = loadPromotions();

  var cartItems = buildCartItems(inputs, allItems);


  var receiptItems = getReceiptItems(promotions, cartItems);

  var receipt = getReceipt(receiptItems);

  var receiptText = toReceiptText(receipt);
}

function buildCartItems(inputs, allItems) {
  var items = [];

  inputs.forEach(function (input) {
    var splitedArray = input.split("-");
    var barcode = splitedArray[0];
    var count = parseFloat(splitedArray[1] || 1);
    var item = findItem(barcode, allItems);
    var cartItem = findCartItem(barcode, items);
    if (cartItem) {
      cartItem.count++;
    }else {
      items.push({item: item, count: count});
    }
  });

  return items;
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
  var flag;

  allItems.forEach(function (items) {
    if (items.barcode === barcode) {
      flag = items;
    }
  });
  if (flag) {
    return flag;
  }else {
    return false;
  }
}


function getReceiptItems(promotions, cartItems) {
  var receiptItems = [];
  var total = 0;
  var promotionsCount = 0;
  cartItems.forEach(function (cartItem) {
    var isPromotions = checkIsPromotions(promotions, cartItem.item.barcode);

    if (isPromotions) {
      cartItem.item.subtotal = cartItem.item.price * (cartItem.count - 1);
      promotionsCount += cartItem.item.price;
    }else {
      cartItem.item.subtotal = cartItem.item.price * cartItem.count;

    }
    total += cartItem.item.subtotal;

  });
  receiptItems.push({items: cartItems, total: total, promotionsCount: promotionsCount});

  return receiptItems;
}

function checkIsPromotions(promotions, name) {
  var flag;

  promotions[0].barcodes.forEach(function (barcode) {
    if (barcode === name) {
      flag = barcode;
    }
  });
  if (flag) {
    return true;
  }else {
    return false;
  }
}

function getReceipt(receiptItems) {
  var receipt = '';
  receiptItems[0].items.forEach(function (receiptItem) {
    receipt += '名称：' + receiptItem.item.name + '，数量：' + receiptItem.count +
      receiptItem.item.unit + '，单价：' + receiptItem.item.price.toFixed(2) + '(元)，小计：' +
      receiptItem.item.subtotal.toFixed(2) + '(元)\n';
  });
  receipt = '***<没钱赚商店>收据***\n' + receipt + '----------------------\n' + '总计：' +
    receiptItems[0].total.toFixed(2) + '(元)\n' + '节省：' + receiptItems[0].promotionsCount.toFixed(2)
    + '(元)\n' + '**********************';
  return receipt;
}


function toReceiptText(receipt) {
 console.log(receipt);
}
