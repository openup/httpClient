# httpClient
http library typeScript / es6

## How to use
### you need to compile to JS or integrate the js file

```
const http = new Http(); // by default return JSON , if want text declare new Http('text');
let post = "http://httpbin.org/post";
let get = "http://httpbin.org/headers";
http.get(get).then((res) => {
    console.log('Success : ', res);
}).catch((err) => {
    console.log('Error : ', err);
});
```
