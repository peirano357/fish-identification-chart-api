import { Region } from './region.entity';

describe('Region class', () => {
  it('Should make a region with all fields', () => {
    const region = new Region(
      'Cozumel',
      'The sunny island of Cozumel is home to lush walls, protected reefs and some of the speediest drifts in the world, perfect for every level of diver, from first divers to tec divers. In particular, Cozumel is currently ranked as one of the top ten places for advanced diving. Cozumel offers a selection of spectacular dive spots like the Santa Rosa Wall, Palancar Garden, Columbia Reef and many more featuring vivid marine life, thriving coral reefs and a whole range of exciting and unique undersea sights-all beneath the calmest, clearest waters imaginable.',
      'https://raw.githubusercontent.com/peirano357/fic-images/main/region-cozumel.jpg',
    );

    expect(region).toBeTruthy();
    expect(region.name).toBe('Cozumel');
    expect(region.description).toBe(
      'The sunny island of Cozumel is home to lush walls, protected reefs and some of the speediest drifts in the world, perfect for every level of diver, from first divers to tec divers. In particular, Cozumel is currently ranked as one of the top ten places for advanced diving. Cozumel offers a selection of spectacular dive spots like the Santa Rosa Wall, Palancar Garden, Columbia Reef and many more featuring vivid marine life, thriving coral reefs and a whole range of exciting and unique undersea sights-all beneath the calmest, clearest waters imaginable.',
    );
    expect(region.imageUrl).toBe(
      'https://raw.githubusercontent.com/peirano357/fic-images/main/region-cozumel.jpg',
    );
  });
});
