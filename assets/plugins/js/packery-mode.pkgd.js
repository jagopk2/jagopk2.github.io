/*!
 * Packery layout mode PACKAGED v2.0.0
 * sub-classes Packery
 */
(function(n,t){typeof define=="function"&&define.amd?define("packery/js/rect",t):typeof module=="object"&&module.exports?module.exports=t():(n.Packery=n.Packery||{},n.Packery.Rect=t())})(window,function(){function n(t){for(var i in n.defaults)this[i]=n.defaults[i];for(i in t)this[i]=t[i]}n.defaults={x:0,y:0,width:0,height:0};var t=n.prototype;return t.contains=function(n){var t=n.width||0,i=n.height||0;return this.x<=n.x&&this.y<=n.y&&this.x+this.width>=n.x+t&&this.y+this.height>=n.y+i},t.overlaps=function(n){var t=this.x+this.width,i=this.y+this.height,r=n.x+n.width,u=n.y+n.height;return this.x<r&&t>n.x&&this.y<u&&i>n.y},t.getMaximalFreeRects=function(t){if(!this.overlaps(t))return!1;var r=[],i,e=this.x+this.width,o=this.y+this.height,u=t.x+t.width,f=t.y+t.height;return this.y<t.y&&(i=new n({x:this.x,y:this.y,width:this.width,height:t.y-this.y}),r.push(i)),e>u&&(i=new n({x:u,y:this.y,width:e-u,height:this.height}),r.push(i)),o>f&&(i=new n({x:this.x,y:f,width:this.width,height:o-f}),r.push(i)),this.x<t.x&&(i=new n({x:this.x,y:this.y,width:t.x-this.x,height:this.height}),r.push(i)),r},t.canFit=function(n){return this.width>=n.width&&this.height>=n.height},n}),function(n,t){if(typeof define=="function"&&define.amd)define("packery/js/packer",["./rect"],t);else if(typeof module=="object"&&module.exports)module.exports=t(require("./rect"));else{var i=n.Packery=n.Packery||{};i.Packer=t(i.Rect)}}(window,function(n){function i(n,t,i){this.width=n||0;this.height=t||0;this.sortDirection=i||"downwardLeftToRight";this.reset()}var t=i.prototype,r;return t.reset=function(){this.spaces=[];var t=new n({x:0,y:0,width:this.width,height:this.height});this.spaces.push(t);this.sorter=r[this.sortDirection]||r.downwardLeftToRight},t.pack=function(n){for(var i,t=0;t<this.spaces.length;t++)if(i=this.spaces[t],i.canFit(n)){this.placeInSpace(n,i);break}},t.columnPack=function(n){for(var t,r,i=0;i<this.spaces.length;i++)if(t=this.spaces[i],r=t.x<=n.x&&t.x+t.width>=n.x+n.width&&t.height>=n.height-.01,r){n.y=t.y;this.placed(n);break}},t.rowPack=function(n){for(var t,r,i=0;i<this.spaces.length;i++)if(t=this.spaces[i],r=t.y<=n.y&&t.y+t.height>=n.y+n.height&&t.width>=n.width-.01,r){n.x=t.x;this.placed(n);break}},t.placeInSpace=function(n,t){n.x=t.x;n.y=t.y;this.placed(n)},t.placed=function(n){for(var r,u,t=[],i=0;i<this.spaces.length;i++)r=this.spaces[i],u=r.getMaximalFreeRects(n),u?t.push.apply(t,u):t.push(r);this.spaces=t;this.mergeSortSpaces()},t.mergeSortSpaces=function(){i.mergeRects(this.spaces);this.spaces.sort(this.sorter)},t.addSpace=function(n){this.spaces.push(n);this.mergeSortSpaces()},i.mergeRects=function(n){var t=0,i=n[t],r,u;n:while(i){for(r=0,u=n[t+r];u;){if(u==i)r++;else if(u.contains(i)){n.splice(t,1);i=n[t];continue n}else i.contains(u)?n.splice(t+r,1):r++;u=n[t+r]}t++;i=n[t]}return n},r={downwardLeftToRight:function(n,t){return n.y-t.y||n.x-t.x},rightwardTopToBottom:function(n,t){return n.x-t.x||n.y-t.y}},i}),function(n,t){typeof define=="function"&&define.amd?define("packery/js/item",["outlayer/outlayer","./rect"],t):typeof module=="object"&&module.exports?module.exports=t(require("outlayer"),require("./rect")):n.Packery.Item=t(n.Outlayer,n.Packery.Rect)}(window,function(n,t){var e=document.documentElement.style,r=typeof e.transform=="string"?"transform":"WebkitTransform",u=function(){n.Item.apply(this,arguments)},i=u.prototype=Object.create(n.Item.prototype),o=i._create,f;return i._create=function(){o.call(this);this.rect=new t},f=i.moveTo,i.moveTo=function(n,t){var i=Math.abs(this.position.x-n),r=Math.abs(this.position.y-t),u=this.layout.dragItemCount&&!this.isPlacing&&!this.isTransitioning&&i<1&&r<1;if(u){this.goTo(n,t);return}f.apply(this,arguments)},i.enablePlacing=function(){this.removeTransitionStyles();this.isTransitioning&&r&&(this.element.style[r]="none");this.isTransitioning=!1;this.getSize();this.layout._setRectSize(this.element,this.rect);this.isPlacing=!0},i.disablePlacing=function(){this.isPlacing=!1},i.removeElem=function(){this.element.parentNode.removeChild(this.element);this.layout.packer.addSpace(this.rect);this.emitEvent("remove",[this])},i.showDropPlaceholder=function(){var n=this.dropPlaceholder;n||(n=this.dropPlaceholder=document.createElement("div"),n.className="packery-drop-placeholder",n.style.position="absolute");n.style.width=this.size.width+"px";n.style.height=this.size.height+"px";this.positionDropPlaceholder();this.layout.element.appendChild(n)},i.positionDropPlaceholder=function(){this.dropPlaceholder.style[r]="translate("+this.rect.x+"px, "+this.rect.y+"px)"},i.hideDropPlaceholder=function(){this.layout.element.removeChild(this.dropPlaceholder)},u});
/*!
 * Packery v2.0.0
 * Gapless, draggable grid layouts
 *
 * Licensed GPLv3 for open source use
 * or Packery Commercial License for commercial use
 *
 * http://packery.metafizzy.co
 * Copyright 2016 Metafizzy
 */
