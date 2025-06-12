document.addEventListener('DOMContentLoaded', () => {
    const teamMembers = [
        {
            name: "Vinicius",
            role: "Analista de Suporte Junior",
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
            name: "Samuel",
            role: "Analista de Suporte Junior",
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
            image: "assets/img/construlino.png",
            social: {
                linkedin: "#",
                github: "",
                twitter: ""
            }
        },
        {
            name: "Dorival",
            role: "Analista de Suporte Junior",
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
            image: "assets/img/Dorivas.jpeg",
            social: {
                linkedin: "#",
                github: "",
                twitter: ""
            }
        },
        {
            name: "Teilor",
            role: "Analista de Suporte Junior",
            bio: [
                "Instalação CCL / Problemas com atualizador",
                "Validação de aplice locação protegida",
                "Cadastro de Clientes",
                "Capacitação on-line",
                "Auditar status aguardando solicitante e em andamento"
            ],
            image: "assets/img/construlino.png",
            social: {
                linkedin: "#",
                github: "",
                twitter: ""
            }
        },
        {
            name: "Bruno",
            role: "Analista de Suporte Pleno",
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
            image: "assets/img/construlino.png",
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
            <span class="assignment-item" data-aos="fade-up" data-aos-delay="${50 * idx}" data-aos-once="true">${assignment}</span>
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

            const activeCard = carousel.querySelector('.team-member-card.active');
            if (activeCard) {
                const assignmentItems = activeCard.querySelectorAll('.assignment-item');
                assignmentItems.forEach((item, idx) => {
                    item.classList.remove('visible');
                    void item.offsetWidth;
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 50 * idx);
                });
            }
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
        }, 4000);
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
    startAutoplay();

    window.addEventListener('resize', () => {
        renderCarousel();
        resetAutoplay();
    });
});