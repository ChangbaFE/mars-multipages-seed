const prefixProtocol = url => {
    if (typeof url == 'undefined') {
      return ''
    }
    else {
      if (url.indexOf('//') == 0) {
        return 'https:' + url;
      } else if (url.indexOf('http://') == 0) {
        return url.replace('http', 'https');
      } else {
        return url;
      }
    }
};

const prefixAvatar = url => {
    let avatar = '//cbshowhot.cdn.changbaimg.com/-/905bab36808f28a7/avatar.png';
    if (url && url.length) {
        avatar = url.substring(0, url.length-4);
    }
    else {
        return avatar;
    }
    return `${ avatar }_100_100.jpg`
}

export {
    prefixAvatar,
    prefixProtocol
}
