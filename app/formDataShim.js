// Android上的AppleWebKit 534以前的内核存在一个Bug，
// 导致FormData加入一个Blob对象后，上传的文件是0字节
//代码来源https://github.com/think2011/localResizeIMG/blob/master/src/lib/Blob.FormData.shim.js
function hasFormDataBug () {
    var bCheck = ~navigator.userAgent.indexOf('Android')
        && ~navigator.vendor.indexOf('Google')
        && !~navigator.userAgent.indexOf('Chrome');

    // QQ X5浏览器也有这个BUG
    return bCheck && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534 || /MQQBrowser/g.test(navigator.userAgent);
}
var FormDataShim=(function(){
    var formDataShimNums = 0;
    function FormDataShim () {
        // Store a reference to this
        var o = this,

        // Data to be sent
        parts = [],

        // Boundary parameter for separating the multipart values
        boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),

        // Store the current XHR send method so we can safely override it
        oldSend  = XMLHttpRequest.prototype.send;
        this.getParts = function () {
            return parts.toString();
        };
        this.append   = function (name, value, filename) {
            parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');

            if (value instanceof Blob) {
                parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
                parts.push(value);
            }
            else {
                parts.push('\r\n\r\n' + value);
            }
            parts.push('\r\n');
        };

        formDataShimNums++;
        XMLHttpRequest.prototype.send = function (val) {
            var fr,
                data,
                oXHR = this;

            if (val === o) {
                // Append the final boundary string
                parts.push('--' + boundary + '--\r\n');
                // Create the blob
                data = new BlobConstructor(parts);

                // Set up and read the blob into an array to be sent
                fr         = new FileReader();
                fr.onload  = function () {
                    oldSend.call(oXHR, fr.result);
                };
                fr.onerror = function (err) {
                    throw err;
                };
                fr.readAsArrayBuffer(data);

                // Set the multipart content type and boudary
                this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                formDataShimNums--;
                if(formDataShimNums == 0){
                    XMLHttpRequest.prototype.send = oldSend;
                }
            }
            else {
                oldSend.call(this, val);
            }
        };
    };
    FormDataShim.prototype = Object.create(FormData.prototype);
    return FormDataShim;
})();
var formData= hasFormDataBug() ? FormDataShim : FormData;
export default formData;
