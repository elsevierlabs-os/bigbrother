export const HEIGHT = 400;
export const WIDTH = 1500;

export const COLORS = [
    '#1abc9c',
    '#16a085',
    '#f1c40f',
    '#f39c12',
    '#2ecc71',
    '#27ae60',
    '#e67e22',
    '#d35400',
    '#3498db',
    '#2980b9',
    '#e74c3c',
    '#c0392b',
    '#9b59b6',
    '#8e44ad',
    '#34495e',
    '#2c3e50',
    '#95a5a6',
    '#7f8c8d'
];

export const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
