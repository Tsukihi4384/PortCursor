document.addEventListener('DOMContentLoaded', () => {
    const bannerCards = document.querySelectorAll('.banner-card');
    const navLinks = document.querySelectorAll('nav a');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Adicionar animação de entrada para cada card
    const animateOnScroll = (elements, animation) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = animation;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            observer.observe(element);
        });
    };
    
    // Animações para diferentes elementos
    animateOnScroll(bannerCards, 'fadeIn 0.5s ease forwards');
    animateOnScroll(serviceCards, 'slideUp 0.5s ease forwards');
    animateOnScroll(skillTags, 'scaleIn 0.3s ease forwards');
    
    // Adicionar estilos CSS para animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
        
        .banner-card, .service-card, .skill-tag {
            opacity: 0;
        }
        
        .skill-tag {
            animation-delay: calc(var(--index) * 0.1s);
        }
    `;
    document.head.appendChild(style);
    
    // Adicionar índice para delay na animação das skills
    skillTags.forEach((tag, index) => {
        tag.style.setProperty('--index', index);
    });
    
    // Adicionar evento de clique para abrir o banner em tamanho maior
    bannerCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="close-btn">&times;</button>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Fechar o modal ao clicar no botão ou fora dele
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.className === 'close-btn') {
                    modal.remove();
                }
            });
        });
    });
    
    // Adicionar estilos CSS para o modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            animation: scaleIn 0.3s ease;
        }
        
        .modal-content img {
            max-width: 100%;
            max-height: 90vh;
            border-radius: 10px;
        }
        
        .close-btn {
            position: absolute;
            top: -30px;
            right: -30px;
            font-size: 2rem;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .close-btn:hover {
            transform: rotate(90deg);
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Adicionar rolagem suave para os links do menu
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Adicionar classe active ao link clicado
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Adicionar funcionalidade de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            bannerCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Adicionar efeito de hover nos cards de serviço
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Adicionar efeito de scroll para o header
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
            return;
        }
        
        if (currentScroll > lastScroll) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}); 