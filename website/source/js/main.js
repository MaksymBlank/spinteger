(function(){
    $(document).ready(function(){        
        var navopen = false;
        $('.link-install').click(function(){
            $('body,html').animate({ scrollTop: $('.install').offset().top - 100 }, 1000);

            if(navopen){
                $('.nav-button').click();
            }
            return false;
        });
        $('.link-docs').click(function(){
            $('body,html').animate({ scrollTop: $('.docs').offset().top - 100 }, 1000);

            if(navopen){
                $('.nav-button').click();
            }
            return false;
        });

        $('.nav-button').click(function(){
            if(navopen){
                $('.fa-bars').css({
                    animation: 'rotate0 0.5s',
                    transform: 'rotate(0)'
                });
                $('.nav').animate({
                    right: '-330px',
                    opacity: 0
                }, 500);
            }else{
                $('.nav').animate({
                    right: 0,
                    opacity: 1
                }, 500);
                $('.fa-bars').css({
                    animation: 'rotate90 0.5s',
                    transform: 'rotate(90deg)'
                });
            }
           
            navopen = !navopen;
            return false;
        })
    })
        
    var templateNumber = spinteger(document.querySelector('#hero-number'), {
        separator: '#',
        tofixed: 2,
        before: '$',
        speed: 500,
        step: 4
    });
    
    window.setInterval(function(){
        templateNumber.val(Math.ceil(Math.random() * 99999));
    }, 3000);
    
    // Examples > Comparing > Normal Number
    var compNormNumberButton = document.querySelector('#examples-comparing-normal-button');
    var compNormNumberNext = 123456;
    compNormNumberButton.addEventListener('click', function(){
        document.querySelector('#examples-comparing-normal').innerText = compNormNumberNext;
        compNormNumberNext = Math.ceil(Math.random() * 9999999);
        document.querySelector('#examples-comparing-normal-prev').innerText = compNormNumberNext;
    });
    compNormNumberButton.click();

    // Examples > Comparing > Spinteger Number
    var compSpinNumberButton = document.querySelector('#examples-comparing-spinteger-button');
    var compSpinNumberNext = 123456;
    var compSpinNumber = spinteger(document.querySelector('#examples-comparing-spinteger'));
    compSpinNumberButton.addEventListener('click', function(){
        compSpinNumber.val(compSpinNumberNext);
        compSpinNumberNext = Math.ceil(Math.random() * 9999999);
        document.querySelector('#examples-comparing-spinteger-prev').innerText = compSpinNumberNext;
    });
    compSpinNumberButton.click();

    // Configuration > Element
    var confElemButton = document.querySelector('#conf-element-run');
    var confElemNumber = spinteger(document.querySelector('#conf-element-number'));
    confElemButton.addEventListener('click', function(){
        confElemNumber.val(Math.ceil(Math.random() * 9999999));
    });

    // Configuration > Font Size
    var confFontSizeButton = document.querySelector('#conf-fontsize-run');
    var confFontSizeNumber = spinteger(document.querySelector('#conf-fontsize-number'),{
        fontSize: 40
    });
    confFontSizeButton.addEventListener('click', function(){
        confFontSizeNumber.val(Math.ceil(Math.random() * 9999999));
    });

    // Configuration > Separator
    var confSeparatorButton = document.querySelector('#conf-separator-run');
    var confSeparatorNumber = spinteger(document.querySelector('#conf-separator-number'),{
        fontSize: 24,
        separator: '#'
    });
    confSeparatorButton.addEventListener('click', function(){
        confSeparatorNumber.val(Math.ceil(Math.random() * 9999999));
    });

    // Configuration > Tofixed
    var confToFixedButton = document.querySelector('#conf-tofixed-run');
    var confToFixedNumber = spinteger(document.querySelector('#conf-tofixed-number'),{
        fontSize: 24,
        separator: ',',
        tofixed: 2
    });
    confToFixedButton.addEventListener('click', function(){
        confToFixedNumber.val((Math.random() * 9999999));
    });

    // Configuration > Step
    var confStepButton = document.querySelector('#conf-step-run');
    var confStepNumber = spinteger(document.querySelector('#conf-step-number'),{
        fontSize: 30,
        separator: '#',
        tofixed: 2,
        step: 5
    });
    confStepButton.addEventListener('click', function(){
        confStepNumber.val((Math.random() * 9999999));
    });
    // Configuration > Speed
    var confSpeedButton = document.querySelector('#conf-speed-run');
    var confSpeedNumber = spinteger(document.querySelector('#conf-speed-number'),{
        fontSize: 30,
        separator: '#',
        tofixed: 2,
        speed: 500
    });
    confSpeedButton.addEventListener('click', function(){
        confSpeedNumber.val((Math.random() * 9999999));
    });
    // Configuration > Before
    var confBeforeButton = document.querySelector('#conf-before-run');
    var confBeforeNumber = spinteger(document.querySelector('#conf-before-number'),{
        fontSize: 30,
        separator: '#',
        tofixed: 2,
        step: 2,
        before: '$'
    });
    confBeforeButton.addEventListener('click', function(){
        confBeforeNumber.val((Math.random() * 9999999));
    });
    // Configuration > After
    var confAfterButton = document.querySelector('#conf-after-run');
    var confAfterNumber = spinteger(document.querySelector('#conf-after-number'),{
        fontSize: 30,
        separator: '#',
        tofixed: 2,
        step: 2,
        after: '$'
    });
    confAfterButton.addEventListener('click', function(){
        confAfterNumber.val((Math.random() * 9999999));
    });
})();