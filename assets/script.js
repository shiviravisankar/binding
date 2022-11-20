var u=new function() {};
u.o=new Object,
u.e=new Object,
u.init=function(node) {
    var ref=node.dataset.init;u.o[ref].init(node)
},
u.qs=function(query, scope) {
    return(scope=scope||document).querySelector(query)
},
u.qsa=function(query, scope) {
    return(scope=scope||document).querySelectorAll(query)
},
u.ae=function(parent_node, node_type, attributes) {
    var attribute, node=document.createElement(node_type), node=parent_node.appendChild(node);
    if(attributes)for(attribute in attributes)"html"===attribute?node.innerHTML=attributes[attribute]: node.setAttribute(attribute,attributes[attribute]);return node
},
u.cv=function(node, var_name) {
    var regexp=new RegExp(var_name+":[?=\\w/\\#~:., ?+=?&%@!\\-]*");return node.className.match(regexp)[0].replace(var_name+":","")
},
u.hc=function(node, class_name) {
    return node.classList.contains(class_name)
},
u.ac=function(node, class_name) {
    node.classList.add(class_name)
},
u.rc=function(node, class_name) {
    node.classList.remove(class_name)
},
u.as=function(node, styles) {
    for(var style in styles)node.style[style]=styles[style]
},
u.sa=function(node, styles) {
    for(var style in styles)node.setAttribute(style, styles[style])
},
u.e.addEvent=function(node, event_type, options) {
    (options=options||{}).callback=options.callback||node.callback, node.addEventListener(event_type, options.scope?options.callback.bind(options.scope):options.callback, !1)
},
u.absY=function(node) {
    return node.offsetParent?node.offsetTop+u.absY(node.offsetParent): node.offsetTop
},
u.browserW=function() {
    return document.documentElement.clientWidth
},
u.browserH=function() {
    return document.documentElement.clientHeight
},
u.scrollTo=function(node, options) {
    (options=options||{}).duration=options.duration||500;
    var startY=void 0!==node.pageYOffset?node.pageYOffset: node.scrollTop,
    startX=void 0!==node.pageXOffset?node.pageXOffset: node.scrollLeft,
    endY=void 0!==options.y?options.y: startY,
    endX=void 0!==options.x?options.x: startX, endY=Math.min(Math.max(endY, 0), node instanceof Element?node.scrollHeight-node.offsetHeight:document.documentElement.offsetHeight), endX=Math.min(Math.max(endX, 0), node instanceof Element?node.scrollWidth-node.offsetWidth:document.documentElement.offsetWidth), deltaY=endY-startY, deltaX=endX-startX, startTime=0;
    function easing(t,b,c,d) {
        return(t/=d/2)<1?c/2*t*t*t+b: c / 2*((t-=2)*t*t+2)+b
    }
    requestAnimationFrame(function loop(time){time-=startTime=startTime||time;options.duration>time?(requestAnimationFrame(loop), node.scrollTo(easing(time, startX, deltaX, options.duration), easing(time, startY, deltaY, options.duration))):(node.scrollTo(endX, endY), options.callback&&options.callback())})
},
u.o.page=new function() {
    this.init=function(page) {
        page.resized=function(e) {
            clearTimeout(page.resizeTimeout), page.resizeTimeout=setTimeout(function(){page.browserH=u.browserH(),page.browserW=u.browserW();for(var i=0;i<page.components.length;i++)page.components[i].resized(e);page.scrolled()},300)
        },
        page.scrolled=function(e) {
            page.scrollY=document.body.scrollTop;for(var i=0;i<page.components.length;i++)page.components[i].scrolled(e)
        },
        page.ready=function() {
            page.browserH=u.browserH(), page.browserW=u.browserW(), u.e.addEvent(window, "resize", {callback:page.resized}), u.e.addEvent(document.body, "scroll", {callback:page.scrolled}), page.components=u.qsa("[data-init]",page), page.components.forEach(function(node){u.init(node)}), u.ac(page, "page__ready")
        }, document.fonts.ready.then(function(){page.ready()})
    }
},
document.addEventListener("DOMContentLoaded", function(event){u.init(window.page)}),
u.o.background=new function() {
    this.init=function(node) {
        node.resized=function() {
            node.bounds= {
                top: node.offsetTop
            },
            node.intro.bounds= {
                height: node.intro.offsetHeight
            }
        },
        node.scrolled=function() {
            var opacityPersentage;
            node.isActive&&page.scrollY+page.browserH<node.bounds.top?(node.isActive=!1, u.as(node.background, {opacity:1})): page.scrollY+page.browserH>=node.bounds.top&&page.scrollY+page.browserH<node.bounds.top+page.browserH-node.intro.bounds.height?(node.isActive=!0,opacityPersentage=1-100/(page.browserH-node.intro.bounds.height)*(page.scrollY+page.browserH-node.bounds.top) / 100,u.as(node.background,{opacity:opacityPersentage.toFixed(2)})): node.isActive&&page.scrollY+page.browserH>node.bounds.top+page.browserH-node.intro.bounds.height&&(node.isActive=!1,u.as(node.background,{opacity:0}))
        },
        node.build=function() {
            node.isReady=!0,
            node.intro=u.qs(".page-intro-content", page),
            node.intro.bounds= {
                height: node.intro.offsetHeight
            },
            node.background=u.ae(node, "div", {class:"background"}),
            node.bounds= {
                top: node.offsetTop
            }
        }, node.build()
    }
},

 // TITLE TEXT SCROLLING
