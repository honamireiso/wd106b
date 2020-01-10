const Shop2 = {}

Shop2.shop = {
  name: '早安! 美味堡',
  address: '金門縣金湖鎮漁村 107 號',
  tel: '(082)336-643',
  items: {  "卡拉雞腿蛋": 65,
  "鐵路豬排蛋": 65,
  "勳雞蛋": 60,
  "肉排蛋(漢堡肉)": 60,
  "鮪魚蛋": 55
},
  addons: {"總匯三明治": 0},
  isComeToShop: true,
  isMailToYou: false,
  isGoForYou: false
}

Shop2.save = function () {
  const shop = Shop2.shop
  Db.save('Shop2', shop)
  if (!Fire.app) return
  if (shop.id == null || shop.id.length === 0) {
    shop.id = Fire.addByPath('/shops/', shop)
  } else {
    Fire.setByPath('/shops/'+shop.id+'/', shop)
  }
}

Shop2.load = function () {
  Shop2.shop = Db.load('Shop2') || Shop2.shop
}