(function(window){
/**
 * @param {HTMLelement} element main element
 * @param {object} options settings
 */
function Spinteger(element, options){

    /**
     * SETTINGS START
     */

    // DEFAULTS
    var INTERVAL_TIME = 50,
    font_size = getComputedStyle(element).fontSize || 16,
    PIXEL_PER_INT = 1,
    SEPARATOR = '',
    SEPARATOR_PADDING = 3,
    BEFORE = '',
    AFTER = '',
    FONT_SIZE,
    TO_FIXED = 0;
    this.interval_in_array = [];

    // Sets options
    if(options){
        if(options.tofixed){
            if(typeof options.tofixed == 'number'){
                if(options.tofixed > 0 && options.tofixed < 5){
                    TO_FIXED = options.tofixed;
                }else{
                    throw new Error('length of tofixed should be from 0 to 5');
                }
            }else{
                throw new Error('tofixed should be a number');
            }
        }
        if(options.before){
            if(typeof options.before == 'string'){
                if(options.before.length > 0 && options.before.length < 5){
                    BEFORE = options.before;
                }else{
                    throw new Error('length of before should be from 0 to 5');
                }
            }else{
                throw new Error('before should be a string');
            }
        }
        if(options.after){
            if(typeof options.after == 'string'){
                if(options.after.length > 0 && options.after.length < 5){
                    AFTER = options.after;
                }else{
                    throw new Error('length of after should be from 0 to 5');
                }
            }else{
                throw new Error('after should be a string');
            }
        }
        if(options.separator){
            if(typeof options.separator == 'string'){
                if(options.separator.length < 3 && options.separator.length > 0){
                    if(options.separator === '#'){
                        SEPARATOR = ' ';
                        SEPARATOR_PADDING = 6;
                    }else{
                        SEPARATOR = options.separator;
                    }
                }else{
                    throw new Error('length of separator should be 1 or 2');
                }
            }else{
                throw new Error('separator should be a string');
            }
        }
        if(options.step){
            if(typeof options.step == 'number' && parseInt(options.step)){
                if(options.step > 0 && options.step < 6){
                    PIXEL_PER_INT = parseInt(options.step);
                }else{
                    throw new Error('step should be from 1 to 5');
                }
            }else{
                throw new Error('fontSize should be a number');}
        }
        if(options.fontSize){
            if(typeof options.fontSize == 'number' && parseInt(options.fontSize)){
            
                if(options.fontSize > 5 && options.fontSize < 101){
                    font_size = parseInt(options.fontSize);
                    element.style.fontSize = parseInt(options.fontSize) + 'px';
                }else{
                    throw new Error('fontSize should be from 6 to 100');
                }
            }else{
                throw new Error('fontSize should be a number');
            }
        }
        if(options.speed){
            if(typeof options.speed == 'number' && parseInt(options.speed)){
                if(options.speed >= 50 && options.speed <= 2000){
                    INTERVAL_TIME = parseInt(options.speed);
                }else{
                    throw new Error('speed should be a from 50 to 2000');
                }
            }else{
                throw new Error('speed should be a number');
            }
        }
    }
    font_size = parseInt(font_size);

    // Font Size must be defined and more than 6, otherwise sets Font Size = 16
    if(font_size && font_size > 6){
        if(font_size % 2 == 0){
            FONT_SIZE = font_size;
        }else{
            FONT_SIZE = font_size + 1;
            element.style.fontSize = font_size + 1 + 'px';
        }
    }else{
        element.style.fontSize = 16 + 'px';
        FONT_SIZE = 16;
    }

    // FONT SIZE should be divisible by STEP, otherwise sets STEP equals 1
    if(FONT_SIZE % PIXEL_PER_INT !== 0){
        PIXEL_PER_INT = 1;
        throw new Error('Font size should be divisible by step')
    }

    /**
    * SETTINGS END
    */

    // Element should be defined, element's content should be a number and has less than 20 symbols
    if(!element){
        throw new Error('Element is not defined');
    }
    if(!element.innerText){
        throw new Error('Element\'s content is not defined');
    }
    var el = +element.innerText;
    if(typeof el !== 'number' || isNaN(el)){
        throw new Error('Element\'s content is not a number');
    }
    var el_arr = String.prototype.split.call(el, '');
    if(el_arr.length > 20){
        throw new Error('Element\'s content is more than 20 symbols');
    }

    // Sets link to the current OBJECT (For using properties of current object inside the Function)
    var that = this;
    
    /**
     * Creates method .val() for current ELEMENT
     * @param {number} newValue The number to set for the current ELEMENT
     * @return {void}
     */
    this.val = function(newValue){

        // Stops if there are any Animations in proccess
        if(that.interval_in_array.length){
            return;
        }

        // If TO_FIXED is defined, adds extra numbers to the New Value
        if(TO_FIXED){
            if(newValue && !isNaN(newValue) && (+newValue).toFixed(TO_FIXED)){
                newValue = (+newValue).toFixed(TO_FIXED);
                newValue = newValue.replace('.', '');
            }else{
                newValue = parseInt(newValue);
            }
        }else{
            newValue = parseInt(newValue);
        }
        
        changeValue(newValue);
    }

    /**
     * 
     * @param {number} newValue The number to set for the current ELEMENT
     */
    function changeValue(newValue){

        // Remove Before and After span elements
        removeBeforeAndAfter(element);

        if(!newValue){
            throw new Error('New Value is not defined');
        }

        // Checks lenght of current and new numbers and adds/removes span ELEMENTS
        checkSize(newValue, Array.prototype.slice.call(element.children, ''), element);
        
        try{
            // Makes element children an array to work with it
            var elArray = Array.prototype.slice.call(element.children, '');

            // Filters an array and leaves there only numbers
            elArray = elArray.filter(function(val){
                if(!val.classList.contains('spinteger-value-sep')){
                    return val;
                }
            });


            if(Array.isArray(elArray) || elArray.length >= 0 || elArray.length < 20){
                // Makes an Array with newValue numbers
                var newValueArray = String.prototype.split.call(newValue, '');

                var separatorCount = 0;

                // Counts the count of separators in new number
                if(SEPARATOR){
                    separatorCount = Math.ceil(newValueArray.length/3) - 1;
                }

                var j=0;

                // Creates the loop of filling the spans, starting from right to left
                for(var i=newValueArray.length-1;i>=0;i--){

                    // Current NEW NUMBER
                    var num = +newValueArray[i] + 1; // + 1 because of empty span
                    // Current OLD NUMBER
                    var oldnum = +elArray[elArray.length - (1+j)].scrollTop / FONT_SIZE;
    
                    // if current new number does not equal old number ...
                    if(num !== 0 || (num - oldnum) !== 0){
                        // .. and less than it
                        if(num < oldnum){
                            var diftime = INTERVAL_TIME / ((oldnum - num ) * FONT_SIZE / 2);
    
                            // .. scrolls it down
                            intervalDown(elArray[elArray.length - (1+j)], false, num * FONT_SIZE, diftime , function(stop){
                                that.interval_in_array.splice(0, 1);
                                clearInterval(stop);
                            });
                        }
                        // .. and more than it
                        if(num > oldnum){
                            var diftime = INTERVAL_TIME / ((num - oldnum ) * FONT_SIZE / 2);
    
                            // .. scrolls it up
                            intervalUp(elArray[elArray.length - (1+j)], num * FONT_SIZE, diftime , function(stop){
                                that.interval_in_array.splice(0, 1);
                                clearInterval(stop);
                            });
                        }
                    }
                    j++;
                }
                // if AFTER is defined, creates AFTER SPAN ELEMENT
                if(AFTER){
                    addAfter(element);
                }
                // if BEFORE is defined, creates BEFORE SPAN ELEMENT
                if(BEFORE){
                    addBefore(element);
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }

    /**
     * Removes all span elements with class spintiger-value-before and spinteger-value-after
     * @param {HTMLelement} element 
     */
    function removeBeforeAndAfter(element){
        for(var i=0;i<element.children.length;i++){
            if(element.children[i].classList.contains('spinteger-value-before')){
                element.removeChild(element.children[i]);
            }
            if(element.children[i].classList.contains('spinteger-value-after')){
                element.removeChild(element.children[i]);
            }
        }
    }
    /**
     * Creates new span elements with class spinteger-value-before
     * @param {HTMLelement} element
     */
    function addBefore(element){
        
        if(element && element.children.length){
            let span = document.createElement('span');
            span.classList.add('spinteger-value-over');
            span.classList.add('spinteger-value-before');
            let spanSep = document.createElement('span');
            spanSep.innerText = BEFORE;
            spanSep.style.height = FONT_SIZE + 'px';
            span = addFlexInlineClass(span);
            span.appendChild(spanSep);
            span.style.height = FONT_SIZE + 'px';
            span.style.paddingRight =  '3px';
            element.insertBefore(span, element.children[0]);
        }
    }

    /**
     * Creates new span elements with class spinteger-value-after
     * @param {HTMLelement} element
     */
    function addAfter(element){
        if(element && element.children.length){
            let span = document.createElement('span');
            span.classList.add('spinteger-value-over');
            span.classList.add('spinteger-value-after');
            let spanSep = document.createElement('span');
            spanSep.innerText = AFTER;
            spanSep.style.height = FONT_SIZE + 'px';
            span = addFlexInlineClass(span);
            span.appendChild(spanSep);
            span.style.height = FONT_SIZE + 'px';
            span.style.paddingLeft =  '3px';
            element.appendChild(span);
        }
    }

    /**
     * Checks sizes of current numbers and new numbers (Children of current ELEMENT; SPANs)
     * @param {number} newValue The number to set for the current ELEMENT
     * @param {*} elArray Array of curreny element's number
     * @param {*} element Current element
     */
    function checkSize(newValue, elArray, element){
        var newValueArray = String.prototype.split.call(newValue, '');

        elArray = elArray.filter(function(val){
            if(!val.classList.contains('spinteger-value-sep')){
                return val;
            }
        });

        // If sizes does not equal..
        if(elArray.length !== newValueArray.length){
            // ..and old number is bigger than the new one, removes elements
            if(elArray.length > newValueArray.length){
                var splicedElements = elArray.splice(0, elArray.length - newValueArray.length);
                for(let i=0;i<splicedElements.length;i++){
                    splicedElements[i].parentNode.removeChild(splicedElements[i]);
                }
            }
            // ..and old number is smaller than the new one, creates elements
            if(elArray.length < newValueArray.length){
                var count = newValueArray.length - elArray.length;
                for(let i=0;i<count;i++){
                    let span = document.createElement('span');
                    span.className = 'spinteger-value-over';
                    span.style.width = 0;
                    for(var j=0;j<10;j++){
                        var spanIn = document.createElement('span');
                        spanIn.innerText = j;
                        spanIn.style.height = FONT_SIZE + 'px';
                        span.appendChild(spanIn);
                    }
                    let extraSpan = document.createElement('span');
                    extraSpan.innerText = '0';
                    extraSpan.style.opacity = '0';
                    extraSpan.style.height = FONT_SIZE + 'px';
                    span = addFlexInlineClass(span);
                    span.insertBefore(extraSpan, span.firstChild);
                    span.scrollTop = 0;
                    span.style.height = FONT_SIZE + 'px';
                    element.insertBefore(span, element.firstChild);

                    sliceLeft(span, function(stop){
                        clearInterval(stop);
                    })
                }
            }
            // Creates separators for the new number
            createSeparator(element);
        }
    }

    /**
     * Removes separators
     * @param {HTMLelement} el
     */
    function removeSeparator(el){
        el = Array.prototype.slice.call(el.children, '');
        for(var i=el.length-1;i>=0;i--){
            if(SEPARATOR){
                if(el[i].classList.contains('spinteger-value-sep')){
                    el[i].parentNode.removeChild(el[i]);
                }
            }
        }
    }

    /**
     * Creates separators
     * @param {HTMLelement} el
     */
    function createSeparator(el){
        removeSeparator(el);

        el = Array.prototype.slice.call(el.children, '');
        let j = 0;
        if(TO_FIXED){
            j-=TO_FIXED;
            let span = document.createElement('span');
            span.classList.add('spinteger-value-over');
            span.classList.add('spinteger-value-sep');
            let spanSep = document.createElement('span');
            spanSep.innerText = '.';
            spanSep.style.height = FONT_SIZE + 'px';
            span = addFlexInlineClass(span);
            span.appendChild(spanSep);
            span.style.height = FONT_SIZE + 'px';
            span.style.paddingRight = '2px';
            element.insertBefore(span, element.children[el.length - TO_FIXED]);
        }
        for(var i=el.length-1;i>=0;i--){
            if(j%3 == 0 && j>0 && j!==el.length+1 && SEPARATOR){
                let span = document.createElement('span');
                span.classList.add('spinteger-value-over');
                span.classList.add('spinteger-value-sep');
                let spanSep = document.createElement('span');
                spanSep.innerText = SEPARATOR;
                spanSep.style.height = FONT_SIZE+2 + 'px';
                span = addFlexInlineClass(span);
                span.appendChild(spanSep);
                span.style.height = FONT_SIZE+2 + 'px';
                span.style.paddingRight = SEPARATOR_PADDING + 'px';
                element.insertBefore(span, element.children[i+1]);
            }
            j++;
        }
    }

    /**
     * Makes animation of creating elements
     * @param {HTMLelement} el 
     * @param {function} callback 
     */
    function sliceLeft(el, callback){
        var wo = 0;
        let int = window.setInterval(function(){
            if(wo == 17){
                callback(int, el);
            }else{
                el.style.opacity = (wo * 0.0625);
                el.style.width = 'auto';
                el.style.height = FONT_SIZE + 'px';
                wo++;
            }
        }, 5)
    }

    /**
     * Makes scrolling animation (UP)
     * @param {HTMKelement} el 
     * @param {number} stop_point ScrollTop number when the animation should stops
     * @param {number} int_time Interval time
     * @param {function} callback Callback function
     */
    function intervalUp(el, stop_point, int_time, callback){
        int_time = Math.ceil(int_time);
        let int = window.setInterval(function(){
            if(stop_point == el.scrollTop){
                callback(int);
            }else{
                el.scrollTop += PIXEL_PER_INT;
            }
        }, int_time);
        that.interval_in_array.push({interval: int});
    }

    /**
     * Makes scrolling animation (DOWN)
     * @param {HTMKelement} el 
     * @param {number} stop_point ScrollTop number when the animation should stops
     * @param {number} int_time Interval time
     * @param {function} callback Callback function
     */
    function intervalDown(el, hide, stop_point, int_time, callback){
        int_time = Math.ceil(int_time);
        let int = window.setInterval(function(){
            if(stop_point == el.scrollTop){
                callback(int);
            }else{
                el.scrollTop -= PIXEL_PER_INT;
            }
        }, int_time);
        that.interval_in_array.push({interval: int});
    }

    /**
     * Creates style 'inline-flex' and flexDirection = 'column' for all spans
     * @param {HTMLelement} element 
     */
    function addFlexInlineClass(element){
        element.style.display = 'inline-flex';
        element.style.flexDirection = 'column';
        element.style.overflow = 'hidden';
        return element;
    }

    // Calls val function to render innerText from element
    element.innerText = '';
    this.val(el);
}

function isElement(o){
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : // DOM 2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
}

/**
 * Main function, that allows you to create animation
 * @param {HTMLelement} element main element
 * @param {object} options settings
 */
function spinteger(element, options){
    if(element && isElement(element)){
        if(options && typeof options !== 'object'){
            throw new Error('Options should be an object');
        }else{
            if(element.tagName.toLowerCase() === 'span'){
                return new Spinteger(element, options);
            }else{
                throw new Error('Element tagName should be SPAN')
            }  
        }
    }else{
        throw new Error('Element is not defined');
    }
}

if (typeof exports !== "undefined") {
    module.exports = spinteger;
}
else {
    window.spinteger = spinteger

    if (typeof define === "function" && define.amd) {
        define(function() {
            return {
                spinteger: spinteger
            }
        })
    }
}
})(typeof window === 'undefined' ? this : window);