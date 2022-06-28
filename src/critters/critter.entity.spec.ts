import { Critter } from './critter.entity';

describe('Critter class', () => {
  it('should make a Critter with all fields', () => {
    const critter = new Critter(
      'Green Sea Turtle',
      'C. mydas has a dorsoventrally flattened body, a beaked head at the end of a short neck, and paddle-like arms well-adapted for swimming.[23] Adult green turtles grow to 1.5 metres (5 ft) long.[24] The average weight of mature individuals is 68–190 kg (150–419 lb) and the average carapace length is 78–112 cm (31–44 in).[25] Exceptional specimens can weigh 315 kg (694 lb) or even more, with the largest known C. mydas having weighed 395 kg (871 lb) and measured 153 cm (60 in) in carapace length.',
      'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20green%20turtle.jpg',
    );

    expect(critter).toBeTruthy();
    expect(critter.name).toBe('Green Sea Turtle');
    expect(critter.description).toBe(
      'C. mydas has a dorsoventrally flattened body, a beaked head at the end of a short neck, and paddle-like arms well-adapted for swimming.[23] Adult green turtles grow to 1.5 metres (5 ft) long.[24] The average weight of mature individuals is 68–190 kg (150–419 lb) and the average carapace length is 78–112 cm (31–44 in).[25] Exceptional specimens can weigh 315 kg (694 lb) or even more, with the largest known C. mydas having weighed 395 kg (871 lb) and measured 153 cm (60 in) in carapace length.',
    );
    expect(critter.imageUrl).toBe(
      'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20green%20turtle.jpg',
    );
  });
});
