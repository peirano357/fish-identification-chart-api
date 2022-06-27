import { CritterRegion } from 'src/critters-region/critter-region.entity';
import { Critter } from 'src/critters/critter.entity';
import { Region } from 'src/regions/region.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class DummyData1655928220736 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // dummy Region #1
    let repository = queryRunner.connection.getRepository(Region);
    const region1 = await repository.save({
      name: 'Cozumel',
      description:
        'The sunny island of Cozumel is home to lush walls, protected reefs and some of the speediest drifts in the world, perfect for every level of diver, from first divers to tec divers. In particular, Cozumel is currently ranked as one of the top ten places for advanced diving. Cozumel offers a selection of spectacular dive spots like the Santa Rosa Wall, Palancar Garden, Columbia Reef and many more featuring vivid marine life, thriving coral reefs and a whole range of exciting and unique undersea sights-all beneath the calmest, clearest waters imaginable.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/region-cozumel.jpg',
    });

    // region1.id (id Cozumel)

    // dummy Region #2
    repository = queryRunner.connection.getRepository(Region);
    const region2 = await repository.save({
      name: 'Bahamas',
      description:
        'The 700 islands of the Bahamas welcome you with their gorgeous tropical, waters. Dive into the Bahamas to meet a variety of sharks and explore amazing wrecks. ',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/region-bahamas.jpg',
    });

    // region1.id (id Cozumel)

    // dummy Critter #1
    let repositoryC = queryRunner.connection.getRepository(Critter);
    const critter1 = await repositoryC.save({
      name: 'HammerHead Shark',
      description:
        'The known species range from 0.9 to 6.0 m (2 ft 11 in to 19 ft 8 in) in length and weigh from 3 to 580 kg (6.6 to 1,300 lb).[3][4] They are usually light gray and have a greenish tint. Their bellies are white, which allows them to blend into the background when viewed from below and sneak up to their prey.[5] Their heads have lateral projections that give them a hammer-like shape.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20hammerhead.jpg',
    });

    // dummy Critter #2
    repositoryC = queryRunner.connection.getRepository(Critter);
    const critter2 = await repositoryC.save({
      name: 'Great Barracuda',
      description:
        'Great barracudas are large fish, and one of the largest of the Barracudas. Mature specimens are usually around 60–100 cm (24–39 in) in length and weigh 2.5–9.0 kg (5.5–19.8 lb). Exceptionally large specimens can exceed 1.5 m (4.9 ft) and weigh over 23 kg (51 lb). ',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20barracuda.jpg',
    });

    // dummy Critter #3
    repositoryC = queryRunner.connection.getRepository(Critter);
    const critter3 = await repositoryC.save({
      name: 'Bull Shark',
      description:
        'The bull shark can be up to 81 cm (2 ft 8 in) in length at birth.[11] Adult female bull sharks average 2.4 m (8 ft) long and typically weigh 130 kg (290 lb), whereas the slightly smaller adult male averages 2.25 m (7 ft) and 95 kg (209 lb). While a maximum size of 3.5 m (11 ft) is commonly reported, a single record exists of a female specimen of exactly 4.0 m (13 ft).[4][12][13] Bull sharks are wider and heavier than other requiem sharks of comparable length, and are grey on top and white below.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20bullshark.jpg',
    });

    // dummy Critter #4
    repositoryC = queryRunner.connection.getRepository(Critter);
    const critter4 = await repositoryC.save({
      name: 'Angelfish',
      description:
        'Pomacanthus semicirculatus is a vibrant, electric blue color with black and white stripes and sometimes spots as a juvenile. It turns a grayish color with dark spots and sometimes yellow and blue accents as an adult.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20Angelfish.JPG',
    });

    // dummy Critter #5
    repositoryC = queryRunner.connection.getRepository(Critter);
    const critter5 = await repositoryC.save({
      name: 'Gray Angelfish',
      description:
        'Pomacanthus semicirculatus is a vibrant, electric blue color with black and white stripes and sometimes spots as a juvenile. It turns a grayish color with dark spots and sometimes yellow and blue accents as an adult.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20Gray%20Angelfish.JPG',
    });

    // dummy Critter #6
    repositoryC = queryRunner.connection.getRepository(Critter);
    const critter6 = await repositoryC.save({
      name: 'Clownfish',
      description:
        'Thirty species are recognized: one in the genus Premnas, while the remaining are in the genus Amphiprion. In the wild, they all form symbiotic mutualisms with sea anemones. Depending on species, anemonefish are overall yellow, orange, or a reddish or blackish color, and many show white bars or patches. The largest can reach a length of 17 cm (6+1⁄2 in), while the smallest barely achieve 7–8 cm (2+3⁄4–3+1⁄4 in).',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20Clownfish.JPG',
    });

    // dummy Critter #7
    repositoryC = queryRunner.connection.getRepository(Critter);
    const critter7 = await repositoryC.save({
      name: 'Eagle Ray',
      description:
        'Eagle rays feed on mollusks and crustaceans, crushing their shells with their flattened teeth. They are excellent swimmers and are able to breach the water up to several metres above the surface. Compared with other rays, they have long tails, and well-defined, rhomboidal bodies. They are ovoviviparous, giving birth to up to six young at a time. They range from 0.48 to 5.1 m (1.6 to 16.7 ft) in length and 7 m (23 ft) in wingspan.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20Eagle%20Ray.JPG',
    });

    // dummy Critter #8
    repositoryC = queryRunner.connection.getRepository(Critter);
    const critter8 = await repositoryC.save({
      name: 'French Grunt',
      description:
        'H. flavolineatum has an almond-shaped body, which is compressed and ends in a blunt snout. The small to medium-sized mouth has thick lips and has narrow bands of teeth on each jaw, the outer line of teeth being conical in shape, and no teeth on the roof of the mouth.[3] It has a continuous dorsal fin with a small to medium-sized notch.[4] The dorsal fin contains 12 spines and 14-15 soft rays while the anal fin contains 3 spines and 8 soft rays.[2] It has an overall colour of whitish to bluish or yellowish with marked with three vivid yellow to orange horizontal stripes, above the lateral line and a number of oblique similarly coloured stripes below the lateral line.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20Frech%20Grunt.JPG',
    });

    // dummy Critter #9
    repositoryC = queryRunner.connection.getRepository(Critter);
    const critter9 = await repositoryC.save({
      name: 'Hawksbill Sea Turtle',
      description:
        'Its appearance is similar to that of other marine turtles. In general, it has a flattened body shape, a protective carapace, and flipper-like limbs, adapted for swimming in the open ocean. E. imbricata is easily distinguished from other sea turtles by its sharp, curving beak with prominent tomium, and the saw-like appearance of its shell margins. Hawksbill shells slightly change colors, depending on water temperature.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20Hawskbill%20Turtle.JPG',
    });

    // dummy Critter #10
    repositoryC = queryRunner.connection.getRepository(Critter);
    const critter10 = await repositoryC.save({
      name: 'Moray Eel',
      description:
        'The dorsal fin extends from just behind the head along the back and joins seamlessly with the caudal and anal fins. Most species lack pectoral and pelvic fins, adding to their serpentine appearance. Their eyes are rather small; morays rely mostly on their highly developed sense of smell, lying in wait to ambush prey.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20Moray%20Eel.JPG',
    });

    // dummy Critter #11
    repositoryC = queryRunner.connection.getRepository(Critter);
    const critter11 = await repositoryC.save({
      name: 'Porcupine Fish',
      description:
        'Porcupinefish have the ability to inflate their bodies by swallowing water or air, thereby becoming rounder. This increase in size (almost double vertically) reduces the range of potential predators to those with much bigger mouths. A second defense mechanism is provided by the sharp spines, which radiate outwards when the fish is inflated. Some species are poisonous, having tetrodotoxin in their internal organs, such as the ovaries and liver. This neurotoxin is at least 1200 times more potent than cyanide.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20porcupine%20fish.jpg',
    });

    // dummy Critter #12
    repositoryC = queryRunner.connection.getRepository(Critter);
    const critter12 = await repositoryC.save({
      name: 'Sea Urchin',
      description:
        'Urchins typically range in size from 3 to 10 cm (1 to 4 in), although the largest species can reach up to 36 cm (14 in).[4] They have a rigid, usually spherical body bearing moveable spines, which gives the class the name Echinoidea (from the Greek ἐχῖνος ekhinos -spine-).[5] The name urchin is an old word for hedgehog, which sea urchins resemble; they have archaically been called sea hedgehogs.',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20Sea%20Urchin.JPG',
    });

    // dummy Critter #13
    repositoryC = queryRunner.connection.getRepository(Critter);
    const critter13 = await repositoryC.save({
      name: 'Sea Horse',
      description:
        'Seahorses range in size from 1.5 to 35.5 cm (5⁄8 to 14 in).[10] They are named for their equine appearance, with bent necks and long snouted heads and a distinctive trunk and tail. Although they are bony fish, they do not have scales, but rather thin skin stretched over a series of bony plates, which are arranged in rings throughout their bodies. Each species has a distinct number of rings.[11] The armor of bony plates also protects them against predators,[12] and because of this outer skeleton, they no longer have ribs.[13] Seahorses swim upright, propelling themselves using the dorsal fin, another characteristic not shared by their close pipefish relatives, which swim horizontally. Razorfish are the only other fish that swim vertically. ',
      imageUrl:
        'https://raw.githubusercontent.com/peirano357/fic-images/main/critter%20-%20Seahorse.JPG',
    });

    // Assign critters 1-13 to region 1
    let repositoryCR = queryRunner.connection.getRepository(CritterRegion);
    await repositoryCR.save({
      regionId: region1.id,
      critterId: critter1.id,
      sort: 1,
    });

    repositoryCR = queryRunner.connection.getRepository(CritterRegion);
    await repositoryCR.save({
      regionId: region1.id,
      critterId: critter2.id,
      sort: 2,
    });

    repositoryCR = queryRunner.connection.getRepository(CritterRegion);
    await repositoryCR.save({
      regionId: region1.id,
      critterId: critter3.id,
      sort: 3,
    });

    repositoryCR = queryRunner.connection.getRepository(CritterRegion);
    await repositoryCR.save({
      regionId: region1.id,
      critterId: critter4.id,
      sort: 4,
    });

    repositoryCR = queryRunner.connection.getRepository(CritterRegion);
    await repositoryCR.save({
      regionId: region1.id,
      critterId: critter5.id,
      sort: 5,
    });

    repositoryCR = queryRunner.connection.getRepository(CritterRegion);
    await repositoryCR.save({
      regionId: region1.id,
      critterId: critter6.id,
      sort: 6,
    });

    repositoryCR = queryRunner.connection.getRepository(CritterRegion);
    await repositoryCR.save({
      regionId: region1.id,
      critterId: critter7.id,
      sort: 7,
    });

    repositoryCR = queryRunner.connection.getRepository(CritterRegion);
    await repositoryCR.save({
      regionId: region1.id,
      critterId: critter8.id,
      sort: 8,
    });

    repositoryCR = queryRunner.connection.getRepository(CritterRegion);
    await repositoryCR.save({
      regionId: region1.id,
      critterId: critter9.id,
      sort: 9,
    });

    repositoryCR = queryRunner.connection.getRepository(CritterRegion);
    await repositoryCR.save({
      regionId: region1.id,
      critterId: critter10.id,
      sort: 10,
    });

    repositoryCR = queryRunner.connection.getRepository(CritterRegion);
    await repositoryCR.save({
      regionId: region1.id,
      critterId: critter11.id,
      sort: 11,
    });

    repositoryCR = queryRunner.connection.getRepository(CritterRegion);
    await repositoryCR.save({
      regionId: region1.id,
      critterId: critter12.id,
      sort: 12,
    });

    repositoryCR = queryRunner.connection.getRepository(CritterRegion);
    await repositoryCR.save({
      regionId: region1.id,
      critterId: critter13.id,
      sort: 13,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
