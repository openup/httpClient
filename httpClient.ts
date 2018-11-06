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


    private Xhttp(data ? : string): any {
        let c = this;
        let xhr = this.http;
        return new Promise((resolve, reject) => {
            xhr.open(c.method, c.url);
 
            xhr.responseType = c.responseType;
 
            if (c.method == "post")
                xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200)
                        xhr.onload = () => resolve(xhr.response);
                    else
                        xhr.onerror = () => reject(xhr.statusText || 'Erreur Traitement de données !');
                }
            }
            var req = xhr.send(data || null);
            if (!req)
                xhr.onerror = () => reject(req || 'Erreur Traitement de données !');
        });
    }


    public get(url) {

        this.method = "get";
        this.url = url;

        return this.Xhttp();

    }


    public post(url, params ? : {}) {

        this.method = "post";
        this.url = url;
        const Stringparams = JSON.stringify(params);

        return this.Xhttp(Stringparams);

    }

}
