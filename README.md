# httpClient
http library typeScript / es6

** live exapmle ** : (https://openup.github.io/httpClient/)


## How to use
**you need to compile to JS or integrate the js file**

don't forget to integrate the class file in your html :mahjong: ```<script src="httpClient.min.js"></script>```


```
const http = new Http(); // by default return JSON , if want text declare new Http('text');
let post_url = "http://httpbin.org/post";
let get_url = "http://httpbin.org/headers";

// for GET request
http.get(get_url).then((res) => {
    console.log('Success : ', res);
}).catch((err) => {
    console.log('Error : ', err);
});


// for POST request **(add json as data params)**

http.post(post_url, {key : value}).then((res) => {
    console.log('Success : ', res);
}).catch((err) => {
    console.log('Error : ', err);
});



```
