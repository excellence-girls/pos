describe('pos', function() {
  var allItems;
  var inputs;

  beforeEach(function() {
    allItems = loadAllItems();
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });
 describe('unit test',function() {
   describe('buildCartItems test', function () {

     it('return buildCartItems:', function () {
       allItems = loadAllItems();

       var cartItems= buildCartItems(inputs,allItems);

       var expectText =[
         {item: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3}, count: 5},
         {item: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15}, count: 2},
         {item: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5}, count: 3}];

       expect(cartItems).toEqual(expectText);
     });
   });
   describe('buildReceiptItems test', function () {

     it('return buildReceiptItems:', function () {

       promotions = loadPromotions();

       var cartItems= [
         {item: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3}, count: 5},
         {item: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15}, count: 2},
         {item: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5}, count: 3}];

       var receiptItems =buildReceiptItems(promotions,cartItems);

       var expectTect=[
         {cartItem:{item: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3}, count: 5}, savingSubTotal: 3, subTotal: 12},
         {cartItem:{item: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15}, count: 2}, savingSubTotal: 0, subTotal: 30},
         {cartItem:{item: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5}, count: 3}, savingSubTotal: 4.5, subTotal: 9}];


       expect(receiptItems).toEqual(expectTect);
     });
   });
   describe('buidReceipt test', function () {

     it('return buidReceipt:', function () {

       var receiptItems =[
         {cartItem:{item: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3}, count: 5}, savingSubTotal: 3, subTotal: 12},
         {cartItem:{item: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15}, count: 2}, savingSubTotal: 0, subTotal: 30},
         {cartItem:{item: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5}, count: 3}, savingSubTotal: 4.5, subTotal: 9}];

       var receipt = buidReceipt(receiptItems);


       var expectText ={receiptItems:[
       {cartItem:{item: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3}, count: 5}, savingSubTotal: 3, subTotal: 12},
       {cartItem:{item: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15}, count: 2}, savingSubTotal: 0, subTotal: 30},
       {cartItem:{item: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5}, count: 3}, savingSubTotal: 4.5, subTotal: 9}],
       savingTotal :7.5,total:51}
     ;
       expect(receipt).toEqual(expectText);
     });
   });

 });
 describe('integration test',function() {
   describe('receiptText test', function () {

     it('return receiptText:', function () {

       spyOn(console, 'log');

       printReceipt(inputs);

       var expectText =
         '***<没钱赚商店>收据***\n' +
         '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
         '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
         '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
         '----------------------\n' +
         '总计：51.00(元)\n' +
         '节省：7.50(元)\n' +
         '**********************';

       expect(console.log).toHaveBeenCalledWith(expectText);
     });
   });
 });
});

