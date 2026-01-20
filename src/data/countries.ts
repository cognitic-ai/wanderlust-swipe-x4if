export interface Country {
  id: string;
  name: string;
  flag: string;
  description: string;
  capital: string;
  region: string;
  highlights: string[];
}

export const countries: Country[] = [
  {
    id: '1',
    name: 'Japan',
    flag: '🇯🇵',
    description: 'Land of the Rising Sun',
    capital: 'Tokyo',
    region: 'Asia',
    highlights: ['Mount Fuji', 'Cherry Blossoms', 'Ancient Temples', 'Cutting-edge Technology'],
  },
  {
    id: '2',
    name: 'Italy',
    flag: '🇮🇹',
    description: 'Cradle of the Renaissance',
    capital: 'Rome',
    region: 'Europe',
    highlights: ['Colosseum', 'Venice Canals', 'Tuscan Countryside', 'World-class Cuisine'],
  },
  {
    id: '3',
    name: 'New Zealand',
    flag: '🇳🇿',
    description: 'Land of the Long White Cloud',
    capital: 'Wellington',
    region: 'Oceania',
    highlights: ['Milford Sound', 'Adventure Sports', 'Hobbiton', 'Pristine Nature'],
  },
  {
    id: '4',
    name: 'Iceland',
    flag: '🇮🇸',
    description: 'Land of Fire and Ice',
    capital: 'Reykjavik',
    region: 'Europe',
    highlights: ['Northern Lights', 'Blue Lagoon', 'Glaciers', 'Volcanic Landscapes'],
  },
  {
    id: '5',
    name: 'Brazil',
    flag: '🇧🇷',
    description: 'Heart of South America',
    capital: 'Brasília',
    region: 'South America',
    highlights: ['Amazon Rainforest', 'Carnival', 'Beaches', 'Christ the Redeemer'],
  },
  {
    id: '6',
    name: 'Morocco',
    flag: '🇲🇦',
    description: 'Gateway to Africa',
    capital: 'Rabat',
    region: 'Africa',
    highlights: ['Sahara Desert', 'Marrakech Markets', 'Blue City', 'Moroccan Cuisine'],
  },
  {
    id: '7',
    name: 'Thailand',
    flag: '🇹🇭',
    description: 'Land of Smiles',
    capital: 'Bangkok',
    region: 'Asia',
    highlights: ['Tropical Islands', 'Buddhist Temples', 'Street Food', 'Elephant Sanctuaries'],
  },
  {
    id: '8',
    name: 'Canada',
    flag: '🇨🇦',
    description: 'The Great White North',
    capital: 'Ottawa',
    region: 'North America',
    highlights: ['Niagara Falls', 'Rocky Mountains', 'Maple Syrup', 'Northern Wilderness'],
  },
  {
    id: '9',
    name: 'Greece',
    flag: '🇬🇷',
    description: 'Birthplace of Democracy',
    capital: 'Athens',
    region: 'Europe',
    highlights: ['Ancient Ruins', 'Santorini Sunsets', 'Greek Islands', 'Mediterranean Cuisine'],
  },
  {
    id: '10',
    name: 'Peru',
    flag: '🇵🇪',
    description: 'Home of the Incas',
    capital: 'Lima',
    region: 'South America',
    highlights: ['Machu Picchu', 'Amazon Basin', 'Lake Titicaca', 'Ancient History'],
  },
];
