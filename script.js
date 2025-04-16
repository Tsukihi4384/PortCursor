document.addEventListener('DOMContentLoaded', () => {
    const bannerCards = document.querySelectorAll('.banner-card');
    
    // Adicionar animação de entrada para cada card
    bannerCards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
    });
    
    // Adicionar estilos CSS para animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .banner-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
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
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
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
        }
    `;
    document.head.appendChild(modalStyle);
}); 