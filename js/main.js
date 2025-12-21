$(document).ready(function() {
    // Typing Animation - 10초마다 반복
    const text = "CG 없이,\n더 현실적인 촬영을";
    const lines = text.split('\n');
    let lineIndex = 0;
    let charIndex = 0;
    let isTyping = false;
    
    function type() {
        if (!isTyping) return;
        
        if (lineIndex < lines.length) {
            if (charIndex < lines[lineIndex].length) {
                $('#typing').append(lines[lineIndex].charAt(charIndex));
                charIndex++;
                setTimeout(type, 100);
            } else {
                if (lineIndex < lines.length - 1) {
                    $('#typing').append('<br>');
                }
                lineIndex++;
                charIndex = 0;
                setTimeout(type, 300);
            }
        } else {
            // 타이핑 완료 후 10초 대기
            isTyping = false;
            setTimeout(restartTyping, 5000);
        }
    }
    
    function restartTyping() {
        // 텍스트 초기화
        $('#typing').empty();
        lineIndex = 0;
        charIndex = 0;
        isTyping = true;
        type();
    }
    
    // 최초 시작
    setTimeout(function() {
        isTyping = true;
        type();
    }, 500);

    // Smooth scroll
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if(target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Active navigation on scroll
    function updateActiveNav() {
        var scrollPos = $(window).scrollTop() + 150;
        var found = false;
        
        $('section[id]').each(function() {
            var sectionTop = $(this).offset().top - 100;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var sectionId = $(this).attr('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                if (!found) {
                    $('.nav-link').removeClass('active');
                    $('.nav-link[href="#' + sectionId + '"]').addClass('active');
                    found = true;
                }
            }
        });
        
        if ($(window).scrollTop() < 100) {
            $('.nav-link').removeClass('active');
            $('.nav-link[href="#home"]').addClass('active');
        }
        
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            $('.nav-link').removeClass('active');
            $('.nav-link[href="#contact"]').addClass('active');
        }
    }

    // Scroll animation - COMPLETELY REWRITTEN & FIXED
    var isAnimating = false;
    var animatedCards = {
        problem: new Set(),
        solution: new Set(),
        benefit: new Set()
    };
    
    function animateOnScroll() {
        // 이미 애니메이션 중이면 스킵
        if (isAnimating) return;
        isAnimating = true;
        
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        var triggerPoint = viewportBottom - 150;
        
        // Problem cards - 한 번만 실행
        $('.problem-card').each(function(index) {
            var cardId = 'p-' + index;
            
            // 이미 애니메이션된 카드는 완전히 스킵
            if (animatedCards.problem.has(cardId)) return;
            
            var $card = $(this);
            var elementTop = $card.offset().top;
            
            // viewport 안에 들어오면 애니메이션
            if (elementTop < triggerPoint) {
                animatedCards.problem.add(cardId);
                
                // 딜레이 후 애니메이션
                setTimeout(function() {
                    if (!$card.hasClass('animated')) {
                        $card.addClass('animated');
                    }
                }, index * 100);
            }
        });

        // Solution cards
        $('.solution-card').each(function(index) {
            var cardId = 's-' + index;
            
            if (animatedCards.solution.has(cardId)) return;
            
            var $card = $(this);
            var elementTop = $card.offset().top;
            
            if (elementTop < triggerPoint) {
                animatedCards.solution.add(cardId);
                
                setTimeout(function() {
                    if (!$card.hasClass('animated')) {
                        $card.addClass('animated');
                    }
                }, index * 200);
            }
        });

        // Benefit cards
        $('.benefit-card').each(function(index) {
            var cardId = 'b-' + index;
            
            if (animatedCards.benefit.has(cardId)) return;
            
            var $card = $(this);
            var elementTop = $card.offset().top;
            
            if (elementTop < triggerPoint) {
                animatedCards.benefit.add(cardId);
                
                setTimeout(function() {
                    if (!$card.hasClass('animated')) {
                        $card.addClass('animated');
                    }
                }, index * 150);
            }
        });
        
        // 애니메이션 플래그 리셋
        setTimeout(function() {
            isAnimating = false;
        }, 100);
    }

    // Throttled scroll event - 통합
    var scrollTimeout;
    var lastScrollTime = 0;
    var isScrolling = false;
    
    function handleScroll() {
        var now = Date.now();
        
        // 너무 빠른 호출 방지
        if (now - lastScrollTime < 100) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleScroll, 100);
            return;
        }
        
        lastScrollTime = now;
        
        // 스크롤 이벤트 처리
        if (!isScrolling) {
            isScrolling = true;
            
            requestAnimationFrame(function() {
                updateActiveNav();
                animateOnScroll();
                isScrolling = false;
            });
        }
    }
    
    $(window).on('scroll', handleScroll);
    
    // Initial calls
    setTimeout(function() {
        updateActiveNav();
        animateOnScroll();
    }, 100);

    // Parallax effect for blobs - 최적화
    var lastParallaxTime = 0;
    
    function updateParallax() {
        var now = Date.now();
        if (now - lastParallaxTime < 50) return;
        
        lastParallaxTime = now;
        
        requestAnimationFrame(function() {
            var scrolled = $(window).scrollTop();
            var maxScroll = Math.max($(document).height() - $(window).height(), 1);
            var scrollRatio = Math.min(scrolled / maxScroll, 1);
            
            $('.blob-1').css('transform', 'translate(' + (scrolled * 0.3) + 'px, ' + (scrolled * -0.2) + 'px)');
            $('.blob-2').css('transform', 'translate(' + (scrolled * -0.2) + 'px, ' + (scrolled * 0.3) + 'px)');
            $('.blob-3').css('transform', 'translate(' + (scrolled * 0.15) + 'px, ' + (scrolled * 0.15) + 'px)');
        });
    }
    
    $(window).on('scroll', updateParallax);

    console.log('✅ Page initialized successfully');
    console.log('📊 Cards found:', {
        problem: $('.problem-card').length,
        solution: $('.solution-card').length,
        benefit: $('.benefit-card').length
    });
});
