/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var spotcard = {
    root:'http://api.admedia.pt/',
    token:false,
    img:'http://img.admedia.pt/img-medium/',
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
        $.ajax(options).done(function(content) {
            that._response(content, callback, failback);
        });
    },
    _response:function(content, callback, failback) {
        var that = this;
        if (content.status.value) {
            that._decode(content);
            if (callback) callback(content);
        } else if(failback) failback(content); else console.log(content);
    },
    login:function(email,pass, callback, failback) {
        this._request({url:this.root + 'login/index/'+email+'/'+pass+'/sp'}, callback, failback);
    },
    logout:function(callback, failback) {
        var that = this;
        $.ajax({
            type:'POST',
            data: {token:that.token},
            url:this.root + 'login/out/'
        }).done(function(content) {
            that._response(content, callback, failback);
        });
    },
    companies: function(category_id, callback, failback) {
        var that = this;
        this._request({
            type:'POST',
            data: {token:that.token},
            url:this.root + 'companies/index/' + category_id
        }, callback, failback);
    },
    categories: function(callback, failback) {
        var that = this;
        $.ajax({
            type:'POST',
            cache: false,
            data: {token:that.token},
            url:this.root + 'categories/index/'
        }).done(function(content) {
            that._response(content, callback, failback);
        });
    },
    regions: function(callback, failback) {
        var that = this;
        $.ajax({
            type:'POST',
            cache: false,
            data: {token:that.token},
            url:this.root + 'companies/regions/'
        }).done(function(content) {
            that._response(content, callback, failback);
        });
    },
    htmlDecode: function (value) {
        var div = document.createElement('div');
            div.innerHTML = value;
        return div.innerText;    
    }
};
