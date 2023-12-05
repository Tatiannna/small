


async function csrfFetch(url, options = {}) {
    // set options.method to 'GET' if there is no method
    options.method = options.method || 'GET';
    // set options.headers to an empty object if there are no headers
    options.headers = options.headers || {};
  
    // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json" and the "X-CSRF-Token" header to the value of the 
    // "X-CSRF-Token" cookie
    if (options.method.toUpperCase() !== 'GET') {
      options.headers['Content-Type'] = 'application/json';
      options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }
    // call fetch with the url and the updated options hash
    const res = await fetch(url, options);
    // if the response status code is 400 or above, then throw an error with the
    // error being the response
    if (res.status >= 400) throw res;
  
    // if the response status code is under 400, then return the response to the
    // next promise chain
    return res;
}

export async function restoreCSRF(){
    let res = await fetch('/api/session');
    let token = res.headers.get("X-CSRF-Token");

    if (res.ok){
      let data = await res.json();
      sessionStorage.setItem("X-CSRF-Token", token)
      sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    } else {
      console.log('No token found')
    }
    return res;
}

export default csrfFetch;