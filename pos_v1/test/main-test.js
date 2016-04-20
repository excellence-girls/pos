describe('pos', function () {
  var allItems;
  var inputs;
  var promotions;

    allItems = loadAllItems();
   var inputs = [
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

  describe('unit test',function(){
       describe('test buildCartItem()', function () {

         allItems = loadAllItems();
       it('output buidCartItem() :', function () {

         spyOn(console, 'log');
         printReceipt(inputs);
         var expectText =[
           {item: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, subtotal: 12}, count: 5},
           {item: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, subtotal: 30}, count: 2},
           {item: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, subtotal: 9}, count: 3}];

      expect(console.log).toHaveBeenCalledWith(expectText);
    });
       });

  describe('test getReceiptItems()', function () {

      promotions = loadPromotions();

       var cartItems =buildCartItems(inputs, allItems);


    it('output getReceiptItems() ', function () {

      spyOn(console, 'log');
      printReceipt(inputs);



      var expectText = [
        {
          items: [{item: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3, subtotal: 12}, count: 5},
            {item: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15, subtotal: 30}, count: 2},
            {item: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.5, subtotal: 9}, count: 3}],
          total: 51, promotionsCount: 7.5
        }
      ]


      expect(console.log).toHaveBeenCalledWith(expectText);
    });
  });
  describe('test getReceipt()', function () {



    it(' output getReceipt():', function () {

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


