(function(){var t={},n=function(){!function(t){var n;t._setAjax=function(t){n=t},t.gardenModel=function(){},t.testView=function(){var t=_e().addClass("container");return t.text("Hello from testView"),t}}(this)},i=function(t,n,e,a,o,s,u,r){var l,c=this;if(!(c instanceof i))return new i(t,n,e,a,o,s,u,r);var d=[t,n,e,a,o,s,u,r];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){l=t.apply(c,d)}),"function"==typeof l){if(l._classInfo.name!=i._classInfo.name)return new l(t,n,e,a,o,s,u,r)}else if(l)return l;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,d)}):"function"==typeof c.init&&c.init.apply(c,d)};i._classInfo={name:"viewFactories"},i.prototype=new n,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.viewFactories=i,this.viewFactories=i):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.viewFactories=i:this.viewFactories=i}.call(new Function("return this")());var e=function(){!function(t){var n,i,e;t._setAjax=function(t){i=t},t.ilmoitustaulu=function(t){var n=_e().addClass("container");n.h1().text("Ilmoitustaulu "+e("uusia.viesteja",10));var i=_data(t);return i.then(function(){n.button("btn btn-success").text("+ uusi viesti").on("click",function(){n.pushTo("container","uusiIlmoitustauluviesti",i)}),n.div().mvc(i.list,function(t){var n=_e();n.h2().bind(t,"heading"),n.p().bind(t,"text",!0);var i=n.div();return i.button("btn btn-default").text("Muokkaa").on("click",function(){n.pushTo("container","muokkaaIlmoitusta",t)}),i.button("btn btn-default").text("Poista").on("click",function(){t.remove()}),n.mvc(t.files,function(t){var n=_e();return n.div().text(t.tiedosto()),n}),n})}),n},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){if(!n){n=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)};var i=s(t.lang);e=function(){var t=Array.prototype.slice.call(arguments);return i.get.apply(i,t)},window&&!window._t&&(window._t=e)}}),t.kirjautuminen=function(){var t=_e().addClass("container"),n=t.div();t.button("btn btn-default").text("<- palaa takaisin").on("click",function(){t.popView()}),t.div().text(e("Käyttäjätunnus"));var a=t.input("form-control");t.div().text(e("Salasana"));var o=t.input("form-control",{type:"password"});return t.button("btn btn-primary").text(e("login")).on("click",function(){t.postJSON(i,{cmd:"login",p:o.val(),un:a.val(),id:21111},function(i){i.success?(t.pushTo("top","vanhempiYlanavi"),t.pushTo("container","vanhempiEtusivu")):(n.addClass("alert alert-danger"),n.text(e("Kirjautuminen epäonnistui")))})}),t},t.muokkaaIlmoitusta=function(t){var n=_e().addClass("container");n.button("btn btn-default").text("<- palaa takaisin").on("click",function(){n.popView()}),n.div().text("Muokataan ilmoitustauluviestiä");var a=_data(t);n.div().mv(a.whoCanRead,"viestinLukijat");var o=n.div();return a.then(function(){o.label().text(e("Otsikko")),o.input("form-control").bind(a,"heading"),o.label().text(e("Sisältö")),o.textarea("form-control").bind(a,"text").height(300),o.button("btn btn-success").text("Tallenna muutokset").on("click",function(){i&&n.postJSON(i,{cmd:"editNote",data:a.toPlainData()},function(t){t.success?(t.text&&n.pushTo("messages","newMessage",_data(t)),n.popView()):messages.text("Save failed")},function(){messages.text("Sending the file failed")})})}),n},t.muokkaaLiitetiedostoja=function(t){var n=_data(t),i=_e();i.addClass("panel panel-default"),i.div("panel-heading").text(e("Muokataan liitetiedostoja"));var a=i.div("panel-body");return a.ul("list-group").mvc(n,function(t){var n=_e("li");return n.addClass("list-group-item"),n.h4().bind(t,"tiedosto"),n.label().text(e("Tiedoston nimi")),n.div().input("form-control").bind(t,"nimi"),n}),a.button("btn btn-primary").text("Tallenna").on("click",function(){i.popView()}),i},t.newMessage=function(t){var n=_e(),i=_data(t),e=n.div("alert alert-info");return e.text(i.text()),setTimeout(function(){n.remove()},4e3),n},t.oletusYlanavi=function(){var t=_e().addClass("navi-top");return t.div().text("Default topnavi is here"),t},t.opettajaRyhmatLapset=function(t){var n=_e().addClass("container");n.h1().text("Lapset ja ryhmät");var i=_data(t);return i.then(function(){n.div().mvc(i.gardens,function(t){var n=_e();return n.h2().bind(t,"name"),n.div().mvc(t.groups,function(t){var n=_e();return n.div().bind(t,"name"),n}),n})}),n},t.testView=function(){var t=_e().addClass("container");return t.button().text("pop test view").on("click",function(){t.popView()}),t.div().text("Hello from testView"),t},t.tsIlmoitustaulu=function(t){var n=_e().addClass("container");n.h1().text("Ilmoitustaulu - toimistosihteeri");var i=_data(t);return i.then(function(){n.button("btn btn-success").text("+ uusi viesti").on("click",function(){n.pushTo("container","uusiIlmoitustauluviesti",i)}),n.div().mvc(i.list,function(t){var n=_e();n.addClass("panel panel-default"),n.div("panel-heading").bind(t,"heading");var i=n.div("panel-body");i.p().bind(t,"text",!0);var a=(i.div(),i.div());a.ul("list-group").mvc(t.files,function(n){var i=_e("li");i.addClass("list-group-item");var e=i.button("btn btn-primary").on("click",function(){a.push(t.files,"muokkaaLiitetiedostoja")});return e.span("glyphicon glyphicon-paperclip"),i.h4().bind(n,"tiedosto"),i.div().bind(n,"nimi"),i}),i.div().mv(t.whoCanRead,"viestinLukijat");var o=n.div("panel-footer");return o.button("btn btn-default").text("Muokkaa").on("click",function(){i.pushTo("container","muokkaaIlmoitusta",t)}),o.button("btn btn-default").text("Poista").on("click",function(){confirm(e("Poistetaanko viesti?"))&&t.remove()}),n})}),n},t.uusiIlmoitustauluviesti=function(t){var a=_e().addClass("container");a.button("btn btn-default").text("<- palaa takaisin").on("click",function(){a.popView()}),a.div().text("Lisätään uusi ilmoitustauluviesti");var o=a.div(),s=_data({id:"new_item_"+n(),heading:"",text:"",whoCanRead:[]}),u=_data(t);return s.then(function(){a.label().text(e("Viestin otsikko")),a.input("form-control").bind(s,"heading"),a.label().text(e("Viestin sisältö")),a.textarea("form-control").bind(s,"text").height(300),a.button("btn btn-success").text("Lisätään uusi viesti").on("click",function(){i&&a.postJSON(i,{cmd:"test"},function(t){t.success?(u.list.push(s.toPlainData(),0),a.popView()):o.text(e("Viestin lisäys ei onnistunut"))},function(){o.text("Sending the file failed")})})}),a.on("mount",function(){s.text("").heading("")}),a},t.valitsePkJaRyhma=function(t){var n=_data(t),i=_e(),e=i.div(),a=!1;return e.button("btn btn-default btn-sm").text("Valitse kaikki").on("click",function(){var t=0,i=0;n.gardens.forEach(function(n){n.groups.forEach(function(n){n.get("selected")&&t++,i++})}),0==t&&(a=!1),a?(n.gardens.forEach(function(t){t.set("selected",!1),t.groups.forEach(function(t){t.set("selected",!1)})}),a=!1):(n.gardens.forEach(function(t){t.set("selected",!0),t.groups.forEach(function(t){t.set("selected",!0)})}),a=!0)}),e.button("btn btn-default btn-sm").text("Peruuta valinnat").on("click",function(){n.undoStep()}),i.ul("nav nav-pills").tree(n.gardens,function(t,n){var i=_e("li");i.addClass("clickable"),i.addClass("list-group-item"),t.get("selected")||t.set("selected",!1),n>1&&i.tnCheckbox(t,"selected"),i.span().text(" ");var e=(i.span("dragLabel").bind(t,"name"),!0);return i.on("click",function(){n>1?t.set("selected",!t.get("selected")):(t.groups.forEach(function(t){t.set("selected",e)}),e=!e)}),i.touchclick(),this.subTree(t.groups,i.ul()),i}),i},t.vanhempiEtusivu=function(){var t=_e().addClass("container");return t.h1().text("Vanhempien etusivu tulee tähän kohtaan"),t},t.vanhempiYlanavi=function(){var t=_e().addClass("navi-top");return t.button("btn btn-defaul").text(e("logout")).on("click",function(){}),t},t.viestinLukijat=function(t){var n=_data(t),i=_e(),a=i.div(),o=i.div();o.mvc(n,function(t){var n=_e("span");return n.span("glyphicon glyphicon-user"),n.span().text(t.name()+" ("+t.gardenName()+")"),n});var s=function(){if(0==n.length()){a.clear();var t=a.div("alert alert-warning");t.span("glyphicon glyphicon-warning-sign"),t.span().text("Viestillä ei ole yhtään lukijoita!")}else a.clear()};n.on("insert",function(){s()}),n.on("remove",function(){s()}),s();i.div();return i.button("btn btn-default btn-sm").text("valitse kenellä näkyy").on("click",function(){var t=_e();i.model("gardenModel").then(function(i){var o=i.model.localFork();o.forTree(function(t){n.forEach(function(n){n.id()==t.id()&&t.set("selected",!0)})}),t.mv(o,"valitsePkJaRyhma"),t.button("btn btn-primary").text(e("Tallenna")).on("click",function(){if(o.forTree(function(t){if("group"==t.type())if(t.get("selected")){var i=!1;n.forEach(function(n){n.id()==t.id()&&(i=!0)}),i||n.push({id:t.id(),name:t.name(),gardenName:t.parent().parent().name()})}else n.forEach(function(n){n.id()==t.id()&&n.remove()})}),0==n.length()){a.clear();var i=a.div("alert alert-warning");i.span("glyphicon glyphicon-warning-sign"),i.span().text("Viestillä ei ole yhtään lukijoita!")}else a.clear();t.popView()})}),i.pushView(t)}),i}}(this)},a=function(t,n,i,e,o,s,u,r){var l,c=this;if(!(c instanceof a))return new a(t,n,i,e,o,s,u,r);var d=[t,n,i,e,o,s,u,r];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){l=t.apply(c,d)}),"function"==typeof l){if(l._classInfo.name!=a._classInfo.name)return new l(t,n,i,e,o,s,u,r)}else if(l)return l;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,d)}):"function"==typeof c.init&&c.init.apply(c,d)};a._classInfo={name:"testViewFactories"},a.prototype=new e,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.testViewFactories=a,this.testViewFactories=a):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.testViewFactories=a:this.testViewFactories=a}.call(new Function("return this")());var o=function(){!function(t){t.get=function(t){var n=0,i=this._translations[t];if(i){for(var n=1;n<arguments.length;n++)i=i.replace("$"+n,arguments[n]);t=i}return t},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){this._translations={test:"You have $1 unread emails!"},t&&this["lang_"+t]&&this["lang_"+t]()}),t.lang_en=function(){this._translations={"uusia.viesteja":"You have $1 unread emails!"}},t.lang_fi=function(){this._translations={"uusia.viesteja":"Olet saanut $1 uutta viestiä!",login:"Kirjaudu"}}}(this)},s=function(t,n,i,e,a,o,u,r){var l,c=this;if(!(c instanceof s))return new s(t,n,i,e,a,o,u,r);var d=[t,n,i,e,a,o,u,r];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){l=t.apply(c,d)}),"function"==typeof l){if(l._classInfo.name!=s._classInfo.name)return new l(t,n,i,e,a,o,u,r)}else if(l)return l;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,d)}):"function"==typeof c.init&&c.init.apply(c,d)};s._classInfo={name:"lang"},s.prototype=new o,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.lang=s,this.lang=s):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.lang=s:this.lang=s}.call(new Function("return this")());var u=function(){!function(t){var n,i,e,a,o;t._addHandler=function(t,n){a||(a={}),a[t]=n},t._getHandler=function(t){return a?a[t]:void 0},t.editNote=function(){return{text:"Tallennus onnistui",success:!0}},t.gardenModel=function(){return{gardens:[{id:e(),name:"Agoran päiväkoti",type:"garden",settings:{},groups:[{id:e("group1"),name:"Pörriäiset",type:"group",children:[{id:e("child8"),name:"Esko Antero"},{id:e("child1"),name:"Alma Nikula"},{id:e("child2"),name:"Juuso Nettinen"},{id:e("child3"),name:"Pirjo Lahtinen"}]},{id:e("group3"),name:"Purhoset",type:"group",children:[{id:e("child18"),name:"Asko Entero"},{id:e("child11"),name:"Nisse Nikula"},{id:e("child12"),name:"Jarmo Järvinen"},{id:e("child13"),name:"Pirkko Lahtinen"}]}]},{id:e(),name:"Kummilan kummikoti",settings:{},groups:[{id:e("group2"),name:"Herhiläiset",type:"group",children:[{id:e("child7"),name:"Esko Antero"},{id:e("child4"),name:"Armo Nikula"},{id:e("child5"),name:"Jukka Mänttäri"},{id:e("child6"),name:"Arttu Viskari"}]}]}]}},t.ilmoitustaulu=function(){return{list:[{id:e(),heading:"Ilmoituksen otsikko - from AJAX emulator",text:"Ilmoituksen sisältöteksti\n\n rivi 2\n rivi 3",files:[{id:e(),nimi:"Testipäiväkoti",tiedosto:"ilmoitus.pdf"}],linkit:[{id:e(),url:"http://www.yle.fi",text:"Linkki YLE:n sivustolle tulee tähän kohtaan"}],readerList:[{id:e("group1"),url:"http://www.yle.fi",text:"Linkki YLE:n sivustolle tulee tähän kohtaan"},{id:e("group2"),url:"http://www.yle.fi",text:"Linkki YLE:n sivustolle tulee tähän kohtaan"}]},{id:e(),heading:"Toinen ilmoitustauluviesti",text:"Ilmoitustauluviestin sisältöteksti\n\n rivi 2\n rivi 3",files:[{id:e(),nimi:"Testipäiväkoti",tiedosto:"ilmoitus2.pdf"}],linkit:[]}]}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){n||(o={},n=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},e=function(t){return i||(i=1),t?o[t]?o[t]:(o[t]=i++,o[t]):i++})}),t.login=function(t){return this.userid?{userid:this.userid,success:!0}:"ope"==t.un?(this.userid=100,this.role="opettaja",{userid:100,success:!0}):"vanh"==t.un?(this.userid=101,this.role="vanhempi",{userid:101,success:!0}):{success:!1}},t.logout=function(){return this.userid=null,{userid:this.userid,success:!0}},t.test=function(){return{text:"Hello form test function",success:!0}},t.tsIlmoitustaulu=function(){return{list:[{id:e(),heading:"Toimistosihteerin jättämä ilmoitus",text:"Ilmoituksen sisältöteksti\n\n rivi 2\n rivi 3",files:[{id:e(),nimi:"Ilmoitus vanhenpainillan ohjelmasta",tiedosto:"ilmoitus.pdf"}],linkit:[{id:e(),url:"http://www.yle.fi",text:"Linkki YLE:n sivustolle tulee tähän kohtaan"}],whoCanRead:[{id:e("group1"),name:"Pörriäiset",gardenName:"Agoran päiväkoti"},{id:e("group2"),name:"Herhiläiset",gardenName:"Kummilan kummikoti"}]},{id:e(),heading:"Toinen ilmoitustauluviesti",text:"Ilmoitustauluviestin sisältöteksti\n\n rivi 2\n rivi 3",files:[],linkit:[],whoCanRead:[{id:e("group1"),name:"Pörriäiset",gardenName:"Agoran päiväkoti"},{id:e("group2"),name:"Herhiläiset",gardenName:"Kummilan kummikoti"}]}]}}}(this)},r=function(t,n,i,e,a,o,s,u){var l,c=this;if(!(c instanceof r))return new r(t,n,i,e,a,o,s,u);var d=[t,n,i,e,a,o,s,u];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){l=t.apply(c,d)}),"function"==typeof l){if(l._classInfo.name!=r._classInfo.name)return new l(t,n,i,e,a,o,s,u)}else if(l)return l;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,d)}):"function"==typeof c.init&&c.init.apply(c,d)};r._classInfo={name:"serverAjaxEmu"},r.prototype=new u,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.serverAjaxEmu=r,this.serverAjaxEmu=r):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.serverAjaxEmu=r:this.serverAjaxEmu=r}.call(new Function("return this")());var l=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){var o;t.createExtensions=function(){_e().extendAll({tnCheckbox:function(t,n){var i=_e("span");return i.touchclick(),i._type="checkbox",i.addClass("glyphicon glyphicon-check"),i.bind(t,n,function(t){var n="glyphicon glyphicon-check",e="glyphicon glyphicon-unchecked";t?(i.removeClass(e),i.addClass(n)):(i.removeClass(n),i.addClass(e))}),this.add(i),i}})},t.createStyles=function(){css().bind(".clickable",{cursor:"pointer"})},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){if(t.views_to){if(t.test)var s=new e,l=a(t);else var s=new n,l=i(t);t.ajaxEndpoint&&(o=t.ajaxEndpoint,l._setAjax(o));for(var c in s)if(s.hasOwnProperty(c)){var d=s[c];this.isFunction(d)&&t.views_to.viewFactory(c,l[c])}if(t.ajaxEmulation&&t.ajaxEndpoint){var f=new u,p=r();t.views_to.ajaxHook(t.ajaxEndpoint,function(t){var n=p._getHandler(t.cmd);return n?n.apply(p,[t]):f.hasOwnProperty(t.cmd)?p[t.cmd](t):void 0})}this.createExtensions(),this.createStyles()}})}(this)},c=function(t,n,i,e,a,o,s,u){var r,l=this;if(!(l instanceof c))return new c(t,n,i,e,a,o,s,u);var d=[t,n,i,e,a,o,s,u];if(l.__factoryClass)if(l.__factoryClass.forEach(function(t){r=t.apply(l,d)}),"function"==typeof r){if(r._classInfo.name!=c._classInfo.name)return new r(t,n,i,e,a,o,s,u)}else if(r)return r;l.__traitInit?l.__traitInit.forEach(function(t){t.apply(l,d)}):"function"==typeof l.init&&l.init.apply(l,d)};c._classInfo={name:"tenavanettiViews"},c.prototype=new l,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.tenavanettiViews=c,this.tenavanettiViews=c):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.tenavanettiViews=c:this.tenavanettiViews=c}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());