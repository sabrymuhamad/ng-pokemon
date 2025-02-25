# Pokemon App

This is a Pokémon app built with **Angular 19**, using the **PokeAPI** to display Pokémon details.

## 🚀 Features
- View a list of Pokemon with images
- Search for Pokemon by name
- Infinite scrolling to load more Pokemon
- View detailed Pokemon stats, abilities, and types

## 🛠️ Technologies Used
- **Angular 19** (CLI 19.1.8)
- **RxJS** for handling API responses
- **Tailwind CSS** for styling
- **Angular Materials** for UI Components
- **CDK Virtual Scroll** for performance optimization
- **PokeAPI** (https://pokeapi.co/)

## Project Structure
src/
│-- app/
│   │-- admin/pokemons              # Pokemon components
│   │-- shared/                     # Shared components
│   │-- services/                   # API services
│   │-- core/                       # Core components (header / footer)
│   │-- helpers/models/             # Interfaces & models
│   │-- helpers/interceptors/       # Interceptors
│   │-- helpers/enums/              # Enums
│-- assets/                         # scss
│-- styles.scss                      # Global styles


## 📦 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/sabrymuhamad/ng-pokemon.git
   cd ng-pokemon
