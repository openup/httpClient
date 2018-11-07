var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var HttpRequest = /** @class */ (function () {
    function HttpRequest() {
        this.http = this.getHTTPObject();
    }
    HttpRequest.prototype.getHTTPObject = function () {
        if (typeof XMLHttpRequest != 'undefined') {
            return new XMLHttpRequest();
        }
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) { }
        }
        return false;
    };
    return HttpRequest;
}());
var Http = /** @class */ (function (_super) {
    __extends(Http, _super);
    function Http(type) {
        var _this = _super.call(this) || this;
        _this.responseType = "json";
        _this.responseType = type || _this.responseType;
        return _this;
    }
    Http.prototype.Xhttp = function (data) {
        var c = this;
        var xhr = this.http;
        return new Promise(function (resolve, reject) {
            xhr.open(c.method, c.url);
            xhr.responseType = c.responseType;
            xhr.timeout = 3000;
            if (c.method == "post")
                xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200)
                        xhr.onload = function () { return resolve(xhr.response); };
                    else
                        xhr.onerror = function () { return reject(xhr.statusText || 'Erreur Traitement de données !'); };
                }
            };
            var req = xhr.send(data || null);
            if (!req)
                xhr.onerror = function () { return reject(req || 'Erreur Traitement de données !'); };
        });
    };
    Http.prototype.get = function (url) {
        this.method = "get";
        this.url = url;
        return this.Xhttp();
    };
    Http.prototype.post = function (url, params) {
        this.method = "post";
        this.url = url;
        return this.Xhttp(params ? JSON.stringify(params) : null);
    };
    Http.prototype.abort = function () {
        this.http.abort();
    };
    return Http;
}(HttpRequest));
