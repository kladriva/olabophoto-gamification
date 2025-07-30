"use client";
import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Clock, 
  Trophy, 
  Users, 
  Send, 
  Lightbulb, 
  Star, 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  RotateCcw,
  Zap,
  Target,
  Award
} from 'lucide-react';

const GameInterface = () => {
  // États du jeu
  const [gameState, setGameState] = useState('playing'); // playing, answered, finished
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [currentScore, setCurrentScore] = useState(1250);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Données mockées pour la démo
  const currentPhoto = {
    id: 1,
    url: '/api/placeholder/800/600',
    event: 'Miss Martinique 2024',
    location: 'Fort-de-France',
    date: '2024-03-15',
    difficulty: 'Moyen',
    hints: [
      'Cet événement a lieu une fois par an en Martinique',
      'Il s\'agit d\'un concours de beauté',
      'La gagnante représentera la Martinique au niveau national'
    ]
  };

  const [comments, setComments] = useState([
    { id: 1, user: 'Marie972', answer: 'Miss Martinique ?', time: '30s', likes: 12 },
    { id: 2, user: 'Antilles_Expert', answer: 'Concours de beauté à Fort-de-France', time: '45s', likes: 8 },
    { id: 3, user: 'PhotoFan', answer: 'Élection Miss 2024 !', time: '1m', likes: 15 }
  ]);

  // Timer countdown
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameState('answered');
    }
  }, [timeLeft, gameState]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulation API call
    setTimeout(() => {
      setGameState('answered');
      setCurrentScore(prev => prev + 150); // Points gagnés
      setIsSubmitting(false);
      
      // Ajouter la réponse aux commentaires
      const newComment = {
        id: comments.length + 1,
        user: 'Vous',
        answer: userAnswer,
        time: 'maintenant',
        likes: 0,
        isOwn: true
      };
      setComments(prev => [newComment, ...prev]);
    }, 1500);
  };

  const nextRound = () => {
    if (currentRound < totalRounds) {
      setCurrentRound(prev => prev + 1);
      setGameState('playing');
      setTimeLeft(120);
      setUserAnswer('');
      setShowHint(false);
    } else {
      setGameState('finished');
    }
  };

  const getTimerColor = () => {
    if (timeLeft > 60) return 'text-green-400';
    if (timeLeft > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Facile': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Moyen': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Difficile': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (gameState === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20 max-w-md w-full text-center">
          <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Partie Terminée !</h2>
          <div className="text-6xl font-bold text-blue-400 mb-2">{currentScore}</div>
          <div className="text-gray-300 mb-6">points au total</div>
          <div className="flex gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all"
            >
              Rejouer
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl font-semibold transition-all border border-white/20">
              Classement
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header de jeu */}
      <div className="bg-black/20 backdrop-blur border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <div className="flex items-center space-x-3">
              <Camera className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">OlaboPhoto</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Progress */}
            <div className="text-white">
              <span className="text-sm text-gray-300">Manche</span>
              <span className="ml-2 font-bold">{currentRound}/{totalRounds}</span>
            </div>
            
            {/* Timer */}
            <div className={`flex items-center space-x-2 ${getTimerColor()}`}>
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
            </div>
            
            {/* Score */}
            <div className="flex items-center space-x-2 text-yellow-400">
              <Trophy className="h-5 w-5" />
              <span className="font-bold">{currentScore.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-3 gap-6">
        {/* Zone Photo Principale */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden">
            {/* Info photo */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(currentPhoto.difficulty)}`}>
                    {currentPhoto.difficulty}
                  </span>
                  <span className="text-gray-300">Événement public • Martinique</span>
                </div>
                <button 
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Lightbulb className="h-5 w-5" />
                  <span>Indices</span>
                </button>
              </div>
            </div>

            {/* Photo */}
            <div className="relative aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
              <div className="text-center text-white/60">
                <Camera className="h-24 w-24 mx-auto mb-4" />
                <p className="text-lg">Photo de {currentPhoto.event}</p>
                <p className="text-sm text-gray-400">En cours de chargement...</p>
              </div>
              
              {/* Overlay zoom */}
              <div className="absolute top-4 right-4 bg-black/50 rounded-lg p-2">
                <span className="text-white text-sm">Cliquez pour zoomer</span>
              </div>
            </div>

            {/* Indices */}
            {showHint && (
              <div className="p-4 bg-yellow-500/10 border-t border-yellow-500/20">
                <h4 className="text-yellow-400 font-semibold mb-2 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Indices
                </h4>
                <ul className="space-y-1 text-gray-300">
                  {currentPhoto.hints.map((hint, index) => (
                    <li key={index} className="text-sm">• {hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Zone de réponse */}
          <div className="mt-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="h-6 w-6 mr-2 text-blue-400" />
              Votre réponse
            </h3>
            
            {gameState === 'playing' ? (
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Décrivez le contexte de cette photo : quel événement, où, quand..."
                  className="w-full h-24 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none resize-none"
                  maxLength={200}
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {userAnswer.length}/200 caractères
                  </span>
                  
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!userAnswer.trim() || isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl font-semibold transition-all flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                    <span>{isSubmitting ? 'Envoi...' : 'Envoyer'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 mb-4">
                  <Zap className="h-12 w-12 text-green-400 mx-auto mb-3" />
                  <h4 className="text-green-400 font-bold text-lg mb-2">Bonne réponse !</h4>
                  <p className="text-white mb-2">Il s'agissait de : <strong>{currentPhoto.event}</strong></p>
                  <p className="text-gray-300 text-sm">Lieu : {currentPhoto.location} • Date : {currentPhoto.date}</p>
                  <div className="mt-4 text-yellow-400 font-bold">+150 points gagnés !</div>
                </div>
                
                <button
                  onClick={nextRound}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 mx-auto"
                >
                  <span>{currentRound < totalRounds ? 'Photo suivante' : 'Voir le résultat'}</span>
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Commentaires communauté */}
        <div className="space-y-6">
          {/* Stats live */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-400" />
              Joueurs en ligne
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">127</div>
                <div className="text-sm text-gray-400">En jeu</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">89</div>
                <div className="text-sm text-gray-400">Cette photo</div>
              </div>
            </div>
          </div>

          {/* Commentaires */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-blue-400" />
              Réponses de la communauté
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className={`p-3 rounded-lg ${comment.isOwn ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/5'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${comment.isOwn ? 'text-blue-300' : 'text-white'}`}>
                      {comment.user}
                    </span>
                    <span className="text-xs text-gray-400">{comment.time}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{comment.answer}</p>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-xs">{comment.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-center text-sm text-gray-400">
                <MessageCircle className="h-4 w-4 inline mr-1" />
                Les réponses apparaîtront après votre soumission
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInterface;