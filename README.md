# Tenavanetti - käyttöliittymämallit

Käyttöliittymän näkymät testaus- ja tuotantokäyttöön.

# Yksinkertaisia demoja

http://codepen.io/teroktolonen/full/bVwgWQ

# Perusnäkymien alustaminen

```javascript
var body = _e(document.body),
    main = body.div();

tenavanettiViews({
  views_to: main,
  ajaxEndpoint: "ajax",
  test: true,
  lang: "fi",
  ajaxEmulation : true
});

tenavanettiModels({
  models_to: main,
  ajaxEndpoint: "ajax",
  test: true
});

content.layout("top 100% | container 100%");
content.pushTo("top", "oletusYlanavi");
content.model("ilmoitustaulu").then(function(m) {
  content.pushTo("container", "ilmoitustaulu", m);
});

```

# Lokalisaatio

Lang moduulissa voidaan määritellä käännöksiä joillekin teksteille

## _t

```javascript
// "You have $1 unread emails!"
_t("uusia.viesteja", 10);

// -> You have 10 unread emails!
```




# Testaus ja kehitystyö

## View factoryn luominen

```javascript
content.viewFactory("oletusYlanavi", function(id) {
    var o = _e();
    
    // optionally: get model
    var model = _data(id);
    
    o.h1().text("Hello world");
    o.input().bind(model, "name");
    
    return o;
});
```

## Yksinkertainen AJAX-hook

```javascript
_e().ajaxHook("ajax", function(data) {
   if(data.cmd=="ilmoitustaulu") {
        return { ... };
   }});
```
## Palvelimen AJAX -kutsujen emulointi

Serverikutsuja voidaan emuloida, `this` variable voi tallettaa kutsuihin liittyvää dataa.

```javascript
serverAjaxEmu()._addHandler("login", function(data) {

  if(this.userid) {
     // already logged in
  }

  this.userid = 1234;
  return {
    success : true,
    userid : this.userid
  }
})
```

















   

 


   
#### Class tenavanettiViews


