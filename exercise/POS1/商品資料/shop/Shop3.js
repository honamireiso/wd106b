const Shop3 = {}

Shop3.shop = {
  name: '早安! 美味堡',
  address: '金門縣金湖鎮漁村 107 號',
  tel: '(082)336-643',
  items: {  "卡拉雞腿蛋": 50,
  "鐵路豬排蛋": 45,
  "肉排蛋(漢堡肉)": 40,
  "火腿蛋": 30,
  "鮪魚蛋": 35,
  "培根蛋": 35,
  "勳雞蛋": 40
},
  addons: {"吐司": 0},
  isComeToShop: true,
  isMailToYou: false,
  isGoForYou: false
}

Shop3.save = function () {
  const shop = Shop3.shop
  Db.save('Shop3', shop)
  if (!Fire.app) return
  if (shop.id == null || shop.id.length === 0) {
    shop.id = Fire.addByPath('/shops/', shop)
  } else {
    Fire.setByPath('/shops/'+shop.id+'/', shop)
  }
}

Shop3.load = function () {
  Shop3.shop = Db.load('Shop3') || Shop3.shop
}