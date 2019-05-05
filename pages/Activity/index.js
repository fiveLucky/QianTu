
import w from '../../util/w.js'

Page({
  data: {
    activityList: [],
  },
  onLoad(options) {

  },
  onShow() {
    // 请求活动list
    this.setData({
      activityList: [
        {
          "id": 199198,
          "club": {
            "id": "8a9cd2e46855ae1c01685f5f4379061d",// 俱乐部id
            "name": "乾途羽毛球",
            "logo": "http://game.yulinjue.com/medias/9SE0v99p4tLfObKN5vEdHJR52pDUttiJnmll_rig_O1ZiO4Uj7Urvtoat3O7a-dC.jpg",
            "type": "club",
            "mobile": "1533003****",// 组织者手机号
            "managercount": 10,
            "owner": "ojXTvt9fyagqsXE_7sMR49YreOpo",
            "enabled": true,
            "canpay": false,
            "playercount": 168,
            "amount": 2677.95,
            "cash": 3484.8,
            "areacode": "110105",
            "venue": "北京中医药大学体育馆",
            "level": 2.0,
            "checkIntegral": false,
            "realname": "xxx", // 组织者姓名
            "reference": null,
            "prestoreMember": true,
            "levelRemark": null,
            "membercount": 0,
            "prestore": 0.0,
            "rate": 0.01
          },
          "venue": {
            "id": 9097,
            "name": "北京中医药大学",
            "address": "北京市朝阳区北三环东路11号",
            "areacode": "110105",
            "lat": 39.968578,
            "lng": 116.435451,
            "creator": "ojXTvt9fyagqsXE_7sMR49YreOpo",
            "type": "qqmap",
            "clubid": "8a9cd2e46855ae1c01685f5f4379061d"
          },
          "date": "2019-05-11",
          "begin": "09:00",
          "end": "11:00",
          "joincount": 8,
          "remark": "<div><span style=\"font-size: 0.85em;\">替补不能参加活动，禁止空降，取消请提前4小时。</span><br></div><div><span style=\"font-size: 11.5600004196167px;\"><br></span><div>非俱乐部会员，报名请联系群主，电话微信同号。</div></div>",
          "mobile": "1533003****",
          "place": "一层2号",
          "type": "fix",
          "cost": 40.0,// 会员价格
          "playersize": 8,
          "paycount": 2,
          "updatetime": "2019/05/05 01:00:02",
          "week": 7,
          "manLowlevel": 1.0,
          "manHighlevel": 9.0,
          "womanLowlevel": 1.0,
          "womanHighlevel": 9.0,
          "amount": 0.0,
          "cleaning": false,
          "guestCost": 45.0, // 游客价格
          "lasttime": 4,
          "substitute": 2,
          "deadline": true,
          "name": "乾途周六双打【不限水平】",
          "pause": null,
          "womanCost": 40.0,
          "womanGuestCost": 45.0,
          "tempId": 4712,
          "attachCost": false
        }
      ]
    })
  }
})