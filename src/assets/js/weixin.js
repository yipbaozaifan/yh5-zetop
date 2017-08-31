/* global wx:false */
const success = () => window.location.replace('#_');

const initWeixinSdk = () => {
  window.setConfigData = ({ data }) => {
    wx.config({
      debug: false,
      appId: 'wx4060f2d547524fe7',
      nonceStr: data.nonceStr,
      timestamp: data.timestamp,
      signature: data.signature,
      jsApiList: [
        // add what you need in weixin
      ],
    });
    wx.ready(() => {
      // todo
    });
  };

  const a = document.createElement('script');
  const urlParam = encodeURIComponent(location.href.split('#')[0]);
  a.setAttribute('src', `your app config url?callback=setConfigData&weixin_app_index=2&url=${urlParam}`);
  a.onerror = () => console.log('加载微信配置失败');
  document.getElementsByTagName('head')[0].appendChild(a);
};

export default initWeixinSdk;