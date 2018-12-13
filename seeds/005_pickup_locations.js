exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('pickup_locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('pickup_locations').insert([
        { streetAddress: '1313 College Ave, Boulder, CO 80302', locationName: 'UNIV. HILL CHEBA HUT'},
        { streetAddress: '1744 E Evans Ave, Denver, CO', locationName: 'DU ILLEGAL PETE’S'},
        { streetAddress: '638 East Colfax Avenue, Denver, CO 80203', locationName: 'COLFAX CAP HILL CHEBA HUT'},
        { streetAddress: '1531 Champa St, Denver, CO 80202', locationName: 'CHAMPA DOWNTOWN CHEBA HUT'},
        { streetAddress: '3001 Walnut St, Denver, CO 80205', locationName: 'RiNo EPIC BREWING'},
        { streetAddress: '635 Main St., Longmont, CO 80501, CO 80202', locationName: 'MAIN ST. CHEBA HUT'},
        { streetAddress: '320 Walnut, Fort Collins, CO', locationName: 'OLD TOWN ILLEGAL PETE’S'},
      ])
    })
    .then(() => {
      return knex.raw("SELECT setval('pickup_locations_id_seq', (SELECT MAX(id) FROM pickup_locations))")
    })
};