u.o.headline=new function() {
    this.init=function(node) {
        node.resized=function() {
            node.bounds= {
                top: node.offsetTop,
                width: node.offsetWidth
            }, node.headline.sections.forEach(function(section){section.words.forEach(function(word){word.bounds={width:word.offsetWidth, height:word.offsetHeight}})}), u.as(node.headline, {height:Math.ceil(updatePosition(node.minSize))+"px"}), u.hc(node.headline, "headline__reverse")||u.as(node, {height:Math.max(Math.ceil(updatePosition(node.maxSize))+u.absY(node.headline), 1.5*page.browserH)+"px"}), node.bounds.height=node.offsetHeight, updatePosition(node.currentSize)
        },
        node.scrolled=function() {
            0<=page.scrollY&&(node.isActive&&page.scrollY<=node.bounds.top-page.browserH?(node.isActive=!1,node.currentSize=node.maxSize):page.scrollY>node.bounds.top-page.browserH&&page.scrollY+page.browserH<node.bounds.top+node.bounds.height?(node.isActive=!0,0<node.bounds.top?node.currentScrollPersentage=100-(100/node.bounds.height*(page.scrollY+page.browserH-node.bounds.top)).toFixed(2):node.currentScrollPersentage=100-(100/(node.bounds.height-page.browserH)*page.scrollY).toFixed(2),node.currentSize=node.minSize+(node.maxSize-node.minSize) / 100*node.currentScrollPersentage):node.isActive&&page.scrollY+page.browserH>=node.bounds.top+node.bounds.height&&(node.isActive=!1,node.currentSize=node.minSize),updatePosition(node.currentSize))
        };

         // TITLE TEXT SIZING for title 1
        var updatePosition=function(currentSize) {
            var currentWidth=0, currentHeight=0, sectionIndex=node.headline.sections.length-Math.ceil(node.currentScrollPersentage/(100/node.headline.sections.length));return node.headline.sections.forEach(function(section,i){i<=sectionIndex&&!u.hc(section,"headline-content-section__active")?u.ac(section,"headline-content-section__active"):sectionIndex<i&&u.hc(section,"headline-content-section__active")&&u.rc(section,"headline-content-section__active"),section.words.forEach(function(word){currentWidth+word.bounds.width*currentSize>node.bounds.width&&(currentHeight+=word.bounds.height*currentSize,currentWidth=0),u.as(word,{transform:"translate3d("+currentWidth+"px,"+currentHeight+"px, 0px) scale("+currentSize+")"}),currentWidth+=word.bounds.width*currentSize})}), currentHeight+=node.headline.sections[0].words[0].bounds.height*currentSize
        };

         // TITLE TEXT SIZING REVERSE
        node.build=function() {
            node.isReady=!0,
            node.bounds= {
                top: node.offsetTop,
                width: node.offsetWidth
            }, node.headline=u.qs(".headline", node), node.headline.sections=u.qsa(".headline-content-section", node.headline),
            node.minSize=u.hc(node.headline,"headline__reverse")?1: .35,
            node.maxSize=u.hc(node.headline,"headline__reverse")?.35: 1, node.currentScrollPersentage=100, node.headline.sections.forEach(function(section){section.words=u.qsa(".group", section), section.words.forEach(function(word){word.bounds={width:word.offsetWidth, height:word.offsetHeight}})}), u.as(node.headline, {height:Math.ceil(updatePosition(node.minSize))+"px"}), u.hc(node.headline, "headline__reverse")||u.as(node, {height:Math.max(Math.ceil(updatePosition(node.maxSize))+u.absY(node.headline), 1.5*page.browserH)+"px"}), node.bounds.height=node.offsetHeight, updatePosition(node.maxSize)
        }, node.build()
    }
}
