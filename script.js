let panier = [];
let total = 0;
const numeroWhatsApp = "22372039675"; // TON NUMÉRO AVEC 223 DEVANT

// AJOUTER UN PRODUIT AU PANIER
function ajouterPanier(nom, prix, img) {
  let produit = panier.find(p => p.nom === nom);
  if(produit) { 
    produit.qte += 1; 
  } else { 
    panier.push({nom, prix, img, qte: 1}); 
  }
  total += prix;
  updatePanier();
  alert("✅ " + nom + " ajouté au panier !");
}

// METTRE À JOUR LE COMPTEUR ET TOTAL
function updatePanier() {
  let count = panier.reduce((acc, p) => acc + p.qte, 0);
  document.getElementById('cart-count').innerText = count;
  document.getElementById('total').innerText = total;
}

// OUVRIR LE POPUP DU PANIER
function ouvrirPanier() {
  if(panier.length === 0) { 
    alert("Ton panier est vide 🛒"); 
    return; 
  }
  document.getElementById('popup').style.display = 'block';
  let html = '';
  panier.forEach(p => {
    html += `<div class="item-panier">
      <img src="${p.img}" alt="${p.nom}">
      <div class="details">
        <b>${p.nom}</b>
        <span>Quantité: ${p.qte}</span>
      </div>
      <div class="prix-item">${p.prix * p.qte} FCFA</div>
    </div>`;
  });
  document.getElementById('liste-panier').innerHTML = html;
  document.getElementById('total-panier').innerText = total;
}

// FERMER LE POPUP
function fermerPanier() {
  document.getElementById('popup').style.display = 'none';
}

// ENVOYER LA COMMANDE SUR WHATSAPP
function envoyerWhatsApp() {
  let nom = document.getElementById('nom').value.trim();
  let tel = document.getElementById('tel').value.trim();
  let adresse = document.getElementById('adresse').value.trim();
  
  if(!nom || !tel) { 
    alert("⚠️ Remplis Nom et Téléphone stp"); 
    return; 
  }

  let message = `*NOUVELLE COMMANDE - INFINITY-DRIP STORE*%0A%0A`;
  panier.forEach(p => {
    message += `• ${p.nom} x${p.qte} = ${p.prix * p.qte} FCFA%0A`;
  });
  message += `%0A*Total Général : ${total} FCFA*%0A%0A`;
  message += `*Informations Client*%0A`;
  message += `*Nom :* ${nom}%0A`;
  message += `*Tel :* ${tel}%0A`;
  message += `*Adresse :* ${adresse || 'Non renseignée'}`;
  
  window.open(`https://wa.me/${numeroWhatsApp}?text=${message}`, '_blank');
  fermerPanier();
  alert("Commande envoyée sur WhatsApp ✅");
}
