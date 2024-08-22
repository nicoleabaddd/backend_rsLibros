const Recommendation = require('../models/recommendationModels');
const Book = require('../models/bookModels'); // Importa el modelo de libro si es necesario

exports.createRecommendation = async (req, res) => {
  try {
    const { userId, book, score, description } = req.body;

    if (!userId || !book || !score) {
      return res.status(400).json({ error: 'UserId, book, and score are required' });
    }

    console.log('UserId:', userId);
    console.log('Book ID:', book);
    console.log('Score:', score);
    console.log('Description:', description);

    const existingBook = await Book.findById(book);
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const recommendation = new Recommendation({
      user: userId,
      book,
      score,
      description
    });

    await recommendation.save();

    res.status(201).json(recommendation);
  } catch (err) {
    console.error('Error creating recommendation:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};


exports.getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find().populate('user').populate('book');
    res.status(200).json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id).populate('user').populate('book');
    if (!recommendation) return res.status(404).json({ error: 'Recommendation not found' });
    res.status(200).json(recommendation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!recommendation) return res.status(404).json({ error: 'Recommendation not found' });
    res.status(200).json(recommendation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findByIdAndDelete(req.params.id);
    if (!recommendation) return res.status(404).json({ error: 'Recommendation not found' });
    res.status(200).json({ message: 'Recommendation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
