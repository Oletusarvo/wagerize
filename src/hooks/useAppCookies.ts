import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

const showCookieNoticeKey = 'wagerize-show-cookie-notice';

export function useAppCookies() {
  const [cookies, setCookie] = useCookies();
  const router = useRouter();
  const showCookieNotice = localStorage.getItem(showCookieNoticeKey);
  const enableAnalytics = (state: string = 'false') => {
    console.log('Setting analytics to ', state);
    setCookie('wagerize-analytics-enabled', state);
    localStorage.setItem(showCookieNoticeKey, 'false');
    router.refresh();
  };
  return { showCookieNotice, enableAnalytics };
}
