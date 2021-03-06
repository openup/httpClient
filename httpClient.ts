abstract class HttpRequest{

 protected http;

    constructor() {
        this.http = this.getHTTPObject();
    }


    getHTTPObject() {
        if (typeof XMLHttpRequest != 'undefined') {
            return new XMLHttpRequest();
        }
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
        return false;
    }

}

declare var Promise;

class Http extends HttpRequest {

    public method: string;
    public url: string;
    private  responseType = "json";


    constructor(type?:string){
      super();
      this.responseType = type || this.responseType;
    }


    private Xhttp(data ?, headers ? : {}): any {
        let c = this;
        let xhr = this.http;
        return new Promise((resolve, reject) => {
            xhr.open(c.method, c.url, null);
            xhr.responseType = c.responseType;
            xhr.timeout = 3000;

            xhr.setRequestHeader("Content-Type", "application/json");

            if(headers && headers instanceof Object && Object.keys(headers).length>0)
                Object.keys(headers).forEach( function(k) {
                       xhr.setRequestHeader(k , headers[k]);
                });
            
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200)
                        xhr.onload = () => resolve(xhr.response);
                    else
                        xhr.onerror = () => reject(xhr.statusText || xhr.response || 'Erreur Traitement de données !');
                }
            }

            var req = xhr.send(data || null);
            if (!req)
                xhr.onerror = () => reject(req || 'Erreur Traitement de données !');
        });
    }


    public get(url, headers?:{}) {

        this.method = "get";
        this.url = url;

        return this.Xhttp(null, headers);
    }


    public post(url, params ? : {}, headers?:{}) {

        this.method = "post";
        this.url = url;

        return this.Xhttp(params ? JSON.stringify(params) : null, headers);

    }


    public abort(){
        this.http.abort();
    }

}
