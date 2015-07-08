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
            else failback(content);
        });
    },
    logout:function(callback, failback) {
        $.ajax({
            url:this.root + 'login/out/' + this.token
        }).done(function(content) {
            if (content.status.value && callback) callback(content);
            else failback(content);
        });
    },
    companies: function(callback, failback) {
        $.ajax({
            url:this.root + 'companies/index/0/1/' + this.token
        }).done(function(content) {
            if (content.status.value && callback) callback(content);
            else failback(content);
        });
    },
    categories: function(callback, failback) {
        var that = this;
        $.ajax({
            url:this.root + 'categories/index/' + this.token
        }).done(function(content) {
            if (content.status.value && callback) callback(content);
            else failback(content);
        });
    },
    htmlDecode: function (value) {
        return $('<div/>').html(value).text();
    }
};