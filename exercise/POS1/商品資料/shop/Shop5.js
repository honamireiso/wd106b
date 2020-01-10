const Shop5 = {}

Shop5.shop = {
  name: '早安! 美味堡',
  address: '金門縣金湖鎮漁村 107 號',
  tel: '(082)336-643',
  items: {  "肉燥飯": 35,
  "肉燥麵": 50,
  "吻仔魚粥": 40,
  "吻仔魚麵": 50,
  "瘦肉粥": 40,
  "瘦肉麵": 50,
  "玉米濃湯": 45,
  "味噌湯": 30,
  "手工水餃(1顆)": 5
},
  addons: {"中式": 0},
  isComeToShop: true,
  isMailToYou: false,
  isGoForYou: false
}

Shop5.save = function () {
  const shop = Shop5.shop
  Db.save('Shop5', shop)
  if (!Fire.app) return
  if (shop.id == null || shop.id.length === 0) {
    shop.id = Fire.addByPath('/shops/', shop)
  } else {
    Fire.setByPath('/shops/'+shop.id+'/', shop)
  }
}

Shop5.load = function () {
  Shop5.shop = Db.load('Shop5') || Shop5.shop
}