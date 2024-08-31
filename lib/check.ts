export const checkUserName = async (): Promise<string> => {
  const res = await fetch('/api/user/check');
  const body = await res.json();
  if (body.redirect) {
    window.location.href = body.redirect;
  }
  
  return body.message;
}