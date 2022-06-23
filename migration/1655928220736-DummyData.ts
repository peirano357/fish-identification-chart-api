import { Critter } from 'src/critters/critter.entity';
import { Region } from 'src/regions/region.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class DummyData1655928220736 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // dummy Region #1
    let repository = queryRunner.connection.getRepository(Region);
    await repository.save({
      name: 'Cozumel',
      description:
        'The sunny island of Cozumel is home to lush walls, protected reefs and some of the speediest drifts in the world, perfect for every level of diver, from first divers to tec divers. In particular, Cozumel is currently ranked as one of the top ten places for advanced diving. Cozumel offers a selection of spectacular dive spots like the Santa Rosa Wall, Palancar Garden, Columbia Reef and many more featuring vivid marine life, thriving coral reefs and a whole range of exciting and unique undersea sights-all beneath the calmest, clearest waters imaginable.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/region-cozumel.jpg',
    });

    // dummy Region #2
    repository = queryRunner.connection.getRepository(Region);
    await repository.save({
      name: 'Bahamas',
      description:
        'The 700 islands of the Bahamas welcome you with their gorgeous tropical, waters. Dive into the Bahamas to meet a variety of sharks and explore amazing wrecks. ',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/region-bahamas.jpg',
    });

    // dummy Critter #1
    repository = queryRunner.connection.getRepository(Critter);
    await repository.save({
      name: 'HammerHead Shark',
      description:
        'The known species range from 0.9 to 6.0 m (2 ft 11 in to 19 ft 8 in) in length and weigh from 3 to 580 kg (6.6 to 1,300 lb).[3][4] They are usually light gray and have a greenish tint. Their bellies are white, which allows them to blend into the background when viewed from below and sneak up to their prey.[5] Their heads have lateral projections that give them a hammer-like shape.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20hammerhead.jpg',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
