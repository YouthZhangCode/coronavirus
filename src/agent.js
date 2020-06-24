/**
 * @Summary: short description for the file
 * @Date: 2020/3/19 2:08 PM
 * @Author: Youth
 */

import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

// const API_ROOT_API_INEWS_QQ = "https://api.inews.qq.com"
// const API_ROOT_VIEW_INEWS_QQ = "https://view.inews.qq.com"
// const API_ROOT_API_DREAMREADER_QQ = "https://api.dreamreader.qq.com"
// const API_ROOT_API_YC_STATIC_QQ = "https://yc.static.qq.com"
// const API_ROOT_API_VP_FACT_QQ = "https://vp.fact.qq.com"
// const API_ROOT_API_WECHAT_WECITY_QQ = "https://wechat.wecity.qq.com"

const handleErrors = (err, res) => {
  // if err ...
  return err;
}

const tokenPlugin = req => {
  // req.set('authorization', '***')
}

const parse = res => {
  if (res.ok || res.statusCode === 200) {
    let resObj = JSON.parse(res.text)
    if (resObj.ret === 0) {
      if (typeof resObj.data === "string") {
        return JSON.parse(resObj.data)
      }else {
        return resObj.data
      }
    }
  }
}

const request = {
  del: (root, url) =>
    superagent
      .del(`${root}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(parse),
  get: (root, url) =>
    superagent
      .get(`${root}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(parse),
  put: (root, url, body) =>
    superagent
      .put(`${root}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(parse),
  post: (root, url, body) =>
    superagent
      .post(`${root}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(parse),
}

const Home = {
  todayData: () =>
    request.get('', '/g2/getOnsInfo?name=disease_h5'),
  recentData: () =>
    request.get('', '/g2/getOnsInfo?name=disease_other'),
  todayNotice: () =>
    request.get('', '/g2/getOnsInfo?name=wuwei_ww_ww_today_notice')
}

const Foreign = {
  foreignData: () =>
    request.get('', '/g2/getOnsInfo?name=disease_foreign'),
  countryData: (country) =>
    request.get('https://api.inews.qq.com', `/newsqa/v1/automation/foreign/daily/list?country=${country}`),
  autoWeekContinentMillionData: () =>
    request.get('https://api.inews.qq.com', '/newsqa/v1/automation/modules/list?modules=FAutoCountryWeekCompRank,FAutoContinentConfirmStatis,FAutoConfirmMillionRankList'),
  autoContinentGlobalDailyListCountryConfirmAdd: () =>
    request.get('https://api.inews.qq.com', '/newsqa/v1/automation/modules/list?modules=FAutoGlobalStatis,FAutoContinentStatis,FAutoGlobalDailyList,FAutoCountryConfirmAdd'),
  countryRankListData: () =>
    request.get('https://api.inews.qq.com', '/newsqa/v1/automation/foreign/country/ranklist'),
}

const Province = {
  provinceJson: (province) =>
    request.get('https://mat1.gtimg.com', `/news/feiyanarea/${province}.json`)
}

export default {
  Home,
  Foreign,
  Province,
}