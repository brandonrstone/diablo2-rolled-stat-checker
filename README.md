# Diablo II Rolled Stat Checker

## Author

[Brandon Stone](https://github.com/brandonrstone)

A modern tool for analyzing, searching, and comparing Diablo II: Resurrected item stats, including Set Items, Unique Items, and Runewords. This project helps you quickly determine the value and roll range of your items, and provides advanced filtering and display options for all supported item types.

## Features

- **Stat Extraction:** Parses and displays all variable and fixed stats for Set Items, Unique Items, and Runewords.
- **Roll Range Detection:** Clearly shows min/max rolls and highlights perfect or near-perfect stats.
- **Advanced Search:** Search by item name, type, runes, stats, and more.
- **Modern UI:** Fast, responsive React interface with dark mode support.
- **Data Normalization:** Cleans and standardizes item data for accurate display and searching.
- **Scripted Data Processing:** Includes scripts to clean, normalize, and migrate item data files.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

```bash
git clone https://github.com/yourusername/diablo2-rolled-stat-checker.git
cd diablo2-rolled-stat-checker
yarn install
# or
npm install
```

### Running the App

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

- **Data Cleanup:**  
  Scripts in `scripts/` help normalize and clean up item data files.  
  Example:
  ```bash
  ts-node scripts/removeEqualMaxKeysSetItems.ts
  ts-node scripts/consolidateItemTypesRunewords.ts
  ```

## Project Structure

- `src/data/` — Item data files (SetItems, UniqueItems, Runewords)
- `src/components/` — React components for item display and search
- `src/lib/` — Stat extraction and utility functions
- `scripts/` — Node.js scripts for data normalization and migration

## Item Icon Mapping

Item cards now support icons out of the box. The app auto-generates an `imageUrl` for each item by slugifying the item name:

- Unique items: `public/item-icons/unique/<item-name-slug>.png`
- Set items: `public/item-icons/set/<item-name-slug>.png`
- Rune icons (for runeword cards): `public/item-icons/runes/<rune-name-lowercase>.png`

Example:

- `Tal Rasha's Lidless Eye` -> `public/item-icons/set/tal-rasha-s-lidless-eye.png`
- `Jah` rune -> `public/item-icons/runes/jah.png`

If a file is missing or fails to load, the card gracefully hides the icon and still renders stats normally.

## Contributing

Pull requests and suggestions are welcome! Please open an issue or PR for any improvements or bug fixes.

## License

MIT

---

*This project is not affiliated with or endorsed by Blizzard Entertainment. Diablo II and all related terms are trademarks of Blizzard Entertainment, Inc.*
