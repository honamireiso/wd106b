const Shop4 = {}

Shop4.shop = {
  name: '早安! 美味堡',
  address: '金門縣金湖鎮漁村 107 號',
  tel: '(082)336-643',
  items: {  "鐵路豬排": 55,
  "滑蛋": 30
},
  addons: {"抓餅": 0},
  isComeToShop: true,
  isMailToYou: false,
  isGoForYou: false
}

Shop4.save = function () {
  const shop = Shop4.shop
  Db.save('Shop4', shop)
  if (!Fire.app) return
  if (shop.id == null || shop.id.length === 0) {
    shop.id = Fire.addByPath('/shops/', shop)
  } else {
    Fire.setByPath('/shops/'+shop.id+'/', shop)
  }
}

Shop4.load = function () {
  Shop4.shop = Db.load('Shop4') || Shop4.shop
}