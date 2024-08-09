/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('surfboards').del()
  await knex('surfboards').insert([
    {
      type: 'Shortboard',
      style: 'Performance',
      brand: 'Lost',
      model: 'Sub Buggy',
      length: '5\'8"',
      dimensions: '18 1/2" x 2 1/4"',
      volume: 25.25,
      fins: "Futures",
      description: 'High-performance shortboard',
      price: 250.00,
      quantity: 1,
      is_sold: false,
      image_url: 'https://momentsurfco.com/cdn/shop/products/lib-tech-6-0-sub-buggy__83282.1496543421.1000.1000.jpg?v=1658269872&width=640'
    },
    {
      type: 'Shortboard',
      style: 'Fish',
      brand: 'Coil',
      model: 'Fish',
      length: '5\'2"',
      dimensions: '19 1/2" x 2 1/2"',
      volume: 26,
      fins: "FCS",
      description: 'Lost Puddle Fish copy',
      price: 100.00,
      quantity: 1,
      is_sold: false
    },
    {
      type: 'Midlength',
      style: 'Funboard',
      brand: '7S',
      model: 'Super Fish',
      length: '6\'6"',
      dimensions: '20 3/4" x 2 3/4"',
      volume: 40.45,
      fins: "FCS1",
      description: 'Funboard with pulled in fish tail',
      price: 325.00,
      quantity: 1,
      is_sold: false
    },
    {
      type: 'Midlength',
      style: 'Performance',
      brand: 'Firewire',
      model: 'Creeper',
      length: '6\'4"',
      dimensions: '20 3/4" x 3"',
      volume: 44,
      fins: "Futures",
      description: '70s inspired board coupled with a curvy fuller outline',
      price: 300.00,
      quantity: 1,
      is_sold: false
    },
    {
      type: 'Longboard',
      style: 'Performance',
      brand: 'RJs',
      model: 'Performance',
      length: '9\'0"',
      dimensions: '22 1/2" x 2 1/4"',
      volume: 55.0,
      fins: "Single",
      description: 'All round performance longboard',
      price: 150.00,
      quantity: 1,
      is_sold: false
    },
    {
      type: 'Longboard',
      style: 'Softtop',
      brand: 'Costco',
      model: 'Wavestorm', 
      length: '8\'0"',
      dimensions: '22 1/2" x 3 1/4"',
      volume: 81.0,
      fins: "Single",
      description: 'Rasta Colors, disposable softtop from Costco',
      price: 100.00,
      quantity: 1,
      is_sold: false
    },
  ]);
};