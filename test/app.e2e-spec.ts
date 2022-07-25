import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, LoggerService } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection } from 'typeorm';
import { date } from '@hapi/joi';

class TestLogger implements LoggerService {
  log(message: string) {}
  error(message: string, trace: string) {}
  warn(message: string) {}
  debug(message: string) {}
  verbose(message: string) {}
}

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(new TestLogger());
    await app.init();

    // tip: access the database connection via
    //const connection = app.get(Connection)
    //const a = connection.manager

    if (process.env.NODE_ENV === 'test') {
      const connection = app.get(Connection);
      await connection.synchronize(true);
      //await loadFixtures('data', connection);
    }
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  describe('Authentication, Administrator and Customer', () => {
    let jwtToken: string;
    let critterId: string;
    let regionId: string;
    let adminUserId: string;
    let diverUserId: string;
    let notAddedCritterId: string;
    let notPurchasedRegionId: string;

    describe('Authentication ', () => {
      it('Signs up user as test@example.com, Password357, administrator', async () => {
        await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            username: 'test@example.com',
            password: 'Password357',
            userType: 'administrator',
          })
          .expect(201);
      });

      // assume test data includes user test@example.com with password 'Password357'
      it('Authenticates user with valid credentials and provides a jwt token', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signin')
          .send({ username: 'test@example.com', password: 'Password357' })
          .expect(201);

        // set jwt token for use in subsequent tests
        jwtToken = response.body.accessToken;
        expect(jwtToken).toMatch(
          /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
        ); // jwt regex
      });

      it('Fails to authenticate user with an incorrect password', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signin')
          .send({ username: 'test@example.com', password: 'wrong' })
          .expect(401);

        expect(response.body.accessToken).not.toBeDefined();
      });

      // assume test data does not include a nobody@example.com user
      it('Fails to authenticate user that does not exist', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signin')
          .send({ username: 'nobody@example.com', password: 'test' })
          .expect(401);

        expect(response.body.accessToken).not.toBeDefined();
      });
    });

    describe('Protected Adminsitrator´s tasks', () => {
      it('Gets protected resource with jwt authenticated request', async () => {
        await request(app.getHttpServer())
          .get('/critters')
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);
      });

      it('Creates a new critter as administrator with jwt authenticated request', async () => {
        const response = await request(app.getHttpServer())
          .post('/critters')
          .send({
            name: 'Great White Shark',
            description:
              'Male great whites on average measure 3.4 to 4.0 m (11 to 13 ft) long, while females at 4.6 to 4.9 m (15 to 16 ft).[6] Adults of this species weigh 522–771 kg (1,151–1,700 lb) on average;[59] however, mature females can have an average mass of 680–1,110 kg (1,500–2,450 lb).[4] The largest females have been verified up to 6.1 m (20 ft) in length and an estimated 1,905 kg (4,200 lb) in weight,[4] perhaps up to 2,268 kg (5,000 lb).',
            imageUrl:
              'https://i.pinimg.com/originals/28/06/86/280686f2de7aadbd72e01c4aefee480a.jpg',
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(201);

        const data = response.body;
        expect(data.name).toBe('Great White Shark');
        expect(data.description).toBe(
          'Male great whites on average measure 3.4 to 4.0 m (11 to 13 ft) long, while females at 4.6 to 4.9 m (15 to 16 ft).[6] Adults of this species weigh 522–771 kg (1,151–1,700 lb) on average;[59] however, mature females can have an average mass of 680–1,110 kg (1,500–2,450 lb).[4] The largest females have been verified up to 6.1 m (20 ft) in length and an estimated 1,905 kg (4,200 lb) in weight,[4] perhaps up to 2,268 kg (5,000 lb).',
        );
        expect(data.imageUrl).toBe(
          'https://i.pinimg.com/originals/28/06/86/280686f2de7aadbd72e01c4aefee480a.jpg',
        );

        critterId = data.id;
      });

      it('Creates (another, for further use) new critter as administrator with jwt authenticated request', async () => {
        const response = await request(app.getHttpServer())
          .post('/critters')
          .send({
            name: 'Great White Shark',
            description:
              'Male great whites on average measure 3.4 to 4.0 m (11 to 13 ft) long, while females at 4.6 to 4.9 m (15 to 16 ft).[6] Adults of this species weigh 522–771 kg (1,151–1,700 lb) on average;[59] however, mature females can have an average mass of 680–1,110 kg (1,500–2,450 lb).[4] The largest females have been verified up to 6.1 m (20 ft) in length and an estimated 1,905 kg (4,200 lb) in weight,[4] perhaps up to 2,268 kg (5,000 lb).',
            imageUrl:
              'https://i.pinimg.com/originals/28/06/86/280686f2de7aadbd72e01c4aefee480a.jpg',
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(201);

        const data = response.body;
        expect(data.name).toBe('Great White Shark');
        expect(data.description).toBe(
          'Male great whites on average measure 3.4 to 4.0 m (11 to 13 ft) long, while females at 4.6 to 4.9 m (15 to 16 ft).[6] Adults of this species weigh 522–771 kg (1,151–1,700 lb) on average;[59] however, mature females can have an average mass of 680–1,110 kg (1,500–2,450 lb).[4] The largest females have been verified up to 6.1 m (20 ft) in length and an estimated 1,905 kg (4,200 lb) in weight,[4] perhaps up to 2,268 kg (5,000 lb).',
        );
        expect(data.imageUrl).toBe(
          'https://i.pinimg.com/originals/28/06/86/280686f2de7aadbd72e01c4aefee480a.jpg',
        );

        notAddedCritterId = data.id;
      });

      it('Creates a new region chart as administrator with jwt authenticated request', async () => {
        const response = await request(app.getHttpServer())
          .post('/regions')
          .send({
            name: 'Australia',
            description:
              'The Great Barrier Reef is the world´s largest coral reef system composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres (1,400 mi) over an area of approximately 344,400 square kilometres (133,000 sq mi). The reef is located in the Coral Sea, off the coast of Queensland, Australia, separated from the coast by a channel 100 miles wide in places and over 200 feet deep. The Great Barrier Reef can be seen from outer space and is the world´s biggest single structure made by living organisms.',
            imageUrl:
              'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/06/23/thumbs/800x531/123837.jpg',
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(201);

        const data = response.body;
        expect(data.name).toBe('Australia');
        expect(data.description).toBe(
          'The Great Barrier Reef is the world´s largest coral reef system composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometres (1,400 mi) over an area of approximately 344,400 square kilometres (133,000 sq mi). The reef is located in the Coral Sea, off the coast of Queensland, Australia, separated from the coast by a channel 100 miles wide in places and over 200 feet deep. The Great Barrier Reef can be seen from outer space and is the world´s biggest single structure made by living organisms.',
        );
        expect(data.imageUrl).toBe(
          'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/06/23/thumbs/800x531/123837.jpg',
        );

        regionId = data.id;
      });

      it('Creates (another, for further use) new region chart as administrator with jwt authenticated request', async () => {
        const response = await request(app.getHttpServer())
          .post('/regions')
          .send({
            name: 'Mediterranean Sea',
            description:
              'The Mediterranean Sea has an average depth of 1,500 m (4,900 ft) and the deepest recorded point is 5,267 m (17,280 ft) in the Calypso Deep in the Ionian Sea. It lies between latitudes 30° and 46° N and longitudes 6° W and 36° E. Its west–east length, from the Strait of Gibraltar to the Gulf of Iskenderun, on the southeastern coast of Turkey, is about 4,000 kilometres (2,500 mi). The north–south length varies greatly between different shorelines and whether only straight routes are considered.',
            imageUrl:
              'https://www.worldatlas.com/r/w1200/upload/79/5c/5d/shutterstock-587268482.jpg',
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(201);

        const data = response.body;
        expect(data.name).toBe('Mediterranean Sea');
        expect(data.description).toBe(
          'The Mediterranean Sea has an average depth of 1,500 m (4,900 ft) and the deepest recorded point is 5,267 m (17,280 ft) in the Calypso Deep in the Ionian Sea. It lies between latitudes 30° and 46° N and longitudes 6° W and 36° E. Its west–east length, from the Strait of Gibraltar to the Gulf of Iskenderun, on the southeastern coast of Turkey, is about 4,000 kilometres (2,500 mi). The north–south length varies greatly between different shorelines and whether only straight routes are considered.',
        );
        expect(data.imageUrl).toBe(
          'https://www.worldatlas.com/r/w1200/upload/79/5c/5d/shutterstock-587268482.jpg',
        );

        notPurchasedRegionId = data.id;
      });

      it('Adds a created criter to a created region chart as administrator with jwt authenticated request', async () => {
        const response = await request(app.getHttpServer())
          .post(`/critters/${critterId}/region`)
          .send({
            critterId: critterId,
            regionId: regionId,
            sort: 1,
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(201);

        const data = response.body;
        expect(data.critterId).toBe(critterId);
        expect(data.regionId).toBe(regionId);
        expect(data.sort).toBe(1);
      });

      it('Creates a customer user (diver) as an administrator with jwt authenticated request', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            username: 'testDiver@example.com',
            password: 'Password357',
            userType: 'customer',
          })
          .expect(201);

        const data = response.body;
        expect(data.username).toBe('testDiver@example.com');
        expect(data.userType).toBe('customer');

        diverUserId = data.id;
      });

      it('Purchases a region chart for a customer (diver) as administrator with jwt authenticated request', async () => {
        const response = await request(app.getHttpServer())
          .post(`/purchases`)
          .send({
            userId: diverUserId,
            regionId: regionId,
            purchasedDate: new Date(),
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(201);

        const data = response.body;
        expect(data.userId).toBe(diverUserId);
        expect(data.regionId).toBe(regionId);
      });
    });

    ////////
    describe('Customer user (diver) actions ', () => {
      // assume test data includes user test@example.com with password 'Password357'
      it('Authenticates user with valid credentials and provides a jwt token', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signin')
          .send({ username: 'testDiver@example.com', password: 'Password357' })
          .expect(201);

        // set jwt token for use in subsequent tests
        jwtToken = response.body.accessToken;
        expect(jwtToken).toMatch(
          /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
        ); // jwt regex
      });

      it('Marks a critter as spotted by customer (diver), for a region that is purchased for that user (with jwt authenticated request)', async () => {
        const response = await request(app.getHttpServer())
          .post(`/spots`)
          .send({
            critterId: critterId,
            userId: diverUserId,
            latitude: -33.868857,
            longitude: 151.206079,
            spottedDate: new Date(),
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(201);

        const data = response.body;
        expect(data.critterId).toBe(critterId);
        expect(data.userId).toBe(diverUserId);
        expect(data.latitude).toBe(-33.868857);
        expect(data.longitude).toBe(151.206079);
      });

      it('Tries to mark a critter as spotted by customer (diver), that is not available in a purchased region by that user and it is REJECTED (with jwt authenticated request)', async () => {
        await request(app.getHttpServer())
          .post(`/spots`)
          .send({
            critterId: notAddedCritterId,
            userId: diverUserId,
            latitude: -33.868857,
            longitude: 151.206079,
            spottedDate: new Date(),
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(401);
      });

      it('Retrieves a list of spotted critters by customer (diver), and returns an array of one element. (with jwt authenticated request)', async () => {
        const response = await request(app.getHttpServer())
          .get(`/spots/me`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        const data = response.body;
        expect(data).toHaveLength(1);
        expect(data[0].name).toBe('Great White Shark');
        expect(data[0].id).toBe(critterId);
      });

      it('Removes a critter from spotted list by customer (diver), for a region that is purchased for that user (with jwt authenticated request)', async () => {
        await request(app.getHttpServer())
          .delete(`/spots`)
          .send({
            critterId: critterId,
            userId: diverUserId,
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);
      });

      it('Retrieves a list of spotted critters by customer (diver), and returns an array of ZERO elements. (with jwt authenticated request)', async () => {
        const response = await request(app.getHttpServer())
          .get(`/spots/me`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        const data = response.body;
        expect(data).toHaveLength(0);
      });

      it('Tries to create a new critter as customer (diver) with jwt authenticated request and gets REJECTED', async () => {
        await request(app.getHttpServer())
          .post('/critters')
          .send({
            name: 'Great White Shark',
            description:
              'Male great whites on average measure 3.4 to 4.0 m (11 to 13 ft) long, while females at 4.6 to 4.9 m (15 to 16 ft).[6] Adults of this species weigh 522–771 kg (1,151–1,700 lb) on average;[59] however, mature females can have an average mass of 680–1,110 kg (1,500–2,450 lb).[4] The largest females have been verified up to 6.1 m (20 ft) in length and an estimated 1,905 kg (4,200 lb) in weight,[4] perhaps up to 2,268 kg (5,000 lb).',
            imageUrl:
              'https://i.pinimg.com/originals/28/06/86/280686f2de7aadbd72e01c4aefee480a.jpg',
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(401);
      });

      it('Tries to create a new region as customer (diver) with jwt authenticated request and gets REJECTED', async () => {
        await request(app.getHttpServer())
          .post('/regions')
          .send({
            name: 'Mediterranean Sea',
            description:
              'The Mediterranean Sea has an average depth of 1,500 m (4,900 ft) and the deepest recorded point is 5,267 m (17,280 ft) in the Calypso Deep in the Ionian Sea. It lies between latitudes 30° and 46° N and longitudes 6° W and 36° E. Its west–east length, from the Strait of Gibraltar to the Gulf of Iskenderun, on the southeastern coast of Turkey, is about 4,000 kilometres (2,500 mi). The north–south length varies greatly between different shorelines and whether only straight routes are considered.',
            imageUrl:
              'https://www.worldatlas.com/r/w1200/upload/79/5c/5d/shutterstock-587268482.jpg',
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(401);
      });

      it('Tries to purchase a region chart for a customer (diver) as customer with jwt authenticated request and gets REJECTED', async () => {
        await request(app.getHttpServer())
          .post(`/purchases`)
          .send({
            userId: diverUserId,
            regionId: regionId,
            purchasedDate: new Date(),
          })
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(401);
      });
    });

    ////////
  });
});
function loadFixtures(arg0: string, connection: Connection) {
  throw new Error('Function not implemented.');
}
