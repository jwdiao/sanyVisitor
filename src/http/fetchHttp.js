let queryString = require('query-string');
import   {Platform}
 from 'react-native'
import storage from '../storage/RNAsyncStorage'

const os = Platform.OS;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
function parseJSON(response) {
  return response.json()
}
async function get(url, params) {
  if (params) {
    url += `?${queryString.stringify(params)}`
  }
  try {
    let headers = new Headers();
    let Access_Token = await storage.load({
      key: 'loginState',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {
        },
        someFlag: true,
      },
    }).then(ret => {
      return ret.token
    });
    if (Access_Token) {
      headers.append('token', Access_Token);
      headers.append('UserAgent',os);
    }
    console.log(headers,url)
    return fetch(url, {
      headers: headers
    })
      // .then(checkStatus)
      .then(parseJSON)
  } catch (e) {
    throw new Error('get error')
  }

}

async function post(url, body) {
  let Access_Token = await storage.load({
    key: 'loginState',
    autoSync: true,
    syncInBackground: true,
    syncParams: {
      extraFetchOptions: {
      },
      someFlag: true,
    },
  }).then(ret => {
    return ret.token
  });
  let fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': Access_Token ? Access_Token : '',
      'UserAgent':os
    },
    body: JSON.stringify(body)
  }
  return fetch(url, fetchOptions)
    .then(checkStatus)
    .then(parseJSON)
}



async function update(url, body) {
  let Access_Token = await storage.load({
    key: 'loginState',
    autoSync: true,
    syncInBackground: true,
    syncParams: {
      extraFetchOptions: {
      },
      someFlag: true,
    },
  }).then(ret => {
    return ret.token
  });
  let fetchOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': Access_Token ? Access_Token : '',
      'UserAgent':os
    },
    body: JSON.stringify(body)
  }
  return fetch(url, fetchOptions)
    .then(checkStatus)
    .then(parseJSON)
}

async function uploadFile(url, params, fileUrl,fileName) {
  let Access_Token = await storage.load({
    key: 'loginState',
    autoSync: true,
    syncInBackground: true,
    syncParams: {
      extraFetchOptions: {
      },
      someFlag: true,
    },
  }).then(ret => {
    return ret.token
  });
  let data = new FormData();
  data.append('file', {
    uri: fileUrl,
    name: fileName,
    type: 'image/jpeg'
  });

  Object.keys(params).forEach((key)=> {
    if (params[key] instanceof Date) {
      data.append(key, value.toISOString())
    } else {
      data.append(key, String(params[key]))
    }
  });
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'token': Access_Token ? Access_Token : '',
      'UserAgent':os
    },
    body: data
  };
  return fetch(url, fetchOptions)
    .then(checkStatus)
    .then(parseJSON)
}
export default {
  get,
  post,
  update,
  uploadFile
}