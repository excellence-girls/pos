//TODO: Please write code in this file.
function printReceipt(inputs) {

 var item = {items:inputs,allPrice:0} ;
  var subtTotal ;
  var accounts = '';
    for(var i = 0 ; i < inputs.length; i++)
    {
      item.items[i].subtTotal = inputs[i].price * inputs[i].count;
      item.allPrice+= item.items[i].subtTotal;
      
      accounts+= '名称：' + inputs[i].name +',' + '数量：' + inputs[i].count
      +inputs[i].unit +',' + '单价：' + inputs[i].price +'.00(元)，小计：' +
       item.items[i].subtTotal + '.00(元)' + '\n'; 
    } 
    accounts = '***<没钱赚商店>收据***' + '\n' + accounts + '----------------------' + '\n' +'总计：' +
     item.allPrice + '.00(元)' +'\n' +'**********************';
     console.log(accounts) ;
}