export const sendData = async function(url:string, data:BodyInit) {
  const requestHeaders: HeadersInit = new Headers();
  const cookie = getCookie('csrftoken');
  
  if (cookie)
    requestHeaders.set('X-CSRFToken', cookie );

  const response = await fetch(url, {
    method: 'POST',
    headers: requestHeaders,
    body: data,
  });

  return response;
};

export const getCookie = function(name:string) : string | null | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`) || [];

  if (parts && parts.length === 2) {
    return parts?.pop()?.split(';')?.shift();
  }

  return null;
};

export const setCookie = function(name:string, value:string, days:number) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};


const exportObj = {sendData, getCookie, setCookie};
export default exportObj;
