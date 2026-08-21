/**
 * Natureza em Flores — 30 Anos Surpreendendo Quem Você Ama
 * Instagram: @naturezaemflores
 * Linktree: linktr.ee/NaturezaEmFlores
 * Horários: Seg-Sex 08:30-19:30 | Sáb 08:30-15:00 | Dom Fechada
 * Lógica da Navegação, Status de Loja ao Vivo & Montador Interativo de WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation Menu Toggle
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Interactive Gift Builder Option Selection
  setupOptionCards('step-ocasiao');
  setupOptionCards('step-flores');

  // Multi-select for Additions
  document.querySelectorAll('#step-adicionais .option-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
    });
  });

  // Builder Form Submit -> Direct WhatsApp
  const giftBuilderForm = document.getElementById('giftBuilderForm');
  if (giftBuilderForm) {
    giftBuilderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const ocasiaoCard = document.querySelector('#step-ocasiao .option-card.selected');
      const floresCard = document.querySelector('#step-flores .option-card.selected');
      const adicionaisCards = document.querySelectorAll('#step-adicionais .option-card.selected');
      
      const nome = document.getElementById('builder-nome')?.value.trim() || '';
      const observacao = document.getElementById('builder-obs')?.value.trim() || '';
      const entrega = document.getElementById('builder-entrega')?.value || 'Entrega em Domicílio';

      const ocasiao = ocasiaoCard ? ocasiaoCard.getAttribute('data-value') : 'Presente Especial';
      const flores = floresCard ? floresCard.getAttribute('data-value') : 'Buquê Especial Natureza em Flores';
      
      const adicionais = Array.from(adicionaisCards).map(c => c.getAttribute('data-value'));

      // Linktree ou WhatsApp
      let msg = `*NOVO PEDIDO PERSONALIZADO — NATUREZA EM FLORES* 💐\n\n`;
      if (nome) msg += `*Cliente:* ${nome}\n`;
      msg += `*Ocasião:* ${ocasiao}\n`;
      msg += `*Estilo / Arranjo:* ${flores}\n`;
      if (adicionais.length > 0) {
        msg += `*Acompanhamentos:* ${adicionais.join(', ')}\n`;
      }
      msg += `*Modalidade:* ${entrega}\n`;
      if (observacao) msg += `*Mensagem do Cartão / Obs:* ${observacao}\n`;
      msg += `\nOlá! Montei esse presente no site da Natureza em Flores e gostaria de fazer minha encomenda!`;

      // Abra linktree ou direct whatsapp
      const whatsappUrl = `https://linktr.ee/NaturezaEmFlores`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // Live Store Status Check
  updateLiveStatus();
});

function setupOptionCards(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cards = container.querySelectorAll('.option-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
}

function updateLiveStatus() {
  const statusIndicator = document.getElementById('statusIndicator');
  const statusTitle = document.getElementById('statusTitle');

  if (!statusIndicator || !statusTitle) return;

  const now = new Date();
  const day = now.getDay(); // 0 = Dom, 1 = Seg ... 6 = Sáb
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = hours * 60 + minutes;

  // Seg-Sex: 08:30 - 19:30 (510 min a 1170 min)
  // Sáb: 08:30 - 15:00 (510 min a 900 min)
  // Dom: Fechada
  let isOpen = false;

  if (day >= 1 && day <= 5) { // Seg a Sex
    if (time >= (8 * 60 + 30) && time < (19 * 60 + 30)) isOpen = true;
  } else if (day === 6) { // Sábado
    if (time >= (8 * 60 + 30) && time < 15 * 60) isOpen = true;
  } // Domingo = Fechada

  if (isOpen) {
    statusIndicator.className = 'pulse-dot';
    statusTitle.textContent = 'Loja Aberta Agora • Atendimento & Encomendas no WhatsApp';
    statusTitle.style.color = '#10b981';
  } else {
    statusIndicator.className = 'status-indicator';
    statusIndicator.style.backgroundColor = '#ef4444';
    statusTitle.textContent = 'Loja Fechada no Momento • Aceitando Encomendas no WhatsApp';
    statusTitle.style.color = '#ef4444';
  }
}
