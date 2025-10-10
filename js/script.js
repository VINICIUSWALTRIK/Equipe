document.addEventListener('DOMContentLoaded', () => {
    const teamMembers = [
        {
            name: "Vinicius Waltrik",
            role: "Analista de Suporte de Sistemas Junior",
            bio: [
                "Sankhya",
                "Implantação de lojas - Completo",
                "Atualização de lojas mensais",
                "Roteiro digital",
                "Homologação de contas bancárias",
                "Locação protegida",
                "Erros e Dúvidas de NFE",
                "Capacitação online",
                "Apolices"
            ],
            image: "assets/img/eu.jpeg",
            social: {
                linkedin: "#",
                github: "",
                twitter: ""
            }
        },
        {
            name: "Pablo Ramos",
            role: "Analista de Suporte de Sistemas Junior",
            bio: [
                "Locação protegida",
                "Cadastro de equipamentos - GAT",
                "Contrato Clicksign",
                "Roteiro Digital",
                "Erros e Dúvidas de NFE",
                "Pix dinâmico",
                "Devolução",
                "SMTP"
            ],
            image: "assets/img/pablo.png",
            social: {
                linkedin: "#",
                github: "",
                twitter: ""
            }
        },
        {
            name: "Maxwell Rodrigues",
            role: "Analista de Suporte de Sistemas Junior",
            bio: [
                "Homologação de contas bancárias",
                "Pix dinâmico",
                "Contagem digital",
                "Afastamento Digital",
                "Erro ao emitir Contrato",
                "Sankhya",
                "Implantação de Lojas",
                "Inserir/Remover Períodos de Locação"
            ],
            image: "assets/img/Max.png",
            social: {
                linkedin: "#",
                github: "",
                twitter: ""
            }
        },
        {
            name: "Teilor Apolinário",
            role: "Analista de Suporte de Sistemas Junior",
            bio: [
                "Contagem / Afastamento Digital",
                "Locação protegida",
                "Inserir/Remover Períodos de Locação",
                "Capacitação on-line",
                "Banco de Oferta",
                "Pix dinâmico",
                "Homologação de contas bancárias"
            ],
            image: "assets/img/Teilor.jpg",
            social: {
                linkedin: "#",
                github: "",
                twitter: ""
            }
        },
        {
            name: "Bruno Beloto",
            role: "Analista de Suporte de Sistemas Pleno",
            bio: [
                "Dúvidas e problemas com o Gerencial",
                "Cadastro de equipamento - GAT",
                "Faturamento em geral",
                "Fechamento de caixa",
                "Bugs e Erros no sistema",
                "Reembolso",
                "Substituição",
                "Devolução",
                "Transferência de equipamento",
                "Banco de Oferta"
            ],
            image: "assets/img/Bruno Beloto.png",
            social: {
                linkedin: "#",
                github: "",
                twitter: ""
            }
        }
    ];

    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselIndicators = document.getElementById('carousel-indicators');

    let currentIndex = 0;
    let autoplayInterval;

    function createMemberCard(member) {
        const memberCard = document.createElement('div');
        memberCard.classList.add('team-member-card', 'bg-white', 'rounded-lg', 'shadow-xl', 'p-8', 'text-center', 'transform', 'scale-90', 'opacity-50', 'flex-shrink-0', 'w-full', 'max-w-md', 'mx-auto');

        let socialLinks = '';
        if (member.social.linkedin && member.social.linkedin !== '#') {
            socialLinks += `<a href="${member.social.linkedin}" target="_blank" class="mx-2 text-gray-600 hover:text-blue-600 transition duration-300"><img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" class="h-7 w-7 inline-block"></a>`;
        }
        if (member.social.github && member.social.github !== '') {
            socialLinks += `<a href="${member.social.github}" target="_blank" class="mx-2 text-gray-600 hover:text-blue-600 transition duration-300"><img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="GitHub" class="h-7 w-7 inline-block"></a>`;
        }
        if (member.social.twitter && member.social.twitter !== '') {
            socialLinks += `<a href="${member.social.twitter}" target="_blank" class="mx-2 text-gray-600 hover:text-blue-600 transition duration-300"><img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" alt="Twitter" class="h-7 w-7 inline-block"></a>`;
        }

        const assignmentsHtml = member.bio.map((assignment, idx) => `
            <span class="assignment-item" style="animation-delay: ${50 * idx}ms;">${assignment}</span>
        `).join('');

        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-lg border-4 border-blue-200">
            <h4 class="text-2xl font-bold text-gray-800 mb-2">${member.name}</h4>
            <p class="role-text-color font-semibold mb-4 text-lg">${member.role}</p>
            <div class="assignments-list text-base mb-6">
                ${assignmentsHtml}
            </div>
            <div class="flex justify-center mt-4">
                ${socialLinks}
            </div>
        `;
        return memberCard;
    }

    function renderCarousel() {
        const currentActiveCard = carousel.querySelector('.team-member-card.active');
        if (currentActiveCard) {
            const currentAssignmentsList = currentActiveCard.querySelector('.assignments-list');
            if (currentAssignmentsList) {
                currentAssignmentsList.classList.remove('animate-chips');
            }
        }

        carousel.innerHTML = '';
        carouselIndicators.innerHTML = '';

        teamMembers.forEach((member, index) => {
            const memberCard = createMemberCard(member);
            if (index === currentIndex) {
                memberCard.classList.add('active');
            }
            carousel.appendChild(memberCard);

            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
            carouselIndicators.appendChild(indicator);
        });

        if (carousel.children.length > 0) {
            const cardWidth = carousel.children[0].offsetWidth;
            const offset = (carousel.offsetWidth / 2) - (cardWidth / 2) - (currentIndex * cardWidth);
            carousel.style.transform = `translateX(${offset}px)`;

            // Dispara a animação dos chips APÓS a transição do carrossel ter terminado
            carousel.addEventListener('transitionend', function handler(event) {
                if (event.target === carousel) {
                    const activeCard = carousel.querySelector('.team-member-card.active');
                    if (activeCard) {
                        const assignmentsList = activeCard.querySelector('.assignments-list');
                        if (assignmentsList) {
                            void assignmentsList.offsetWidth; // Força reflow (ainda pode ser útil para resetar animação)
                            assignmentsList.classList.add('animate-chips');
                        }
                    }
                    carousel.removeEventListener('transitionend', handler);
                }
            }, { once: true });
        }
    }

    function goToSlide(index) {
        currentIndex = (index + teamMembers.length) % teamMembers.length;
        renderCarousel();
    }

    function showNextSlide() {
        goToSlide(currentIndex + 1);
    }

    function showPrevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            showNextSlide();
        }, 13000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    nextBtn.addEventListener('click', () => {
        showNextSlide();
        resetAutoplay();
    });
    prevBtn.addEventListener('click', () => {
        showPrevSlide();
        resetAutoplay();
    });

    renderCarousel();

    // Disparo inicial da animação dos chips para o primeiro card
    setTimeout(() => {
        const initialActiveCard = carousel.querySelector('.team-member-card.active');
        if (initialActiveCard) {
            const assignmentsList = initialActiveCard.querySelector('.assignments-list');
            if (assignmentsList) {
                assignmentsList.classList.add('animate-chips');
            }
        }
    }, 100);

    startAutoplay();

    window.addEventListener('resize', () => {
        resetAutoplay();
        renderCarousel();
    });
});