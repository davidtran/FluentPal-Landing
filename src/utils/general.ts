const getMobileOS = (navigator: Navigator) => {
  const ua = navigator.userAgent;  
  if (/android/i.test(ua)) {
    return 'Android';
  } else if (/iPad|iPhone|iPod|Macintosh/.test(ua)) {
    return 'iOS';
  }
  return 'Other';
};

export function getDownloadLink() {
  const os = getMobileOS(navigator);
  if (os === 'iOS') {
    return 'https://apps.apple.com/us/app/fluentpal/id6462874346';
  } else {
    return 'https://play.google.com/store/apps/details?id=com.fluentai';
  }
}