- [createExtensions](README.md#tenavanettiViews_createExtensions)
- [createStyles](README.md#tenavanettiViews_createStyles)



   
    
##### trait util_fns

- [guid](README.md#util_fns_guid)
- [isArray](README.md#util_fns_isArray)
- [isFunction](README.md#util_fns_isFunction)
- [isObject](README.md#util_fns_isObject)


    
    
    
    
    
    
    
    
    
    


   
      
    
      
            
#### Class viewFactories


- [_setAjax](README.md#viewFactories__setAjax)
- [gardenModel](README.md#viewFactories_gardenModel)
- [testView](README.md#viewFactories_testView)



   


   



      
    
      
            
#### Class testViewFactories


- [_setAjax](README.md#testViewFactories__setAjax)
- [ilmoitustaulu](README.md#testViewFactories_ilmoitustaulu)
- [kirjautuminen](README.md#testViewFactories_kirjautuminen)
- [muokkaaIlmoitusta](README.md#testViewFactories_muokkaaIlmoitusta)
- [oletusYlanavi](README.md#testViewFactories_oletusYlanavi)
- [opettajaRyhmatLapset](README.md#testViewFactories_opettajaRyhmatLapset)
- [testView](README.md#testViewFactories_testView)
- [tsIlmoitustaulu](README.md#testViewFactories_tsIlmoitustaulu)
- [uusiIlmoitustauluviesti](README.md#testViewFactories_uusiIlmoitustauluviesti)
- [valitsePkJaRyhma](README.md#testViewFactories_valitsePkJaRyhma)
- [vanhempiEtusivu](README.md#testViewFactories_vanhempiEtusivu)
- [vanhempiYlanavi](README.md#testViewFactories_vanhempiYlanavi)
- [viestinLukijat](README.md#testViewFactories_viestinLukijat)



   


   



      
    
      
            
#### Class lang


- [get](README.md#lang_get)
- [lang_en](README.md#lang_lang_en)
- [lang_fi](README.md#lang_lang_fi)



   


   



      
    
      
            
#### Class serverAjaxEmu


- [_addHandler](README.md#serverAjaxEmu__addHandler)
- [_getHandler](README.md#serverAjaxEmu__getHandler)
- [gardenModel](README.md#serverAjaxEmu_gardenModel)
- [ilmoitustaulu](README.md#serverAjaxEmu_ilmoitustaulu)
- [login](README.md#serverAjaxEmu_login)
- [logout](README.md#serverAjaxEmu_logout)
- [test](README.md#serverAjaxEmu_test)
- [tsIlmoitustaulu](README.md#serverAjaxEmu_tsIlmoitustaulu)



   


   



      
    





   
# Class tenavanettiViews


The class has following internal singleton variables:
        
* ajaxEndpoint
        
        
### <a name="tenavanettiViews_createExtensions"></a>tenavanettiViews::createExtensions(t)


```javascript

_e().extendAll({
    tnCheckbox : function(model, variableName) {
        var ch = _e("span");
        ch.touchclick();
        ch._type = "checkbox";
        ch.addClass("glyphicon glyphicon-check");
        ch.bind(model, variableName, function(v) {
               var on = "glyphicon glyphicon-check";
               var off="glyphicon glyphicon-unchecked";
               if(v) {
                  ch.removeClass(off);
                  ch.addClass(on);
               } else {
                  ch.removeClass(on);
                  ch.addClass(off);
               }
           });
        
        this.add(ch);
        return ch;
    }
});
```

### <a name="tenavanettiViews_createStyles"></a>tenavanettiViews::createStyles(t)


```javascript
css().bind(".clickable", {
    cursor : "pointer"
});
```

### tenavanettiViews::constructor( options )

```javascript

if(options.views_to) {
    if(options.test) {
       var m = new testViewFactories_prototype();
       var realM = testViewFactories(options);
    } else {
       var m = new viewFactories_prototype(); 
       var realM = viewFactories(options);
    }
    
    // default target for AJAX calls
    if(options.ajaxEndpoint) {
        ajaxEndpoint = options.ajaxEndpoint;
        realM._setAjax( ajaxEndpoint );
    }
    
    for( var name in m ) {
        if(m.hasOwnProperty(name)) {
            var f = m[name];
            if(this.isFunction(f)) {
                options.views_to.viewFactory( name, realM[name] );
            }
        }
    }
    
    // if there is emulation, call hanlder hooks
    if(options.ajaxEmulation && options.ajaxEndpoint) {
        var emu_p = new serverAjaxEmu_prototype();
        var emu = serverAjaxEmu();
        options.views_to.ajaxHook( options.ajaxEndpoint, function(data) {
            var fn = emu._getHandler(data.cmd);
            if(fn) {
                return fn.apply(emu, [data]);
            }
            if(emu_p.hasOwnProperty(data.cmd)) {
                return emu[data.cmd](data);
            }
        });
       
    }
    this.createExtensions();
    this.createStyles();
}
```
        


   
    
## trait util_fns

The class has following internal singleton variables:
        
        
### <a name="util_fns_guid"></a>util_fns::guid(t)


```javascript
return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
```

### <a name="util_fns_isArray"></a>util_fns::isArray(arrToTest)


```javascript
return Object.prototype.toString.call( arrToTest ) === '[object Array]';
```

### <a name="util_fns_isFunction"></a>util_fns::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="util_fns_isObject"></a>util_fns::isObject(obj)


```javascript
return obj === Object(obj);
```


    
    
    
    
    
    
    
    
    
    


   
      
    
      
            
# Class viewFactories


The class has following internal singleton variables:
        
* ajaxEndpoint
        
        
### <a name="viewFactories__setAjax"></a>viewFactories::_setAjax(url)


```javascript
ajaxEndpoint = url;
```

### <a name="viewFactories_gardenModel"></a>viewFactories::gardenModel(t)


```javascript

```

### <a name="viewFactories_testView"></a>viewFactories::testView(id)


```javascript

var o = _e().addClass("container");

o.text("Hello from testView");

return o;

```



   


   



      
    
      
            
# Class testViewFactories


The class has following internal singleton variables:
        
* _uuid
        
* ajaxEndpoint
        
* _t
        
        
### <a name="testViewFactories__setAjax"></a>testViewFactories::_setAjax(url)


```javascript
ajaxEndpoint = url;
```

### <a name="testViewFactories_ilmoitustaulu"></a>testViewFactories::ilmoitustaulu(id)


```javascript
var o = _e().addClass("container");

o.h1().text("Ilmoitustaulu "+_t("uusia.viesteja", 10));

var mData = _data(id);
mData.then( function() {

    o.button("btn btn-success").text("+ uusi viesti").on("click", function() {
        // uusiIlmoitustauluviesti
        o.pushTo("container", "uusiIlmoitustauluviesti", mData);
    });

    o.div().mvc( mData.list, function(item) {
         var o = _e();
         o.h2().bind(item, "heading");
         o.p().bind(item, "text", true);
         
         var tools = o.div();
         tools.button("btn btn-default").text("Muokkaa").on("click", function() {
             o.pushTo("container", "muokkaaIlmoitusta", item);
         })
         tools.button("btn btn-default").text("Poista").on("click", function() {
             item.remove();
         })         
         
         o.mvc(item.files, function(file) {
            var o = _e();
            o.div().text(file.tiedosto())
            return o;
         });
         
         return o;
    });
});
return o;

```

### testViewFactories::constructor( options )

```javascript
if(!_uuid) {
    _uuid = function() {
        return Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
    }
    var langs = lang(options.lang);
    _t = function(text) {
        var args = Array.prototype.slice.call(arguments);
        return langs.get.apply( langs, args);
    }

    if(window && !window["_t"]) {
        window["_t"] = _t;
    }    
}
```
        
### <a name="testViewFactories_kirjautuminen"></a>testViewFactories::kirjautuminen(t)


```javascript
var o = _e().addClass("container");

var info = o.div();

o.button("btn btn-default").text("<- palaa takaisin").on("click", function() {
    o.popView(); 
});

o.div().text(_t("Käyttäjätunnus"));
var uname = o.input("form-control");
o.div().text(_t("Salasana"));
var pw = o.input("form-control", { type : "password"});

o.button("btn btn-primary").text(_t("login")).on("click", function() {
    o.postJSON(ajaxEndpoint, {
        cmd : "login",
        p : pw.val(),
        un : uname.val(),
        id : 21111
    }, function(data) {
        if(data.success) {
            o.pushTo("top", "vanhempiYlanavi");
            o.pushTo("container", "vanhempiEtusivu");
        } else {
            info.addClass("alert alert-danger");
            info.text(_t("Kirjautuminen epäonnistui"));
        }
    })
});

return o;

```

### <a name="testViewFactories_muokkaaIlmoitusta"></a>testViewFactories::muokkaaIlmoitusta(id)


```javascript
var o = _e().addClass("container");

o.button("btn btn-default").text("<- palaa takaisin").on("click", function() {
    o.popView(); 
});

o.div().text("Muokataan ilmoitustauluviestiä");
var item = _data(id);
o.div().mv(item.whoCanRead, "viestinLukijat");
var editArea = o.div();

item.then( function() {
     editArea.label().text(_t("Otsikko"));
     editArea.input("form-control").bind(item, "heading");
     editArea.label().text(_t("Sisältö"));
     editArea.textarea("form-control").bind(item, "text").height(300);
});



return o;
```

### <a name="testViewFactories_oletusYlanavi"></a>testViewFactories::oletusYlanavi(t)


```javascript
var o = _e().addClass("navi-top");

o.div().text("Default topnavi is here");

return o;
```

### <a name="testViewFactories_opettajaRyhmatLapset"></a>testViewFactories::opettajaRyhmatLapset(id)


```javascript
var o = _e().addClass("container");

o.h1().text("Lapset ja ryhmät");

var mData = _data(id);
mData.then( function() {
    
    o.div().mvc( mData.gardens, function(item) {
        
         var o = _e();
         o.h2().bind(item, "name");
         
         o.div().mvc( item.groups, function(gr) {
             var o = _e();
             o.div().bind(gr, "name");
             return o;
         });
         
         return o;
    });
});
return o;
```

### <a name="testViewFactories_testView"></a>testViewFactories::testView(id)


```javascript

var o = _e().addClass("container");

o.text("Hello from testView");

return o;

```

### <a name="testViewFactories_tsIlmoitustaulu"></a>testViewFactories::tsIlmoitustaulu(id)


```javascript

// content.pushTo("container", "ilmoitustaulu", m);

var o = _e().addClass("container");

o.h1().text("Ilmoitustaulu - toimistosihteeri");

var mData = _data(id);
mData.then( function() {
    
    o.button("btn btn-success").text("+ uusi viesti").on("click", function() {
        // uusiIlmoitustauluviesti
        o.pushTo("container", "uusiIlmoitustauluviesti", mData);
    });

    o.div().mvc( mData.list, function(item) {
         var itemDiv = _e();
         itemDiv.addClass("panel panel-default");
         itemDiv.div("panel-heading").bind(item, "heading");

         var o = itemDiv.div("panel-body");
         o.p().bind(item, "text", true);
         var tools = o.div();
         
         o.ul("list-group").mvc(item.files, function(file) {
            var o = _e("li");
            o.addClass("list-group-item");
            o.button("btn btn-primary").span("glyphicon glyphicon-paperclip");
            o.h4().bind(file,"tiedosto");
            o.div().bind(file,"nimi");
            return o;
         });
         
         o.div().mv(item.whoCanRead, "viestinLukijat");
         
         var foot = itemDiv.div("panel-footer");
         foot.button("btn btn-default").text("Muokkaa").on("click", function() {
             o.pushTo("container", "muokkaaIlmoitusta", item);
         })
         foot.button("btn btn-default").text("Poista").on("click", function() {
             if(confirm(_t("Poistetaanko viesti?"))) item.remove();
         })         
         return itemDiv;
    });
});
return o;
```

### <a name="testViewFactories_uusiIlmoitustauluviesti"></a>testViewFactories::uusiIlmoitustauluviesti(id)


```javascript
var o = _e().addClass("container");

o.button("btn btn-default").text("<- palaa takaisin").on("click", function() {
    o.popView(); 
});

o.div().text("Lisätään uusi ilmoitustauluviesti");

var messages = o.div();

var item = _data({
            id : ("new_item_"+ _uuid()),
            heading : "",
            text : "",
            whoCanRead : []
        });
var ilmModel = _data(id);        
item.then( function() {
     o.input("form-control").bind(item, "heading");
     o.textarea("form-control").bind(item, "text").height(300);
     o.button("btn btn-success").text("Lisätään uusi viesti").on("click", function() {
         if(ajaxEndpoint) {
             
             o.postJSON(ajaxEndpoint, {
                cmd : "test"
             }, function(resObj) {
                 if(resObj.success) {
                     ilmModel.list.push(item.toPlainData(), 0);
                     o.popView();        
                 } else {
                     messages.text(_t( "Viestin lisäys ei onnistunut") ) ;
                 }
             }, function() {
                 messages.text("Sending the file failed");
             });
         }

     });
});

o.on("mount", function() {
    item.text("").heading(""); 
});

return o;
```

### <a name="testViewFactories_valitsePkJaRyhma"></a>testViewFactories::valitsePkJaRyhma(id)


```javascript

var gardenInfo = _data(id);

var leftRow = _e();

var gDiv = leftRow.div(),
	didAll = false;

gDiv.button("btn btn-default btn-sm").text("Valitse kaikki").on("click", function() {
    var cnt = 0, total = 0;
    gardenInfo.gardens.forEach( function(g) {
        g.groups.forEach( function(g) {
            if(g.get("selected")) cnt++;
            total++;
        });
    });
    if(cnt==0) didAll = false;
	if( didAll ) {
        gardenInfo.gardens.forEach( function(g) {
            g.set("selected", false);
            g.groups.forEach( function(g) {
                g.set("selected", false);
            });
        })
        didAll = false;
	} else {
        gardenInfo.gardens.forEach( function(g) {
            g.set("selected", true);
            g.groups.forEach( function(g) {
                g.set("selected", true);
            });            
        })
        didAll = true;	    
	}
});	
gDiv.button("btn btn-default btn-sm").text("Peruuta valinnat").on("click", function() {
    gardenInfo.undoStep();
});

leftRow.ul("nav nav-pills").tree( gardenInfo.gardens, function(item, level) {
    var o = _e("li");
    o.addClass("clickable");
    o.addClass("list-group-item");
    if(!item.get("selected")) {
        item.set("selected", false);
    }
    if(level>1) {
        o.tnCheckbox( item, "selected");
    }
    o.span().text(" ");
    var name = o.span("dragLabel").bind(item, "name");
    
    var bAll = true;
    o.on("click", function() {
        if(level>1) {
            item.set("selected", !item.get("selected"));
        } else {
            item.groups.forEach( function(g) {
                g.set("selected", bAll);
            });
            bAll = !bAll;
        }
    });
    this.subTree(item.groups, o.ul() );
    return o;
});


return leftRow;
```

### <a name="testViewFactories_vanhempiEtusivu"></a>testViewFactories::vanhempiEtusivu(t)


```javascript
var o = _e().addClass("container");

o.h1().text("Vanhempien etusivu tulee tähän kohtaan");


return o;
```

### <a name="testViewFactories_vanhempiYlanavi"></a>testViewFactories::vanhempiYlanavi(t)


```javascript
var o = _e().addClass("navi-top");

o.button("btn btn-defaul").text(_t("logout")).on("click", function() {
    
});

return o;
```

### <a name="testViewFactories_viestinLukijat"></a>testViewFactories::viestinLukijat(id)


```javascript
var readers = _data(id);

var o = _e();

var readerWarning = o.div();
var readerInfo = o.div();
readerInfo.mvc(readers, function(reader) {
    var e = _e("span");
    e.span("glyphicon glyphicon-user");
    e.span().text(reader.name()+" ("+reader.gardenName()+")");
    return e;
});

var set_reader_status = function() {
    if(readers.length()==0) {
        readerWarning.clear();
        var ss = readerWarning.div("alert alert-warning");
        ss.span("glyphicon glyphicon-warning-sign");
        ss.span().text("Viestillä ei ole yhtään lukijoita!");
    } else {
        readerWarning.clear();
    }
}

readers.on("insert", function() {
    set_reader_status();
});
readers.on("remove", function() {
    set_reader_status();
});

set_reader_status();


var selectDiv = o.div();

o.button("btn btn-default btn-sm").text("valitse kenellä näkyy").on("click", function() {
    var newDiv = _e();
    o.model("gardenModel").then( function(m) {
        var valinnat = m.model.localFork();
        valinnat.forTree( function(item) {
            readers.forEach( function(on) {
                if(on.id() == item.id()) item.set("selected", true); 
            });
        });
        newDiv.mv(valinnat, "valitsePkJaRyhma");
        newDiv.button("btn btn-primary").text(_t("Tallenna")).on("click", function() {
            valinnat.forTree( function(item) {
                if(item.type()=="group") {
                    if(item.get("selected")) {
                        var is_there = false;
                        readers.forEach( function(on) {
                            if(on.id() == item.id()) is_there = true;
                        });                  
                        if(!is_there) readers.push({
                            id : item.id(),
                            name : item.name(),
                            gardenName : item.parent().parent().name()
                        });
                    } else {
                        readers.forEach( function(on) {
                            if(on.id() == item.id()) on.remove();
                        });                        
                    }
                }
            });
            if(readers.length()==0) {
                readerWarning.clear();
                var ss = readerWarning.div("alert alert-warning");
                ss.span("glyphicon glyphicon-warning-sign");
                ss.span().text("Viestillä ei ole yhtään lukijoita!");
            } else {
                readerWarning.clear();
            }
            newDiv.popView();
        });
        
    });     
    o.pushView(newDiv);
})
return o;




```



   


   



      
    
      
            
# Class lang


The class has following internal singleton variables:
        
* _uuid
        
* ajaxEndpoint
        
        
### <a name="lang_get"></a>lang::get(text)


```javascript

var a = [], i=0;
var token = this._translations[text];
if(token) {
    for(var i=1; i<arguments.length; i++) {
        token = token.replace("$"+i, arguments[i]);
    }
    text = token;
}

return text;
```

### lang::constructor( langName )

```javascript

this._translations = {
    test : "You have $1 unread emails!"
};

if(langName && this["lang_"+langName]) {
    this["lang_"+langName]();
}
```
        
### <a name="lang_lang_en"></a>lang::lang_en(t)


```javascript
this._translations = {
    "uusia.viesteja"  : "You have $1 unread emails!"
};
```

### <a name="lang_lang_fi"></a>lang::lang_fi(t)


```javascript
this._translations = {
    "uusia.viesteja" : "Olet saanut $1 uutta viestiä!",
    "login" : "Kirjaudu"
};
```



   


   



      
    
      
            
# Class serverAjaxEmu


The class has following internal singleton variables:
        
* _uuid
        
* ajaxEndpoint
        
* _t
        
* _currentId
        
* _makeId
        
* _handlers
        
* _idCache
        
        
### <a name="serverAjaxEmu__addHandler"></a>serverAjaxEmu::_addHandler(cmdName, handlerFn)


```javascript
if(!_handlers) _handlers = {};
_handlers[cmdName] = handlerFn;

```

### <a name="serverAjaxEmu__getHandler"></a>serverAjaxEmu::_getHandler(cmdName)


```javascript
if(_handlers) {
    return _handlers[cmdName];
}
```

### <a name="serverAjaxEmu_gardenModel"></a>serverAjaxEmu::gardenModel(data)

Default test JSON to be used when initializing the system data...
```javascript
return {
    gardens : [
        {
            id : _makeId(),
            name : "Agoran päiväkoti",
            type : "garden",
            settings : {
                
            },
            groups : [
                { id : _makeId("group1"), name : "Pörriäiset",
                    type : "group",
                    children : [
                        {   id : _makeId("child8"),  
                            name : "Esko Antero"
                        }, 
                        { id : _makeId("child1"),  name : "Alma Nikula"}, 
                        { id : _makeId("child2"),  name : "Juuso Nettinen"}, 
                        { id : _makeId("child3"),  name : "Pirjo Lahtinen"} 
                    ]
                },
                { id : _makeId("group3"), name : "Purhoset",
                    type : "group",
                    children : [
                        {   id : _makeId("child18"),  
                            name : "Asko Entero"
                        }, 
                        { id : _makeId("child11"),  name : "Nisse Nikula"}, 
                        { id : _makeId("child12"),  name : "Jarmo Järvinen"}, 
                        { id : _makeId("child13"),  name : "Pirkko Lahtinen"} 
                    ]
                }                
            ]
        },
        {
            id : _makeId(),
            name : "Kummilan kummikoti",
            settings : {
                
            },
            groups : [
                { id : _makeId("group2"), name : "Herhiläiset",
                    type : "group",
                    children : [
                        {   id : _makeId("child7"),  
                            name : "Esko Antero"
                        }, 
                        { id : _makeId("child4"),  name : "Armo Nikula"}, 
                        { id : _makeId("child5"),  name : "Jukka Mänttäri"}, 
                        { id : _makeId("child6"),  name : "Arttu Viskari"} 
                    ]
                }
            ]
        }        
    ]
};
```

### <a name="serverAjaxEmu_ilmoitustaulu"></a>serverAjaxEmu::ilmoitustaulu(t)

Muodosta näkymä, jossa on käyttäjälle tarkoitetun ilmoitustaulun sisältö
```javascript

return {
    list : [
        {
            id : _makeId(),
            heading : "Ilmoituksen otsikko - from AJAX emulator",
            text : "Ilmoituksen sisältöteksti\n\n rivi 2\n rivi 3",
            files : [
                {
                    id : _makeId(),
                    nimi : "Testipäiväkoti",
                    tiedosto : "ilmoitus.pdf"
                }
            ],
            linkit : [
                {  
                    id : _makeId(),
                    url : "http://www.yle.fi",
                    text : "Linkki YLE:n sivustolle tulee tähän kohtaan"
                }
            ],
            readerList : [
                {  
                    id : _makeId("group1"),
                    url : "http://www.yle.fi",
                    text : "Linkki YLE:n sivustolle tulee tähän kohtaan"
                },
                {  
                    id : _makeId("group2"),
                    url : "http://www.yle.fi",
                    text : "Linkki YLE:n sivustolle tulee tähän kohtaan"
                }
            ]
        },
        {
            id : _makeId(),
            heading : "Toinen ilmoitustauluviesti",
            text : "Ilmoitustauluviestin sisältöteksti\n\n rivi 2\n rivi 3",
            files : [
                {
                    id : _makeId(),
                    nimi : "Testipäiväkoti",
                    tiedosto : "ilmoitus2.pdf"
                }
            ],
            linkit : []
        } 
    ]

};
```

### serverAjaxEmu::constructor( options )

```javascript
if(!_uuid) {
    _idCache = {};
    _uuid = function() {
        return Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
    }
    _makeId = function(name) {
        if(!_currentId) _currentId = 1;
        if(name) {
            if(_idCache[name]) return _idCache[name];
            _idCache[name] = _currentId++;
            return _idCache[name];
        } else {
            return _currentId++;
        }
    }    
}
```
        
### <a name="serverAjaxEmu_login"></a>serverAjaxEmu::login(data)


```javascript
if(this.userid) {
    return {
       userid : this.userid,
       success : true
    }     
}

if(data.un=="ope") {
    this.userid = 100;
    this.role = "opettaja";
    return {
       userid : 100,
       success : true
    }      
} 
if(data.un=="vanh") {
    this.userid = 101;
    this.role = "vanhempi";
    return {
       userid : 101,
       success : true
    }      
} 

return {
   success : false
}     
```

### <a name="serverAjaxEmu_logout"></a>serverAjaxEmu::logout(t)


```javascript
this.userid = null;
return {
   userid : this.userid,
   success : true
}     
```

### <a name="serverAjaxEmu_test"></a>serverAjaxEmu::test(data)


```javascript
return {
 text : "Hello form test function",
 success : true
};
```

### <a name="serverAjaxEmu_tsIlmoitustaulu"></a>serverAjaxEmu::tsIlmoitustaulu(t)

Toimistosihteerin ilmoitustaulun sisältö.
```javascript

return {
    list : [
        {
            id : _makeId(),
            heading : "Toimistosihteerin jättämä ilmoitus",
            text : "Ilmoituksen sisältöteksti\n\n rivi 2\n rivi 3",
            files : [
                {
                    id : _makeId(),
                    nimi : "Ilmoitus vanhenpainillan ohjelmasta",
                    tiedosto : "ilmoitus.pdf"
                }
            ],
            linkit : [
                {  
                    id : _makeId(),
                    url : "http://www.yle.fi",
                    text : "Linkki YLE:n sivustolle tulee tähän kohtaan"
                }
            ],
            whoCanRead : [
                {  
                    id : _makeId("group1"),
                    name : "Pörriäiset",
                    gardenName : "Agoran päiväkoti"
                },
                {  
                    id : _makeId("group2"),
                    name : "Herhiläiset",
                    gardenName : "Kummilan kummikoti"
                }
            ]
        },
        {
            id : _makeId(),
            heading : "Toinen ilmoitustauluviesti",
            text : "Ilmoitustauluviestin sisältöteksti\n\n rivi 2\n rivi 3",
            files : [
            ],
            linkit : [],
            whoCanRead : [
                {  
                    id : _makeId("group1"),
                    name : "Pörriäiset",
                    gardenName : "Agoran päiväkoti"
                },
                {  
                    id : _makeId("group2"),
                    name : "Herhiläiset",
                    gardenName : "Kummilan kummikoti"
                }
            ]
        } 
    ]

};
```



   


   



      
    




