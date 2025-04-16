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
});
