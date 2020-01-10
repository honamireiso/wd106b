const Shop6 = {}

Shop6.shop = {
  name: '早安! 美味堡',
  address: '金門縣金湖鎮漁村 107 號',
  tel: '(082)336-643',
  items: {  "果醬吐司薄片": 15,
  "果醬吐司厚片": 20,
  "德式香腸(2條)": 40,
  "辣卡啦雞": 30,
  "雞塊(5塊)": 30,
  "薯餅(2片)": 30,
  "蘿蔔糕": 25,
  "熱狗(4條)": 20
},
  addons: {"小品": 0},
  isComeToShop: true,
  isMailToYou: false,
  isGoForYou: false
}

Shop6.save = function () {
  const shop = Shop6.shop
  Db.save('Shop6', shop)
  if (!Fire.app) return
  if (shop.id == null || shop.id.length === 0) {
    shop.id = Fire.addByPath('/shops/', shop)
  } else {
    Fire.setByPath('/shops/'+shop.id+'/', shop)
  }
}

Shop6.load = function () {
  Shop6.shop = Db.load('Shop6') || Shop6.shop
}