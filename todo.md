- Le service "exchange-rate.service" aurait dû fonctionner avec deux rateSubject. L'un réprésentant le rate variable, se mettant à jour toutes les X secondes. Et le second représenterait le Rate fixe.
  Le polling ne devrait pas s'arrêter lorsque l'on utilise le Rate fixe, afin de pouvoir ré-utiliser le Rate variable lorsqu'il y a une variation de plus de 2%.
- Ajouter la locale FR afin que la date et l'heure de l'historique s'affichent tel qu'attendu
