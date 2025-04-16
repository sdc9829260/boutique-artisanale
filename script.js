// script.js

const stripe = Stripe("pk_test_1234567890abcdef"); // À remplacer par ta clé publique Stripe réelle
let panier = [];

function mettreAJourPanier() {
  const listePanier = document.getElementById("liste-panier");
  const totalPanier = document.getElementById("total-panier");
  const nbItems = document.getElementById("nb-items");
  listePanier.innerHTML = "";
  let total = 0;
  panier.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nom} - ${item.prix} €`;
    listePanier.appendChild(li);
    total += item.prix;
  });
  totalPanier.textContent = total;
  nbItems.textContent = panier.length;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".ajouter-panier").forEach((bouton) => {
    bouton.addEventListener("click", (e) => {
      const produit = e.target.closest(".produit");
      const nom = produit.getAttribute("data-nom");
      const prix = parseFloat(produit.getAttribute("data-prix"));
      panier.push({ nom, prix });
      mettreAJourPanier();
    });
  });

  document.getElementById("payerStripe").addEventListener("click", async () => {
    // Cette partie simule une requête vers un backend
    const response = await fetch("https://votre-backend.com/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: panier })
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      alert(result.error.message);
    }
  });
});
