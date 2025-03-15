// Função para exibir a seção solicitada
const sections = document.querySelectorAll('section');
function showSection(sectionId) {
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}

/* --- Lógica do Menu com Indicador --- */
const navBar = document.querySelector('.navbar');
const allLi = document.querySelectorAll('.navbar ul li');

allLi.forEach((li, index) => {
  li.addEventListener("click", e => {
    navBar.querySelector(".active-list").classList.remove("active-list");
    li.classList.add("active-list");
    const indicator = document.querySelector(".indicator");
    // Cada item tem 80px de largura
    indicator.style.transform = `translateX(calc(${index * 80}px))`;
  });
});

/* --- Lógica do Projeto iMOVx --- */
// Elementos para propriedades e usuários
const propertyList = document.getElementById('propertyList');
const propertyDetails = document.getElementById('propertyDetails');
const userDataParagraph = document.getElementById('userData');

let users = [];
let currentUser = null;

const properties = [
  {
    id: 1,
    title: "Casa no Centro",
    description: "Casa ampla, 3 quartos, garagem, perto de tudo.",
    image: "https://via.placeholder.com/300x200?text=Casa+no+Centro",
    matricula: "12345"
  },
  {
    id: 2,
    title: "Apartamento na Praia",
    description: "Apartamento com vista para o mar, 2 quartos, sacada.",
    image: "https://via.placeholder.com/300x200?text=Apartamento+na+Praia",
    matricula: "67890"
  },
  {
    id: 3,
    title: "Chácara Rural",
    description: "Espaçosa, ideal para quem busca tranquilidade e contato com a natureza.",
    image: "https://via.placeholder.com/300x200?text=Ch%C3%A1cara+Rural",
    matricula: "54321"
  }
];

function loadProperties() {
  if(propertyList){
    propertyList.innerHTML = "";
    properties.forEach(property => {
      const card = document.createElement('div');
      card.classList.add('property-card');

      const img = document.createElement('img');
      img.src = property.image;
      img.alt = property.title;

      const title = document.createElement('h3');
      title.textContent = property.title;

      const desc = document.createElement('p');
      desc.textContent = property.description;

      const button = document.createElement('button');
      button.textContent = "Ver Detalhes";
      button.addEventListener('click', () => {
        showPropertyDetails(property.id);
      });

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(button);

      propertyList.appendChild(card);
    });
  }
}

function showPropertyDetails(propertyId) {
  const property = properties.find(p => p.id === propertyId);
  if(property){
    propertyDetails.innerHTML = `
      <img src="${property.image}" alt="${property.title}">
      <h3>${property.title}</h3>
      <p><strong>Descrição:</strong> ${property.description}</p>
      <p><strong>Matrícula:</strong> ${property.matricula}</p>
      <p><strong>QR Code / Link:</strong> <a href="#" target="_blank">Gerar Link do Anúncio</a></p>
    `;
    showSection('detalhesImovel');
  }
}

document.getElementById('cadastroForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('emailCadastro').value;
  const senha = document.getElementById('senhaCadastro').value;

  if(users.find(user => user.email === email)){
    alert("Usuário já cadastrado!");
    return;
  }
  users.push({nome, email, senha});
  alert("Cadastro realizado com sucesso!");
  e.target.reset();
  showSection('login');
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('emailLogin').value;
  const senha = document.getElementById('senhaLogin').value;
  const user = users.find(user => user.email === email && user.senha === senha);
  if(user){
    currentUser = user;
    alert("Login realizado com sucesso!");
    e.target.reset();
    showSection('home');
    updateUserData();
  } else {
    alert("Credenciais inválidas!");
  }
});

function updateUserData(){
  if(currentUser){
    userDataParagraph.textContent = `Nome: ${currentUser.nome}\nE-mail: ${currentUser.email}`;
  } else {
    userDataParagraph.textContent = "Você não está logado.";
  }
}

/* --- Lógica da Pesquisa com Animação --- */
const searchForm = document.getElementById('searchForm');
const searchResultsBg = document.querySelector('.search-results-bg');

searchForm.addEventListener('submit', function(e){
  e.preventDefault();
  const query = document.getElementById('searchInput').value.trim();
  
  // Filtra as propriedades cujo título contenha o query (simulação)
  const filtered = properties.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase())
  );
  
  let html = "";
  if(filtered.length > 0){
    html += "<ul>";
    filtered.forEach(p => {
      html += `<li><strong>${p.title}</strong> - ${p.description}</li>`;
    });
    html += "</ul>";
  } else {
    html = "Nenhum imóvel encontrado para '" + query + "'";
  }
  
  document.getElementById('searchResultText').innerHTML = html;
  searchResultsBg.classList.add('active');
});

document.addEventListener('DOMContentLoaded', () => {
  loadProperties();
  showSection('home');
});
