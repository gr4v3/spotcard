/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var spotcard = {
    root:'http://api.admedia.pt/',
    token:'c868be1151208dd4e5ebe7483022c1ed',
    img:'http://img.admedia.pt/img-medium/',
    login:function(email,pass,callback, failback) {
        $.ajax({
            url:this.root + 'login/index/'+email+'/'+pass+'/sp'
        }).done(function(content) {
            if (content.status.value && callback) callback(content);
            else if(failback) failback(content); else console.log(content);
        });
    },
    logout:function(callback, failback) {
        var that = this;
        $.ajax({
            type:'POST',
            data: {token:that.token},
            url:this.root + 'login/out/'
        }).done(function(content) {
            if (content.status.value && callback) callback(content);
            else if(failback) failback(content); else console.log(content);
        });
    },
    companies: function(category_id, callback, failback) {
        var that = this;
        $.ajax({
            type:'POST',
            data: {token:that.token},
            url:this.root + 'companies/index/' + category_id
        }).done(function(content) {
            if (content.status.value && callback) callback(content);
            else if(failback) failback(content); else console.log(content);
        });
    },
    categories: function(callback, failback) {
        var that = this;
        $.ajax({
            type:'POST',
            data: {token:that.token},
            url:this.root + 'categories/index/'
        }).done(function(content) {
            if (content.status.value && callback) callback(content);
            else if(failback) failback(content); else console.log(content);
        });
    },
    htmlDecode: function (value) {
        return $('<div/>').html(value).text();
    }
};