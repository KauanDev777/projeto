// Funções de Utilidade
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

// Função para mostrar uma seção
function showSection(sectionId) {
  $$('section').forEach(section => {
      section.classList.remove('active');
      section.setAttribute('aria-hidden', 'true');
  });

  const section = $(`#${sectionId}`);
  if (section) {
      section.classList.add('active');
      section.removeAttribute('aria-hidden');
      // Atualiza a navegação para refletir a seção ativa
      updateNavIndicator(sectionId);
      // Anúncio para leitores de tela
      announceChange(`Seção ${sectionId} ativa`);
  }
}

// Atualiza o indicador de navegação
function updateNavIndicator(activeSectionId) {
  const navItems = $$('.navbar ul li');
  navItems.forEach(item => item.classList.remove('active-list'));

  const activeItem = $(`.navbar a[href="#${activeSectionId}"]`).closest('li');
  if (activeItem) {
      activeItem.classList.add('active-list');
      const indicator = $('.indicator');
      const offset = activeItem.offsetLeft;
      indicator.style.transform = `translateX(${offset}px)`;
  }
}

// Função para anunciar mudanças para leitores de tela
function announceChange(message) {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.style.position = 'absolute';
  liveRegion.style.left = '-10000px';
  liveRegion.textContent = message;
  document.body.appendChild(liveRegion);

  // Remove a região ao finalizar a leitura
  setTimeout(() => {
      liveRegion.remove();
  }, 1000);
}

// Manipulação do formulário de busca
$('#searchForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const searchInput = $('#searchInput');
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
      $('#searchResultText').textContent = `Resultados para "${searchTerm}"`;
      $('.search-results-bg').classList.add('active');
  } else {
      $('#searchResultText').textContent = 'Por favor, insira um termo de busca.';
  }
});

// Eventos de formulário para cadastro e login (exemplo básico)
['#cadastroForm', '#loginForm'].forEach(formId => {
  $(formId).addEventListener('submit', function(event) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);

      alert('Formulário enviado:\n' + Array.from(formData.entries()).map(entry => `${entry[0]}: ${entry[1]}`).join('\n'));
      form.reset();
  });
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
});
