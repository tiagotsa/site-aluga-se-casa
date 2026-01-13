// Scroll suave para seções
function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// LIGHTBOX - Abrir modal com imagem
function openModal(imagePath) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modal.classList.add('show');
    modalImage.src = imagePath;
    
    // Extrair nome da imagem para caption
    const imageName = imagePath.split('/').pop().replace('aluga-casa', 'Foto').replace('.jpeg', '');
    modalCaption.textContent = imageName || 'Foto da Propriedade';
}

// LIGHTBOX - Fechar modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
}

// Fechar modal ao clicar fora da imagem
window.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Hambúrguer menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });
    }

    // Fechar menu e navegar ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navMenu.classList.remove('active');
            
            // Navegar com scroll suave
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
        }
    });
});

// Validação e envio do formulário
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        nome: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        telefone: this.querySelector('input[type="tel"]').value,
        mensagem: this.querySelector('textarea').value
    };

    // Validação básica
    if (!formData.nome || !formData.email || !formData.telefone) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Enviar via WhatsApp (adaptado)
    const whatsappMessage = `
*Novo Contato - Casa com Potencial*

*Nome:* ${formData.nome}
*Email:* ${formData.email}
*Telefone:* ${formData.telefone}
*Mensagem:* ${formData.mensagem}
    `.trim();

    // Para produção, integrar com servidor real
    console.log('Dados do formulário:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    this.reset();
});

// Analytics - Rastrear cliques em CTAs
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        console.log('CTA clicado:', this.textContent);
        // Integrar com Google Analytics aqui
    });
});

// Lazy loading de imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

// Animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animação em cards
document.querySelectorAll('.destaque-card, .feature-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Adicionar keyframe de animação dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
