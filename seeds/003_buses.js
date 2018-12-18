exports.seed = (knex) => {
  // Delete all existing entries
  return knex('buses').del()
  .then(() => {
    // Inserts seed entries
    return knex('buses').insert([
      { capacity: 54, name: "Shai-Hulud", busCode: "99-7" },
      { capacity: 49, name: "Connie", busCode: "740" },
      { capacity: 54, name: "Janet", busCode: "51" },
      { capacity: 49, name: "Taraza", busCode: "1046" },
      { capacity: 50, name: "9790", busCode: "9790" },
      { capacity: 54, name: "Beauty", busCode: "7" },
      { capacity: 49, name: "Akira", busCode: "1049" },
      { capacity: 54, name: "Bingo", busCode: "B42" },
      { capacity: 54, name: "Ziggy Stardust", busCode: "102" },
      { capacity: 54, name: "Ygritte", busCode: "B41" },
      { capacity: 50, name: "Cougz", busCode: "112" },
      { capacity: 49, name: "Odrade", busCode: "1048" },
      { capacity: 20, name: "Echo", busCode: "N/A" },
      { capacity: 45, name: "Tatanka", busCode: "355" },
      { capacity: 54, name: "Arise", busCode: "1076" },
      { capacity: 54, name: "Muad'dib", busCode: "1" },
      { capacity: 50, name: "Crown", busCode: "88" },
      { capacity: 58, name: "Ghanima", busCode: "26" },
      { capacity: 54, name: "Le Phoenix", busCode: "20" },
      { capacity: 53, name: "Leto II AKA The Tyrant (Lay-toe)", busCode: "25" },
      { capacity: 54, name: "Nymeria", busCode: "301" },
      { capacity: 49, name: "Wolfgang", busCode: "1054" },
      { capacity: 54, name: "Dragon Wagon", busCode: "1075" },
      { capacity: 44, name: "Clementine", busCode: "195" },
      { capacity: 50, name: "Genny", busCode: "18" }
    ])
  })
  .then(() => {
    return knex.raw("SELECT setval('buses_id_seq', (SELECT MAX(id) FROM buses))")
  })
}
