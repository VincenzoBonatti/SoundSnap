function animations(){
    document.querySelectorAll('.favorite-button').forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault()

        if(button.classList.contains('animated')) {
            return
        }
        button.classList.add('animated')

        gsap.to(button, {
            keyframes: [{
                '--star-y': '-36px',
                duration: .3,
                ease: 'power2.out'
            }, {
                '--star-y': '48px',
                '--star-scale': .4,
                duration: .325,
                onStart() {
                    button.classList.add('star-round')
                }
            }, {
                '--star-y': '-64px',
                '--star-scale': 1,
                duration: .45,
                ease: 'power2.out',
                onStart() {
                    button.classList.toggle('active')
                    setTimeout(() => button.classList.remove('star-round'), 100)
                }
            }, {
                '--star-y': '0px',
                duration: .45,
                ease: 'power2.in'
            }, {
                '--button-y': '3px',
                duration: .11
            }, {
                '--button-y': '0px',
                '--star-face-scale': .65,
                duration: .125
            }, {
                '--star-face-scale': 1,
                duration: .15
            }],
            clearProps: true,
            onComplete() {
                button.classList.remove('animated')
            }
        })

        gsap.to(button, {
            keyframes: [{
                '--star-hole-scale': .8,
                duration: .5,
                ease: 'elastic.out(1, .75)'
            }, {
                '--star-hole-scale': 0,
                duration: .2,
                delay: .2
            }]
        })

        gsap.to(button, {
            '--star-rotate': '360deg',
            duration: 1.55,
            clearProps: true
        })
    })
})


    const button = document.querySelectorAll('.button')
    for (let i = 0; i < button.length; i++) {
        let like = document.getElementById("likes-"+i)
        const a = parseInt(like?.innerText)
        button[i].addEventListener('click', e => {
            button[i].classList.toggle('liked');
            if(button[i].classList.contains('liked')) {
                gsap.fromTo(button[i], {
                    '--hand-rotate': 8
                }, {
                    ease: 'none',
                    keyframes: [{
                        '--hand-rotate': -45,
                        duration: .16,
                        ease: 'none'
                    }, {
                        '--hand-rotate': 15,
                        duration: .12,
                        ease: 'none'
                    }, {
                        '--hand-rotate': 0,
                        duration: .2,
                        ease: 'none',
                        clearProps: true
                    }]
                });
                
                
                like.innerText = a+1
                
            } else {
                like.innerText = a
            }
            
        })
        
        
    }
    
}