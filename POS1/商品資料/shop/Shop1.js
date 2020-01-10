const Shop1 = {}

Shop1.shop = {
  name: '早安! 美味堡',
  address: '金門縣金湖鎮漁村 107 號',
  tel: '(082)336-643',
  items: {  "鮪魚": 35,
  "培根": 35,
  "玉米": 30,
  "起司": 30,
  "火腿": 30
},
  addons: {"蛋餅": 0},
  isComeToShop: true,
  isMailToYou: false,
  isGoForYou: false
}

Shop1.save = function () {
  const shop = Shop1.shop
  Db.save('Shop1', shop)
  if (!Fire.app) return
  if (shop.id == null || shop.id.length === 0) {
    shop.id = Fire.addByPath('/shops/', shop)
  } else {
    Fire.setByPath('/shops/'+shop.id+'/', shop)
  }
}

Shop1.load = function () {
  Shop1.shop = Db.load('Shop1') || Shop1.shop
}