(function(n,t){typeof define=="function"&&define.amd?define("packery/js/packery",["get-size/get-size","outlayer/outlayer","./rect","./packer","./item"],t):typeof module=="object"&&module.exports?module.exports=t(require("get-size"),require("outlayer"),require("./rect"),require("./packer"),require("./item")):n.Packery=t(n.getSize,n.Outlayer,n.Packery.Rect,n.Packery.Packer,n.Packery.Item)})(window,function(n,t,i,r,u){function h(n,t){return n.position.y-t.position.y||n.position.x-t.position.x}function c(n,t){return n.position.x-t.position.x||n.position.y-t.position.y}function l(n,t){var i=t.x-n.x,r=t.y-n.y;return Math.sqrt(i*i+r*r)}var e,f,o,s;return i.prototype.canFit=function(n){return this.width>=n.width-1&&this.height>=n.height-1},e=t.create("packery"),e.Item=u,f=e.prototype,f._create=function(){t.prototype._create.call(this);this.packer=new r;this.shiftPacker=new r;this.isEnabled=!0;this.dragItemCount=0;var n=this;this.handleDraggabilly={dragStart:function(){n.itemDragStart(this.element)},dragMove:function(){n.itemDragMove(this.element,this.position.x,this.position.y)},dragEnd:function(){n.itemDragEnd(this.element)}};this.handleUIDraggable={start:function(t,i){i&&n.itemDragStart(t.currentTarget)},drag:function(t,i){i&&n.itemDragMove(t.currentTarget,i.position.left,i.position.top)},stop:function(t,i){i&&n.itemDragEnd(t.currentTarget)}}},f._resetLayout=function(){this.getSize();this._getMeasurements();var n,t,i;this._getOption("horizontal")?(n=Infinity,t=this.size.innerHeight+this.gutter,i="rightwardTopToBottom"):(n=this.size.innerWidth+this.gutter,t=Infinity,i="downwardLeftToRight");this.packer.width=this.shiftPacker.width=n;this.packer.height=this.shiftPacker.height=t;this.packer.sortDirection=this.shiftPacker.sortDirection=i;this.packer.reset();this.maxY=0;this.maxX=0},f._getMeasurements=function(){this._getMeasurement("columnWidth","width");this._getMeasurement("rowHeight","height");this._getMeasurement("gutter","width")},f._getItemLayoutPosition=function(n){if(this._setRectSize(n.element,n.rect),this.isShifting||this.dragItemCount>0){var t=this._getPackMethod();this.packer[t](n.rect)}else this.packer.pack(n.rect);return this._setMaxXY(n.rect),n.rect},f.shiftLayout=function(){this.isShifting=!0;this.layout();delete this.isShifting},f._getPackMethod=function(){return this._getOption("horizontal")?"rowPack":"columnPack"},f._setMaxXY=function(n){this.maxX=Math.max(n.x+n.width,this.maxX);this.maxY=Math.max(n.y+n.height,this.maxY)},f._setRectSize=function(t,i){var f=n(t),r=f.outerWidth,u=f.outerHeight;(r||u)&&(r=this._applyGridGutter(r,this.columnWidth),u=this._applyGridGutter(u,this.rowHeight));i.width=Math.min(r,this.packer.width);i.height=Math.min(u,this.packer.height)},f._applyGridGutter=function(n,t){if(!t)return n+this.gutter;t+=this.gutter;var i=n%t,r=i&&i<1?"round":"ceil";return Math[r](n/t)*t},f._getContainerSize=function(){return this._getOption("horizontal")?{width:this.maxX-this.gutter}:{height:this.maxY-this.gutter}},f._manageStamp=function(n){var u=this.getItem(n),t,r;u&&u.isPlacing?t=u.rect:(r=this._getElementOffset(n),t=new i({x:this._getOption("originLeft")?r.left:r.right,y:this._getOption("originTop")?r.top:r.bottom}));this._setRectSize(n,t);this.packer.placed(t);this._setMaxXY(t)},f.sortItemsByPosition=function(){var n=this._getOption("horizontal")?c:h;this.items.sort(n)},f.fit=function(n,t,i){var r=this.getItem(n);r&&(this.stamp(r.element),r.enablePlacing(),this.updateShiftTargets(r),t=t===undefined?r.rect.x:t,i=i===undefined?r.rect.y:i,this.shift(r,t,i),this._bindFitEvents(r),r.moveTo(r.rect.x,r.rect.y),this.shiftLayout(),this.unstamp(r.element),this.sortItemsByPosition(),r.disablePlacing())},f._bindFitEvents=function(n){function i(){(t++,t==2)&&r.dispatchEvent("fitComplete",null,[n])}var r=this,t=0;n.once("layout",i);this.once("layoutComplete",i)},f.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&(this.options.shiftPercentResize?this.resizeShiftPercentLayout():this.layout())},f.needsResizeLayout=function(){var i=n(this.element),t=this._getOption("horizontal")?"innerHeight":"innerWidth";return i[t]!=this.size[t]},f.resizeShiftPercentLayout=function(){var u=this._getItemsForLayout(this.items),i=this._getOption("horizontal"),r=i?"y":"x",h=i?"height":"width",f=i?"rowHeight":"columnWidth",c=i?"innerHeight":"innerWidth",t=this[f],e,o,s;t=t&&t+this.gutter;t?(this._getMeasurements(),e=this[f]+this.gutter,u.forEach(function(n){var i=Math.round(n.rect[r]/t);n.rect[r]=i*e})):(o=n(this.element)[c]+this.gutter,s=this.packer[h],u.forEach(function(n){n.rect[r]=n.rect[r]/s*o}));this.shiftLayout()},f.itemDragStart=function(n){if(this.isEnabled){this.stamp(n);var t=this.getItem(n);t&&(t.enablePlacing(),t.showDropPlaceholder(),this.dragItemCount++,this.updateShiftTargets(t))}},f.updateShiftTargets=function(n){var s,h,r,t,c,o,e,l,a;this.shiftPacker.reset();this._getBoundingRect();s=this._getOption("originLeft");h=this._getOption("originTop");this.stamps.forEach(function(n){var u=this.getItem(n),t,r;u&&u.isPlacing||(t=this._getElementOffset(n),r=new i({x:s?t.left:t.right,y:h?t.top:t.bottom}),this._setRectSize(n,r),this.shiftPacker.placed(r))},this);var u=this._getOption("horizontal"),v=u?"rowHeight":"columnWidth",f=u?"height":"width";if(this.shiftTargetKeys=[],this.shiftTargets=[],t=this[v],t=t&&t+this.gutter,t)for(c=Math.ceil(n.rect[f]/t),o=Math.floor((this.shiftPacker[f]+this.gutter)/t),r=(o-c)*t,e=0;e<o;e++)this._addShiftTarget(e*t,0,r);else r=this.shiftPacker[f]+this.gutter-n.rect[f],this._addShiftTarget(0,0,r);l=this._getItemsForLayout(this.items);a=this._getPackMethod();l.forEach(function(n){var i=n.rect,o,s,h,e,c,l;if(this._setRectSize(n.element,i),this.shiftPacker[a](i),this._addShiftTarget(i.x,i.y,r),o=u?i.x+i.width:i.x,s=u?i.y:i.y+i.height,this._addShiftTarget(o,s,r),t)for(h=Math.round(i[f]/t),e=1;e<h;e++)c=u?o:i.x+t*e,l=u?i.y+t*e:s,this._addShiftTarget(c,l,r)},this)},f._addShiftTarget=function(n,t,i){var u=this._getOption("horizontal")?t:n,r,f;u!==0&&u>i||(r=n+","+t,f=this.shiftTargetKeys.indexOf(r)!=-1,f)||(this.shiftTargetKeys.push(r),this.shiftTargets.push({x:n,y:t}))},f.shift=function(n,t,i){var r,u=Infinity,f={x:t,y:i};this.shiftTargets.forEach(function(n){var t=l(n,f);t<u&&(r=n,u=t)});n.rect.x=r.x;n.rect.y=r.y},o=120,f.itemDragMove=function(n,t,i){function e(){u.shift(r,t,i);r.positionDropPlaceholder();u.layout()}var r=this.isEnabled&&this.getItem(n),u,f;r&&(t-=this.size.paddingLeft,i-=this.size.paddingTop,u=this,f=new Date,this._itemDragTime&&f-this._itemDragTime<o?(clearTimeout(this.dragTimeout),this.dragTimeout=setTimeout(e,o)):(e(),this._itemDragTime=f))},f.itemDragEnd=function(n){function u(){(i++,i==2)&&(t.element.classList.remove("is-positioning-post-drag"),t.hideDropPlaceholder(),r.dispatchEvent("dragItemPositioned",null,[t]))}var t=this.isEnabled&&this.getItem(n),i,r;if(t){clearTimeout(this.dragTimeout);t.element.classList.add("is-positioning-post-drag");i=0;r=this;t.once("layout",u);this.once("layoutComplete",u);t.moveTo(t.rect.x,t.rect.y);this.layout();this.dragItemCount=Math.max(0,this.dragItemCount-1);this.sortItemsByPosition();t.disablePlacing();this.unstamp(t.element)}},f.bindDraggabillyEvents=function(n){this._bindDraggabillyEvents(n,"on")},f.unbindDraggabillyEvents=function(n){this._bindDraggabillyEvents(n,"off")},f._bindDraggabillyEvents=function(n,t){var i=this.handleDraggabilly;n[t]("dragStart",i.dragStart);n[t]("dragMove",i.dragMove);n[t]("dragEnd",i.dragEnd)},f.bindUIDraggableEvents=function(n){this._bindUIDraggableEvents(n,"on")},f.unbindUIDraggableEvents=function(n){this._bindUIDraggableEvents(n,"off")},f._bindUIDraggableEvents=function(n,t){var i=this.handleUIDraggable;n[t]("dragstart",i.start)[t]("drag",i.drag)[t]("dragstop",i.stop)},s=f.destroy,f.destroy=function(){s.apply(this,arguments);this.isEnabled=!1},e.Rect=i,e.Packer=r,e});
/*!
 * Packery layout mode v2.0.0
 * sub-classes Packery
 */
(function(n,t){typeof define=="function"&&define.amd?define(["isotope/js/layout-mode","packery/js/packery"],t):typeof module=="object"&&module.exports?module.exports=t(require("isotope-layout/js/layout-mode"),require("packery")):t(n.Isotope.LayoutMode,n.Packery)})(window,function(n,t){var u=n.create("packery"),i=u.prototype,h={_getElementOffset:!0,_getMeasurement:!0},r,f,e,o,s;for(r in t.prototype)h[r]||(i[r]=t.prototype[r]);return f=i._resetLayout,i._resetLayout=function(){this.packer=this.packer||new t.Packer;this.shiftPacker=this.shiftPacker||new t.Packer;f.apply(this,arguments)},e=i._getItemLayoutPosition,i._getItemLayoutPosition=function(n){return n.rect=n.rect||new t.Rect,e.call(this,n)},o=i.needsResizeLayout,i.needsResizeLayout=function(){return this._getOption("horizontal")?this.needsVerticalResizeLayout():o.call(this)},s=i._getOption,i._getOption=function(n){return n=="horizontal"?this.options.isHorizontal!==undefined?this.options.isHorizontal:this.options.horizontal:s.apply(this.isotope,arguments)},u})