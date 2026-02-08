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
            // 타이핑 완료 후 5초 대기
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
        // learn-more 링크는 별도 처리
        if ($(this).hasClass('learn-more')) {
            return;
        }
        
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if(target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Learn more button alert
    $('.learn-more').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        alert('준비중 입니다.');
    });

    // Active navigation on scroll
    function updateActiveNav() {
        var scrollPos = $(window).scrollTop() + 150;
        var sections = $('section[id]');
        
        // 가장 가까운 섹션 찾기
        var currentSection = null;
        sections.each(function() {
            var sectionTop = $(this).offset().top - 100;
            if (scrollPos >= sectionTop) {
                currentSection = $(this).attr('id');
            }
        });
        
        // 네비게이션 업데이트
        if (currentSection) {
            $('.nav-link').removeClass('active');
            $('.nav-link[href="#' + currentSection + '"]').addClass('active');
        }
    }

    // Scroll animation - 최적화 버전
    var animatedCards = {
        problem: new Set(),
        solution: new Set(),
        benefit: new Set()
    };
    
    function animateOnScroll() {
        var viewportBottom = $(window).scrollTop() + $(window).height();
        var triggerPoint = viewportBottom - 150;
        
        // Problem cards
        $('.problem-card').each(function(index) {
            var cardId = 'p-' + index;
            if (animatedCards.problem.has(cardId)) return;
            
            var elementTop = $(this).offset().top;
            if (elementTop < triggerPoint) {
                animatedCards.problem.add(cardId);
                $(this).addClass('animated');
            }
        });

        // Solution cards
        $('.solution-card').each(function(index) {
            var cardId = 's-' + index;
            if (animatedCards.solution.has(cardId)) return;
            
            var elementTop = $(this).offset().top;
            if (elementTop < triggerPoint) {
                animatedCards.solution.add(cardId);
                $(this).addClass('animated');
            }
        });

        // Benefit cards
        $('.benefit-card').each(function(index) {
            var cardId = 'b-' + index;
            if (animatedCards.benefit.has(cardId)) return;
            
            var elementTop = $(this).offset().top;
            if (elementTop < triggerPoint) {
                animatedCards.benefit.add(cardId);
                $(this).addClass('animated');
            }
        });
    }

    // Parallax effect for blobs (translate3d for GPU compositing)
    function updateParallax() {
        var scrolled = $(window).scrollTop();
        $('.blob-1').css('transform', 'translate3d(' + (scrolled * 0.3) + 'px, ' + (scrolled * -0.2) + 'px, 0)');
        $('.blob-2').css('transform', 'translate3d(' + (scrolled * -0.2) + 'px, ' + (scrolled * 0.3) + 'px, 0)');
        $('.blob-3').css('transform', 'translate3d(' + (scrolled * 0.15) + 'px, ' + (scrolled * 0.15) + 'px, 0)');
    }

    // 통합 스크롤 핸들러 - requestAnimationFrame으로 throttling
    var ticking = false;
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNav();
                animateOnScroll();
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // 스크롤 이벤트 단일 등록
    $(window).on('scroll', onScroll);
    
    // Initial calls
    setTimeout(function() {
        updateActiveNav();
        animateOnScroll();
    }, 100);

    console.log('✅ Page initialized successfully');
    console.log('📊 Cards found:', {
        problem: $('.problem-card').length,
        solution: $('.solution-card').length,
        benefit: $('.benefit-card').length
    });
});
