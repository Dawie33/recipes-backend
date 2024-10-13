// controllers/genericController.js

const genericController = {
  // GET - Récupérer toutes les instances
  getAll: (dataAccessLayer) => async (req, res) => {
    try {
      const items = await dataAccessLayer.list(); // Appel générique de la couche d'accès aux données
      res.status(200).json(items);
    } catch (error) {
      console.error('Erreur lors de la récupération :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données' });
    }
  },
      // GET - Récupérer une instance par ID
  getById: (dataAccessLayer) => async (req, res) => {
    try {
      const id = req.params.id;
      const item = await dataAccessLayer.getById(id); // Appel générique de la couche d'accès aux données
      if (!item) {
        return res.status(404).json({ error: 'Élément non trouvé' });
      }
      res.status(200).json(item);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'élément :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'élément' });
    }
  },


  // POST - Créer une nouvelle instance
  create: (dataAccessLayer) => async (req, res) => {
    try {
      const newItem = await dataAccessLayer.add(req.body); // Appel générique de la couche d'accès aux données
      res.status(201).json(newItem);
    } catch (error) {
      console.error('Erreur lors de la création :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la création' });
    }
  },
  
  // PUT - Mettre à jour une instance par ID
  update: (dataAccessLayer) => async (req, res) => {
    try {
      const id = req.params.id;
      const updatedItem = await dataAccessLayer.update(id, req.body); // Appel générique de la couche d'accès aux données
      if (!updatedItem) {
        return res.status(404).json({ error: 'Élément non trouvé' });
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour' });
    }
  },
    // DELETE - Supprimer une instance par ID
  delete: (dataAccessLayer) => async (req, res) => {
    try {
      const id = req.params.id;
      const deletedItem = await dataAccessLayer.remove(id); // Appel générique de la couche d'accès aux données
      if (!deletedItem) {
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
  