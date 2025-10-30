import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type Screen = 'home' | 'learning' | 'games';

type LearningCategory = 'colors' | 'shapes' | 'animals';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [stars, setStars] = useState(0);
  const [learningCategory, setLearningCategory] = useState<LearningCategory | null>(null);
  const [gameCards, setGameCards] = useState<Array<{id: number, emoji: string, flipped: boolean, matched: boolean}>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const learningData = {
    colors: [
      { emoji: '🔴', name: 'Красный', color: 'bg-red-500' },
      { emoji: '🔵', name: 'Синий', color: 'bg-blue-500' },
      { emoji: '🟢', name: 'Зелёный', color: 'bg-green-500' },
      { emoji: '🟡', name: 'Жёлтый', color: 'bg-yellow-400' },
      { emoji: '🟣', name: 'Фиолетовый', color: 'bg-purple-500' },
      { emoji: '🟠', name: 'Оранжевый', color: 'bg-orange-500' },
    ],
    shapes: [
      { emoji: '🔴', name: 'Круг', desc: 'Круглый как мячик' },
      { emoji: '🟦', name: 'Квадрат', desc: 'Четыре угла' },
      { emoji: '🔺', name: 'Треугольник', desc: 'Три угла' },
      { emoji: '⭐', name: 'Звезда', desc: 'Яркая звёздочка' },
      { emoji: '❤️', name: 'Сердечко', desc: 'Символ любви' },
      { emoji: '🌙', name: 'Полумесяц', desc: 'Как луна на небе' },
    ],
    animals: [
      { emoji: '🐱', name: 'Котик', sound: 'Мяу-мяу' },
      { emoji: '🐶', name: 'Собачка', sound: 'Гав-гав' },
      { emoji: '🐮', name: 'Коровка', sound: 'Му-му' },
      { emoji: '🐷', name: 'Свинка', sound: 'Хрю-хрю' },
      { emoji: '🐸', name: 'Лягушка', sound: 'Ква-ква' },
      { emoji: '🐔', name: 'Курочка', sound: 'Ко-ко-ко' },
    ],
  };

  const initMemoryGame = () => {
    const emojis = ['🐱', '🐶', '🐸', '🦁', '🐼', '🐯'];
    const cards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }));
    setGameCards(cards);
    setFlippedCards([]);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (gameCards[id].flipped || gameCards[id].matched) return;

    const newCards = [...gameCards];
    newCards[id].flipped = true;
    setGameCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (newCards[first].emoji === newCards[second].emoji) {
        setTimeout(() => {
          const matchedCards = [...gameCards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setGameCards(matchedCards);
          setFlippedCards([]);
          setStars(prev => prev + 1);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...gameCards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setGameCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const renderHome = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100">
      <div className="text-center mb-12 space-y-4">
        <div className="text-8xl mb-4 bounce-gentle">🌈</div>
        <h1 className="text-6xl font-bold text-primary mb-2">Умные Малыши</h1>
        <p className="text-3xl text-muted-foreground">Учись и играй!</p>
        
        <div className="flex items-center justify-center gap-2 text-4xl mt-6">
          {Array.from({ length: stars }).map((_, i) => (
            <span key={i} className="pulse-slow">⭐</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Button
          size="lg"
          onClick={() => setScreen('learning')}
          className="h-48 text-4xl font-bold rounded-3xl bg-gradient-to-br from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 shadow-2xl transform transition hover:scale-105"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-7xl">📚</span>
            <span>Обучение</span>
          </div>
        </Button>

        <Button
          size="lg"
          onClick={() => {
            setScreen('games');
            initMemoryGame();
          }}
          className="h-48 text-4xl font-bold rounded-3xl bg-gradient-to-br from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 shadow-2xl transform transition hover:scale-105"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-7xl">🎮</span>
            <span>Игры</span>
          </div>
        </Button>
      </div>
    </div>
  );

  const renderLearning = () => {
    if (!learningCategory) {
      return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100">
          <Button
            size="lg"
            onClick={() => setScreen('home')}
            className="mb-8 text-2xl px-8 py-6 rounded-2xl"
          >
            <Icon name="Home" size={32} className="mr-2" />
            Домой
          </Button>

          <h2 className="text-5xl font-bold text-center mb-12 text-primary">Выбери тему</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card
              onClick={() => setLearningCategory('colors')}
              className="p-8 cursor-pointer hover:shadow-2xl transition transform hover:scale-105 rounded-3xl bg-white"
            >
              <div className="text-center space-y-4">
                <div className="text-8xl">🎨</div>
                <h3 className="text-3xl font-bold">Цвета</h3>
              </div>
            </Card>

            <Card
              onClick={() => setLearningCategory('shapes')}
              className="p-8 cursor-pointer hover:shadow-2xl transition transform hover:scale-105 rounded-3xl bg-white"
            >
              <div className="text-center space-y-4">
                <div className="text-8xl">⬛</div>
                <h3 className="text-3xl font-bold">Фигуры</h3>
              </div>
            </Card>

            <Card
              onClick={() => setLearningCategory('animals')}
              className="p-8 cursor-pointer hover:shadow-2xl transition transform hover:scale-105 rounded-3xl bg-white"
            >
              <div className="text-center space-y-4">
                <div className="text-8xl">🐾</div>
                <h3 className="text-3xl font-bold">Животные</h3>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    const data = learningData[learningCategory];

    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100">
        <Button
          size="lg"
          onClick={() => setLearningCategory(null)}
          className="mb-8 text-2xl px-8 py-6 rounded-2xl"
        >
          <Icon name="ArrowLeft" size={32} className="mr-2" />
          Назад
        </Button>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.map((item, index) => (
            <Card
              key={index}
              onClick={() => {
                setStars(prev => prev + 1);
              }}
              className="p-8 cursor-pointer hover:shadow-2xl transition transform hover:scale-105 rounded-3xl bg-white wiggle-on-click"
            >
              <div className="text-center space-y-4">
                <div className="text-9xl mb-4">{item.emoji}</div>
                <h3 className="text-3xl font-bold">{item.name}</h3>
                {'sound' in item && (
                  <p className="text-2xl text-muted-foreground">{item.sound}</p>
                )}
                {'desc' in item && (
                  <p className="text-xl text-muted-foreground">{item.desc}</p>
                )}
                {'color' in item && (
                  <div className={`h-16 rounded-2xl ${item.color} mx-auto`} />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderGames = () => (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100">
      <div className="flex justify-between items-center mb-8">
        <Button
          size="lg"
          onClick={() => setScreen('home')}
          className="text-2xl px-8 py-6 rounded-2xl"
        >
          <Icon name="Home" size={32} className="mr-2" />
          Домой
        </Button>

        <Button
          size="lg"
          onClick={initMemoryGame}
          className="text-2xl px-8 py-6 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500"
        >
          <Icon name="RotateCcw" size={32} className="mr-2" />
          Новая игра
        </Button>
      </div>

      <h2 className="text-5xl font-bold text-center mb-8 text-primary">Найди пару!</h2>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {gameCards.map((card) => (
          <Card
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square flex items-center justify-center text-7xl cursor-pointer transition transform hover:scale-105 rounded-3xl ${
              card.matched
                ? 'bg-green-200 border-4 border-green-500'
                : card.flipped
                ? 'bg-white'
                : 'bg-gradient-to-br from-purple-400 to-pink-400'
            }`}
          >
            {card.flipped || card.matched ? card.emoji : '❓'}
          </Card>
        ))}
      </div>

      {gameCards.length > 0 && gameCards.every(card => card.matched) && (
        <div className="text-center mt-12 space-y-6">
          <div className="text-9xl bounce-gentle">🎉</div>
          <h3 className="text-5xl font-bold text-primary">Молодец!</h3>
          <Button
            size="lg"
            onClick={initMemoryGame}
            className="text-3xl px-12 py-8 rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-500"
          >
            Ещё раз!
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {screen === 'home' && renderHome()}
      {screen === 'learning' && renderLearning()}
      {screen === 'games' && renderGames()}
    </>
  );
};

export default Index;
