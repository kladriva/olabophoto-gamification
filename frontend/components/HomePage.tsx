"use client";
import React, { useState } from 'react';
import { Play, Trophy, Users, Camera, Sparkles, ArrowRight, Star, Image, Calendar, Clock } from 'lucide-react';

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const gameStats = [
    { icon: Image, label: "Photos à deviner", value: "150+", color: "text-blue-500" },
    { icon: Users, label: "Joueurs actifs", value: "2.3K", color: "text-green-500" },
    { icon: Trophy, label: "Défis complétés", value: "8.7K", color: "text-yellow-500" },
    { icon: Calendar, label: "Événements couverts", value: "50+", color: "text-purple-500" }
  ];

  const recentEvents = [
    { title: "Miss Martinique 2024", difficulty: "Facile", players: 127 },
    { title: "Finale Champions League", difficulty: "Moyen", players: 89 },
    { title: "Festival Jazz Fort-de-France", difficulty: "Difficile", players: 156 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header Navigation */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Camera className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">OlaboPhoto</span>
              <span className="text-sm text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full">Gaming</span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-gray-300 hover:text-white transition-colors">
                Classement
              </button>
              <button className="text-gray-300 hover:text-white transition-colors">
                À propos
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all transform hover:scale-105">
                Connexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Sparkles className="h-16 w-16 text-yellow-400 animate-pulse" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Devinez le{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Contexte
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Testez vos connaissances sur les événements publics de la Martinique ! 
              Reconnaissez-vous ce moment capturé par OlaboPhoto ?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button onClick={() => setCurrentPage('game')} className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 shadow-2xl">
                <Play className="h-6 w-6 group-hover:animate-pulse" />
                <span>Commencer à Jouer</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="bg-white/10 backdrop-blur hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border border-white/20 hover:border-white/40">
                Comment ça marche ?
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {gameStats.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Comment ça fonctionne ?</h2>
            <p className="text-xl text-gray-400">Simple, amusant et captivant !</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Observez la Photo",
                description: "Une photo d'événement public vous est présentée",
                icon: Image,
                color: "blue"
              },
              {
                step: "2", 
                title: "Devinez le Contexte",
                description: "Quel événement ? Où ? Quand ? Laissez libre cours à vos connaissances !",
                icon: Clock,
                color: "purple"
              },
              {
                step: "3",
                title: "Gagnez des Points",
                description: "Plus vous êtes précis, plus vous gagnez de points et montez au classement",
                icon: Trophy,
                color: "yellow"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10 transition-all duration-300 transform ${
                  hoveredCard === index ? 'scale-105 bg-white/10 border-white/20' : ''
                }`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto
                    ${item.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : ''}
                    ${item.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
                    ${item.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                  `}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  
                  <div className={`text-3xl font-bold mb-2 text-center
                    ${item.color === 'blue' ? 'text-blue-400' : ''}
                    ${item.color === 'purple' ? 'text-purple-400' : ''}
                    ${item.color === 'yellow' ? 'text-yellow-400' : ''}
                  `}>
                    {item.step}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4 text-center">{item.title}</h3>
                  <p className="text-gray-400 text-center leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Challenges */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Défis Récents</h2>
              <p className="text-gray-400">Les derniers événements ajoutés au jeu</p>
            </div>
            <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-2">
              <span>Voir tous</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentEvents.map((event, index) => (
              <div key={index} className="bg-white/5 backdrop-blur rounded-xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                  <Image className="h-16 w-16 text-white/60 group-hover:text-white/80 transition-colors" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                  
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${event.difficulty === 'Facile' ? 'bg-green-500/20 text-green-400' : ''}
                      ${event.difficulty === 'Moyen' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                      ${event.difficulty === 'Difficile' ? 'bg-red-500/20 text-red-400' : ''}
                    `}>
                      {event.difficulty}
                    </span>
                    
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{event.players}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur rounded-3xl p-12 border border-white/10">
            <Star className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            
            <h2 className="text-4xl font-bold text-white mb-4">
              Prêt à tester vos connaissances ?
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Rejoignez la communauté et découvrez à quel point vous connaissez 
              les événements de la Martinique !
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-2xl">
                <Play className="h-6 w-6" />
                <span>Jouer Maintenant</span>
              </button>
              
              <button className="bg-white/10 backdrop-blur hover:bg-white/20 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all border border-white/20 hover:border-white/40">
                Créer un Compte
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Camera className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">OlaboPhoto</span>
            </div>
            <p className="text-gray-400">
              Capturant les moments, créant les souvenirs, testant vos connaissances.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}