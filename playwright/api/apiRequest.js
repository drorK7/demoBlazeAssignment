const axios = require('axios');

let accessToken;

async function getCookieValue(page, cookieName) {
  const cookie = await page.evaluate((name) => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }, cookieName);
  return cookie;
}

async function validateViewData() {
  const data = JSON.stringify({
    id: 3
  });

  const headers = {
    'content-type': 'application/json',
  };

  const requestUrl = 'https://api.demoblaze.com/view';

  try {
    const response = await axios.post(requestUrl, data, { headers });

    // Assertions on the response and its content
    // expect(response.data).toBeDefined(); // Verify that the response is defined
    // expect(response.data.id).toBe(3); // Verify a specific property in the response
    // expect(response.data.price).toBe(650);
    // expect(response.data.title).toBe("Nexus 6");
    return response

    // Additional assertions as needed
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
}


async function validateCartData(accessToken) {
  const data = JSON.stringify({
    cookie: accessToken,
    flag: true,
  });

  const config = {
    method: 'post',
    url: 'https://api.demoblaze.com/viewcart',
    headers: {
      'content-type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios(config);
    expect(response).toBeDefined(); // Verify that the response is defined
    return response
    // expect(response.data.Items.length).toBe(cartAmount);
    // console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
}



async function loginAPI(username, password) {
  const encodedPass = Buffer.from(password).toString('base64');

  const data = JSON.stringify({
    username: username,
    password: encodedPass,
  });

  const config = {
    method: 'post',
    url: 'https://api.demoblaze.com/login',
    headers: {
      'content-type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios(config);

    accessToken = response.data.split(':')[1].trim();

    return accessToken
  } catch (error) {
    console.log(error);
  }
}

async function addToCart(accessToken) {
  const data = JSON.stringify({
    id: '10269695-5414-caf2-375c-1e4393d91a3c',
    cookie: accessToken,
    prod_id: 3,
    flag: true
  });

  const config = {
    method: 'post',
    url: 'https://api.demoblaze.com/addtocart',
    headers: {
      'content-type': 'application/json',
    },
    data: data
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  validateCartData,
  validateViewData,
  loginAPI,
  addToCart
};
