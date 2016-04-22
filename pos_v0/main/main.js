function printReceipt(inputs) {

  var receiptItems = buildReceiptItems(inputs);

  var receipts =buildReceipt(receiptItems)

  var receiptText = printReceiptText(receipts);

  console.log(receiptText);
}


function buildReceiptItems(cartItems) {
  var receiptItems = [];
  var subTotal = 0;

  cartItems.forEach(function (cartItem) {
    subTotal= cartItem.price * cartItem.count;
    receiptItems.push({cartItems:cartItem,subTotal:subTotal});
  });

  return receiptItems;
}


function buildReceipt(receiptItems){
  var receipts ={receiptItems:receiptItems,total:0};

  receiptItems.forEach(function(receiptItem){
    receipts.total+= receiptItem.subTotal;
  });

  return receipts;

}

function printReceiptText(receipts) {
  var receiptText = '';

  receipts.receiptItems.forEach(function (receiptItem){
    receiptText += '名称：' + receiptItem.cartItems.name + '，数量：' + receiptItem.cartItems.count +
      receiptItem.cartItems.unit + '，单价：' + receiptItem.cartItems.price.toFixed(2) + '(元)，小计：' +
      receiptItem.subTotal.toFixed(2) + '(元)\n';
  });

  receiptText = '***<没钱赚商店>收据***\n' +
    receiptText
    + '----------------------\n'
    + '总计：'+ receipts.total.toFixed(2) +'(元)\n'
    + '**********************';

  return receiptText;
}
