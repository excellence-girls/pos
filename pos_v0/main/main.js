function printReceipt(Items) {

  var cartItems = buildCartItems(Items);
  var receiptList = buildReceiptList(cartItems);
  console.log(receiptList);

}


function buildCartItems(Items) {

  var cartItems = [];

  Items.forEach(function (element) {
    cartItems.push({item: element, subTotal: element.count * element.price   })
  });

  return cartItems;
}



function buildReceiptList(cartItems) {

  var totalMoney = 0;
  cartItems.forEach(function(element) {
    totalMoney += element.subTotal;
  });


  var finalCartItems = [];
  finalCartItems.push({cartItems: cartItems, total:totalMoney});

  var receiptList = '***<没钱赚商店>收据***\n';

  cartItems.forEach(function (element) {
    receiptList += '名称：' + element.item.name + '，数量：' + element.item.count + element.item.unit + '，单价：' + element.item.price.toFixed(2) + '(元)，小计：' + element.subTotal.toFixed(2) + '(元)\n';
  });
  receiptList += '----------------------\n' + '总计：' + finalCartItems.total + '(元)\n' + '**********************';

  return receiptList;
}


