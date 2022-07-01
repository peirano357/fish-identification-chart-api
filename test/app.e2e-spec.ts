import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, LoggerService } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection } from 'typeorm';

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

  describe('Authentication', () => {
    let jwtToken: string;
    let critterId: string;
    let regionId: string;
    let adminUserId: string;
    let diverUserId: string;

    describe('AuthModule', () => {
      // register admin user

      it('Signs up user as test@example.com, Password357, administrator', async () => {
        const response = await request(app.getHttpServer())
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

    describe('Protected', () => {
      it('Gets protected resource with jwt authenticated request', async () => {
        const response = await request(app.getHttpServer())
          .get('/critters')
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);

        const data = response.body.data;
        // add assertions that reflect your test data
        // expect(data).toHaveLength(3)
      });
    });

    describe('Creates a Critter', () => {
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
      });
    });

    describe('Creates a Region', () => {
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
      });
    });
  });
});
function loadFixtures(arg0: string, connection: Connection) {
  throw new Error('Function not implemented.');
}
