function printReceipt(inputs) {
   var allItems = loadAllItems();	
  
   var items = buildItems(inputs,allItems);

   var cartItems = getCartItems(items);
   var receiptItems = getReceiptItems(cartItems);
   var receipt = getReceipt(receiptItems);
   var receiptText = toReceiptText(receipt);
 }

function buildItems(inputs,allItems){
	 var items = [];
   inputs.forEach(function(input){
     var barcode = findItemBarcode(input,allItems);
         if(barcode)
           	{ items.push(barcode);}
   }); 
   return items;
}

function findItemBarcode(input,allItems){
	var flag;
  allItems.forEach(function(items){
    if(items.barcode === input)
                  {flag = items;}
  });
  if(flag)
  { return flag;}
  else
  { return false;}
}    

function getCartItems(items) {
  var cartItems = [] ;
  items.forEach(function(item) {
   var cartItem =findCartItem(item.barcode, cartItems);
   if(cartItem)
    { cartItem.count++;}
   else
    { cartItems.push({item:item,count:1});}  
});
  return cartItems;
}
 

 function findCartItem(barcode, cartItems) {
  var flag ;
   cartItems.forEach(function(cartItem){
    if(cartItem.item.barcode === barcode)
      {flag = cartItem;}
    
   });
    if(flag)
     {return  flag ;}
    else
      { return false ;}
   
}   

 function getReceiptItems(cartItems) {
  var receiptItems = [] ;
  var total = 0;
  cartItems.forEach(function(cartItem){
     cartItem.item.subtotal = cartItem.item.price * cartItem.count;
    total+=cartItem.item.subtotal ;

  });
  receiptItems.push({ items: cartItems, total: total }); 
  return receiptItems;
}
  

function getReceipt(receiptItems) {
  var receipt = '';
  receiptItems[0].items.forEach(function(receiptItem){
  receipt+= '名称：' + receiptItem.item.name + '，数量：' + receiptItem.count +
   receiptItem.item.unit + '，单价：' + receiptItem.item.price.toFixed(2)+ '(元)，小计：' +
  receiptItem.item.subtotal.toFixed(2) + '(元)\n';
});
 receipt = '***<没钱赚商店>收据***\n' +  receipt + '----------------------\n' + '总计：' +
  receiptItems[0].total.toFixed(2) + '(元)\n' + '**********************';
  return receipt;
}



function toReceiptText(receipt) {
 console.log(receipt);
}
