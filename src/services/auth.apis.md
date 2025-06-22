GET
Get Auth Data Bu User

var axios = require('axios');
var data = '{\r\n    "email": "admin@123",\r\n    "password": "Test@123",\r\n    "first_name": "John",\r\n    "last_name": "Doe",\r\n    "gender": 0, // 0: male, 1: female, 2: other\r\n    "date_of_birth": "1995-03-01",\r\n    "phone_number": "0771234567",\r\n    "country_code": "+94",\r\n    "dial_code": "+94",\r\n    "role_id": 1 // default 1\r\n}';

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://server-heathify.ddnsfree.com/api/auth/685115d97c505b0d82bf2eb8',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


POST
Login

var axios = require('axios');
var data = '{\r\n    "email": "theekshananipun104@gmail.com",\r\n    "password": "Test@1234"\r\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://server-heathify.ddnsfree.com/api/auth/login',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


POST
Reregister Patient

var axios = require('axios');
var data = '{\r\n    "email": "theekshananipun104@gmail.com",\r\n    "password": "Test@1234",\r\n    "signUpVia": 1 // 1-> email auth  , 2 -> google auth\r\n    // "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiYjc3NGJkODcyOWVhMzhlOWMyZmUwYzY0ZDJjYTk0OGJmNjZmMGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MTk1MzEzOTgwMjAtZ2luMmQzaTNoZWhtNmd0bWRkMm5tNm45OWpkZjFzZ28uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MTk1MzEzOTgwMjAtZ2luMmQzaTNoZWhtNmd0bWRkMm5tNm45OWpkZjFzZ28uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwMjE0MjA1OTA1OTcwMDEwMzIiLCJlbWFpbCI6InRoZWVrc2hhbmFuaXB1bjEwNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzUwMzQ2Nzg1LCJuYW1lIjoiTmlwdW4gVGhlZWtzaGFuYSBIZW1hbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJSHdWbXVxMnNvOVFIS0lNdnBzREtXaXhQV0RON01id041VEhISUd0a2VKLThVcEZ5ej1zOTYtYyIsImdpdmVuX25hbWUiOiJOaXB1biIsImZhbWlseV9uYW1lIjoiVGhlZWtzaGFuYSBIZW1hbCIsImlhdCI6MTc1MDM0NzA4NSwiZXhwIjoxNzUwMzUwNjg1LCJqdGkiOiJiMGJlOTlkNjRmNTZiZWQyMTg5Nzk4MzM2NmQ0YTk4MTI5MmYzZDAyIn0.Yi6hn6xk0KjGPHo-C4lenqvkrVORn3LE05NXVh9E_hvw8MnehZx2Rjyo9KQ7-6ngKD-aaY7PPjN27lt52cpdet7LfcoXJ6bET_walTq6Lqjb3jVmPRSwXUY9F0Kwd-Ws5pjrz0IYz_Tm-37FozaRhm9q9JypdwYctj0xD7Q8PDMt1bzvampe56SjmruEJz-suGpKxiBvJFp_eLttQNJmAFwHmJPmzbJVJsqVcDiB8ir3K3VYZn52887WWINo4hZ_nXfC6wDSun_m4Z3mWnQQDyTH8gPdZ3rFdFpukkRcCSzWHYJuFvWIiaWCUIzPYtLCr6vheMRLIr9-tjVsA8aKDw"\r\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://server-heathify.ddnsfree.com/api/auth/register-patient',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

POST
Google Auth

var axios = require('axios');
var data = '{\r\n    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiYjc3NGJkODcyOWVhMzhlOWMyZmUwYzY0ZDJjYTk0OGJmNjZmMGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MTk1MzEzOTgwMjAtZ2luMmQzaTNoZWhtNmd0bWRkMm5tNm45OWpkZjFzZ28uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MTk1MzEzOTgwMjAtZ2luMmQzaTNoZWhtNmd0bWRkMm5tNm45OWpkZjFzZ28uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwMjE0MjA1OTA1OTcwMDEwMzIiLCJlbWFpbCI6InRoZWVrc2hhbmFuaXB1bjEwNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzUwMzQ2Nzg1LCJuYW1lIjoiTmlwdW4gVGhlZWtzaGFuYSBIZW1hbCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJSHdWbXVxMnNvOVFIS0lNdnBzREtXaXhQV0RON01id041VEhISUd0a2VKLThVcEZ5ej1zOTYtYyIsImdpdmVuX25hbWUiOiJOaXB1biIsImZhbWlseV9uYW1lIjoiVGhlZWtzaGFuYSBIZW1hbCIsImlhdCI6MTc1MDM0NzA4NSwiZXhwIjoxNzUwMzUwNjg1LCJqdGkiOiJiMGJlOTlkNjRmNTZiZWQyMTg5Nzk4MzM2NmQ0YTk4MTI5MmYzZDAyIn0.Yi6hn6xk0KjGPHo-C4lenqvkrVORn3LE05NXVh9E_hvw8MnehZx2Rjyo9KQ7-6ngKD-aaY7PPjN27lt52cpdet7LfcoXJ6bET_walTq6Lqjb3jVmPRSwXUY9F0Kwd-Ws5pjrz0IYz_Tm-37FozaRhm9q9JypdwYctj0xD7Q8PDMt1bzvampe56SjmruEJz-suGpKxiBvJFp_eLttQNJmAFwHmJPmzbJVJsqVcDiB8ir3K3VYZn52887WWINo4hZ_nXfC6wDSun_m4Z3mWnQQDyTH8gPdZ3rFdFpukkRcCSzWHYJuFvWIiaWCUIzPYtLCr6vheMRLIr9-tjVsA8aKDw"\r\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://server-heathify.ddnsfree.com/api/auth/google',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


POST
forget-password

var axios = require('axios');
var data = '{\r\n    "email": "theekshananipun104@gmail.com",\r\n    "otp": "123456",\r\n    "newPassword": "Test@123"\r\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://server-heathify.ddnsfree.com/api/auth/forget-password',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


POST
verify-otp

var axios = require('axios');
var data = '{\r\n    "email": "theekshananipun104@gmail.com",\r\n    "otp": "123456"\r\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://server-heathify.ddnsfree.com/api/auth//verify-otp',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


POST
Send Otp Request

var axios = require('axios');
var data = '{\r\n    "email": "theekshananipun104@gmail.com"\r\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://server-heathify.ddnsfree.com/api/auth/send-otp',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


POST
Change Password

var axios = require('axios');
var data = '{\r\n    "email": "theekshananipun104@gmail.com",\r\n    "oldPassword": "Test@123",\r\n    "newPassword": "Test@1234"\r\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://server-heathify.ddnsfree.com/api/auth/change-password',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


PUT
Update User Profile Data

var axios = require('axios');
var data = '{\r\n  "userId": "6854388b327c25ff77d48b7e",\r\n  "firstName": "Nipun",\r\n  "lastName": "Theekshana",\r\n  "gender": 0,                 // 0 = Male, 1 = Female, 2 = Other\r\n  "dob": "2000-01-15",         // Format: YYYY-MM-DD\r\n  "phoneNumber": "0771234567",\r\n  "countryCode": "LK",         // e.g., "LK" for Sri Lanka\r\n  "dialCode": "+94"\r\n}\r\n';

var config = {
  method: 'put',
maxBodyLength: Infinity,
  url: 'https://server-heathify.ddnsfree.com/api/user/update-profile',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
