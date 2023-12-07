


async function csrfFetch(url, options = {}) {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
    
    if (options.method.toUpperCase() !== 'GET') {
      options.headers['Content-Type'] = 'application/json';
      options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }

    const res = await fetch(url, options);
    
    return res;
}

export async function restoreCSRF(){
    let res = await fetch('/api/session');
    let token = res.headers.get("X-CSRF-Token");

    if (res.ok){
      let data = await res.json();
      sessionStorage.setItem("X-CSRF-Token", token)
      console.log(data);
      console.log(data.user);
      sessionStorage.setItem('currentUser', JSON.stringify(data.id));
    } 
    
    return res;
}

export default csrfFetch;