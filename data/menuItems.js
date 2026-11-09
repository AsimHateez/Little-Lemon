export const CATEGORIES = [
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
];

export const MENU_ITEMS = [
  {
    id: '1',
    name: 'Greek Salad',
    description:
      'Our delicious salad is served with Feta cheese and peeled cucumber. Includes tomatoes, onions, olives, salt and oregano in the ingredients.',
    price: 12.99,
    category: 'starters',
    image: require('../assets/images/dishes/greek-salad.jpg'),
  },
  {
    id: '2',
    name: 'Bruschetta',
    description:
      'Delicious grilled bread rubbed with garlic and topped with olive oil and salt. Our Bruschetta includes tomato and cheese.',
    price: 7.99,
    category: 'starters',
    image: require('../assets/images/dishes/bruschetta.jpg'),
  },
  {
    id: '3',
    name: 'Grilled Fish',
    description:
      'Fantastic grilled fish seasoned with salt, served with lemon wedges and fresh herbs.',
    price: 20.0,
    category: 'mains',
    image: require('../assets/images/dishes/grilled-fish.jpg'),
  },
  {
    id: '4',
    name: 'Pasta',
    description:
      'Delicious penne pasta with fried aubergines, cherry tomatoes, tomato sauce, fresh chilli, garlic, basil and salted ricotta cheese.',
    price: 6.99,
    category: 'mains',
    image: require('../assets/images/dishes/pasta.jpg'),
  },
  {
    id: '5',
    name: 'Lemon Dessert',
    description:
      "You can't go wrong with this delicious lemon dessert, a homemade Italian lemon and ricotta cake.",
    price: 4.99,
    category: 'desserts',
    image: require('../assets/images/dishes/lemon-dessert.jpg'),
  },
  {
    id: '6',
    name: 'Iced Tea',
    description: 'Freshly brewed black tea served over ice with a slice of lemon.',
    price: 3.99,
    category: 'drinks',
    image: require('../assets/images/dishes/iced-tea.jpg'),
  },
  {
    id: '7',
    name: 'Lemonade',
    description: 'Freshly squeezed lemons with a touch of mint, served ice cold.',
    price: 4.49,
    category: 'drinks',
    image: require('../assets/images/dishes/lemonade.jpg'),
  },
];
