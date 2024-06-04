const getMobileOS = (navigator: Navigator) => {
  const ua = navigator.userAgent;  
  if (/android/i.test(ua)) {
    return 'android';
  } else if (/iPad|iPhone|iPod|Macintosh/.test(ua)) {
    return 'ios';
  }
  return 'Other';
};

const downloadLinks: Record<any, any> = {
  ios: {
    vi: 'https://apps.apple.com/vn/app/fluentpal-practice-speaking/id6462874346',
    en: 'https://apps.apple.com/us/app/fluentpal-practice-speaking/id6462874346'
  },
  android: {
    vi: 'https://play.google.com/store/apps/details?id=com.fluentai&hl=vi&gl=VN',
    en: 'https://play.google.com/store/apps/details?id=com.fluentai'
  }
}

export function getDownloadLink(locale: string, os?: string) {
  let osKey = os;
  if (!osKey) {
    if (typeof navigator !== 'undefined') {
      osKey = getMobileOS(navigator);
    } else {
      osKey = ''
    }    
  }  
  const localeKey = ['vi', 'en'].includes(locale) ? locale : 'en';
  return downloadLinks[osKey][localeKey];  
}
