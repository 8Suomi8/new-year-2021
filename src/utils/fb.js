function installFbAuthPlugin(Vue, options) {
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {return}
    js = d.createElement(s)
    js.id = id
    js.src = "//connect.facebook.net/en_US/sdk.js"
    fjs.parentNode.insertBefore(js, fjs)
  }(document, 'script', 'facebook-jssdk'))

  console.log('1');
  window.fbAsyncInit = function onSDKInit() {
    window.FB.init(options)
    Vue.FB = window.FB
  }

  Vue.FB = undefined
}

export default installFbAuthPlugin