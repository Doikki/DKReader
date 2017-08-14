let global = require('../global');

let scKey = 'sc';

export default class ScManager {

    /**
     * 获取订阅频道
     * @returns 订阅频道
     */
    static getScList(callback) {
        global.storage.getAllDataForKey(scKey).then((data) => {
            callback(data);
        });
    }


    static getScIdList(callback) {
        global.storage.getIdsForKey(scKey).then((data) => {
            callback(data);
        });
    }

    /**
     * 通过id清除订阅频道
     * @param id 订阅频道id
     */
    static removeScSiteById(id) {
        global.storage.remove({key: scKey, id: id});
    }

    static removeAllScSite() {
        global.storage.clearMapForKey(scKey);
    }

    /**
     * 添加订阅频道
     * @param siteInfo
     */
    static addScSite(siteInfo) {
        global.storage.save({
            key: scKey,
            id: siteInfo.id,
            data: siteInfo
        });
    }
}