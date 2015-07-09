/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var spotcard = {
    root:'http://api.admedia.pt/',
    token:'c868be1151208dd4e5ebe7483022c1ed',
    img:'http://img.admedia.pt/img-medium/',
    _decode:function(object) {
        for(index in object) {
            if (typeof(object[index]) == 'string') {
                object[index] = that.htmlDecode(object[index]);
            } else object[index] = this._decode(object[index]);
        }
        return object;
    },
    _response:function(content, callback, failback) {
        var that = this;
        if (content.status.value) {
            
            that._decode(content);
            if (callback) callback(content);
        } else if(failback) failback(content); else console.log(content);
    },
    login:function(email,pass,callback, failback) {
        var that = this;
        $.ajax({
            url:this.root + 'login/index/'+email+'/'+pass+'/sp'
        }).done(function(content) {
            that._response(content, callback, failback);
        });
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
        $.ajax({
            type:'POST',
            data: {token:that.token},
            url:this.root + 'companies/index/' + category_id
        }).done(function(content) {
            that._response(content, callback, failback);
        });
    },
    categories: function(callback, failback) {
        var that = this;
        $.ajax({
            type:'POST',
            data: {token:that.token},
            url:this.root + 'categories/index/'
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