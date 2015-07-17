/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var spotcard = {
    root:'http://api.admedia.pt/',
    token:false,
    img:'http://img.admedia.pt/',
    masterfail:false,
    _decode:function(object) {
        for(index in object) {
            if (typeof(object[index]) == 'string') {
                object[index] = this.htmlDecode(object[index]);
            } else object[index] = this._decode(object[index]);
        }
        return object;
    },
    _request:function(options, callback, failback) {
        var that = this;
        options.type = 'POST';
        options.data = {token:this.token}; 
        if (typeof InstallTrigger !== 'undefined') {
            var formData = new FormData();
                formData.append("token", that.token);
            var oReq = new XMLHttpRequest();
                oReq.open('POST', options.url, true);
                oReq.responseType = 'json';
                oReq.onload = function() {
                    if(this.status == 200) that._response(this.response, callback, failback, options);
                };
                oReq.send(formData);
        } else {
            $.ajax(options).done(function(content) {
                that._response(content, callback, failback, options);
            });
        }
    },
    _response:function(content, callback, failback, options) {
        if (content.status.value) {
            this._decode(content);
            if (callback) callback(content);
        } else if (this.masterfail) {
            this.masterfail(options, callback, failback);
        } else if(failback) {
            failback(content);
        } else console.log(content);
    },
    login:function(email,pass, callback, failback) {
        this._request({url:this.root + 'login/index/'+email+'/'+pass+'/sp'}, callback, failback);
    },
    logout:function(callback, failback) {
        this._request({
            url:this.root + 'login/out/'
        }, callback, failback);
    },
    companies: function(category_id, callback, failback) {
        this._request({
            url:this.root + 'companies/index/' + category_id
        }, callback, failback);
    },
    categories: function(callback, failback) {
        this._request({
            url:this.root + 'categories/index/'
        }, callback, failback);
    },
    regions: function(callback, failback) {
        this._request({
            url:this.root + 'companies/regions/'
        }, callback, failback);
    },
    banners: function(callback, failback) {
        this._request({
            url:this.root + 'banners/index/'
        }, callback, failback);
    },
    htmlDecode: function (value) {
        var div = document.createElement('div');
            div.innerHTML = value;
        return div.textContent;    
    }
};
