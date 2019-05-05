export const DAY_MILLISECONDS = 86400000; // 一天的毫秒数

export const MOCK_PROJECT_ID = '2VIXnj2Zu';

export const STATUS_CODE = {
  SUCCESS: 0,
  UNLOGIN: 401,
  ERROR_SUPPLIER: -1,
  TIMEOUT: -1000,
  NET_ERROR: -1001,
  PARSE_ERROR: -1002,
  DRIVER_CHECKIN_DUPLICATE: -100012,
  WRONT_LOGIN_USER: -100006, //用户虽然登录了，但是不是这个端的，需要重新登录
  DUPLICATE_DELAY_APPLY: -100015 // 重复申请延时提示
};

export const STATUS_MESSAGE = {
  TIMEOUT: '网络超时，请稍后重试',
  NET_ERROR: '网络状况不佳，请检查您的网络是否正常',
  PARSE_ERROR: '数据异常，请稍后重试',
  SERVER_ERROR: '操作异常，请稍后重试'
};

export const CONTENT_TYPE = {
  FORM: 'application/x-www-form-urlencoded',
  JSON: 'application/json'
};

export const STORAGE_KEY = {
  USERINFO: 'userinfo',
  SEARCH_HISTORY_KEY: '__search_history_key__'
};

export const SEND_ORDER_STATUS = {
  START: 'Start',
  SUBMITTED: 'Submitted',
  SIGNINED: 'SignIned',
  FINISH: 'Finish',
  CANCELLED: 'Cancelled'
};

export const SEND_TAB_ORDER_STATUS_MAP = {
  Start: '待处理',
  Submitted: '已预约',
  Expressed: '已填单',
  SignIned: '已签到',
  Finish: '已完成',
  Cancelled: '已取消'
};

export const SEND_ORDER_STATUS_MAP = {
  Start: '待预约',
  Submitted: '已预约',
  Expressed: '已填单',
  SignIned: '已签到',
  Finish: '已完成',
  Cancelled: '已取消'
};

// 统配越库使用的状态
export const SEND_ORDER_STATUS_MAP_CROSSDOCK = {
  Start: '待送货',
  Submitted: '已预约',
  SignIned: '已签到',
  Finish: '已完成',
  Cancelled: '已取消'
};

export const STORAGE = {
  driverName: '__driver_name__',
  driverPhone: '__driver_phone__',
  carNumber: '__car_number__'
};

export const RETURN_ORDER_STATUS = {
  START: 'Start',
  SUBMITTED: 'Submitted',
  WAITRETURN: 'WaitReturn',
  FINISH: 'Finish',
  CANCELLED: 'Cancelled'
};

export const RETURN_ORDER_STATUS_MAP = {
  Start: '待处理',
  Submitted: '已预约',
  WaitReturn: '待退货',
  Finish: '已完成',
  Cancelled: '已取消'
};

export const RETURN_DETAIL_ORDER_STATUS_MAP = {
  Start: '待处理',
  Submitted: '已预约',
  WaitReturn: '待退货',
  Processing: '待退货',
  Expressed: '待退货',
  Finish: '已完成',
  Cancelled: '已取消'
};

export const ORDER_TYPE = {
  SEND: 0, //送货预约
  RETURN: 1//退货预约
};

export const BUSINESS_TYPE = {
  DIRECT: 1, // 直配
  JOINT_UPON: 2, // 统配在库
  JOINT_OVER: 3 // 统配越库
};

export const SUBSCRIBE_TYPE = {
  NORMAL: 0, // 普通预约
  EXPRESS: 1 //快递方式
};

export const CARNUM_REGX = /^[京沪津苏粤冀晋蒙辽吉黑浙皖闽赣鲁豫鄂湘桂琼渝川贵云藏陕甘青宁新港澳台]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{5,6}$/;

