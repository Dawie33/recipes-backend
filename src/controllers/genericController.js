// controllers/genericController.js
const genericController = {
  // GET - Récupérer toutes les instances
  getAll: (useCase) => async (req, res) => {
    try {
      const result = await useCase.list(); // Appel générique de la couche d'accès aux données
      res.status(200).json(result);
    } catch (error) {
      console.error('Erreur lors de la récupération :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données' });
    }
  },
      // GET - Récupérer une instance par ID
  getById: (useCase) => async (req, res) => {
    try {
      const id = req.params.id;
      const result = await useCase.getById(id); // Appel générique de la couche d'accès aux données
      if (!result) {
        return res.status(404).json({ error: 'Élément non trouvé' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'élément :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'élément' });
    }
  },


  // POST - Créer une nouvelle instance
  create: (useCase) => async (req, res) => {
    try {
      const data = req.body;
      const mainImage = req.files.find((file) => file.fieldname === 'image'); // Image principale
      const ingredientImages = req.files.filter((file) => file.fieldname.startsWith('ingredients')); // Images des ingrédients
  
      const result = await useCase.add(data,mainImage,ingredientImages); // Appel générique de la couche d'accès aux données
      res.status(201).json(result);
    } catch (error) {
      console.error('Erreur lors de la création :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la création' });
    }
  },
  
  // PUT - Mettre à jour une instance par ID
  update: (useCase) => async (req, res) => {
    try {
      const id = req.params.id;
      const result = await useCase.update(id, req.body); // Appel générique de la couche d'accès aux données
      if (!result) {
        return res.status(404).json({ error: 'Élément non trouvé' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour' });
    }
  },
    // DELETE - Supprimer une instance par ID
  delete: (useCase) => async (req, res) => {
    try {
      const id = req.params.id;
      const result = await useCase.remove(id); // Appel générique de la couche d'accès aux données
      if (!result) {
        return res.status(404).json({ error: 'Élément non trouvé' });
      }
      res.status(200).json({ message: 'Élément supprimé' });
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la suppression' });
    }
  }
};
  
module.exports = genericController;
  