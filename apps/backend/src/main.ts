import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { config as dotenvConfig } from "dotenv";
import { CONFIG } from "./config";

async function bootstrap() {
  // Load environment variables
  dotenvConfig();

  // Create NestJS application
  const app = await NestFactory.create(AppModule, {
    logger: CONFIG.LOGGER_LEVELS,
  });
  const logger = new Logger("Bootstrap");

  // Set global prefix if configured
  app.setGlobalPrefix("api");

  // Apply security headers with Helmet
  app.use(helmet());

  // Enable CORS
  app.enableCors({
    origin: CONFIG.CORS.ORIGIN,
    methods: CONFIG.CORS.METHODS,
    credentials: CONFIG.CORS.CREDENTIALS,
  });

  // Enable cookie parser middleware
  app.use(cookieParser(process.env.COOKIE_SECRET || "cookie-secret"));

  // Enable request compression
  app.use(compression());

  // Setup global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Setup Swagger documentation
  if (CONFIG.NODE_ENV !== "production") {
    const config = new DocumentBuilder()
      .setTitle(CONFIG.SWAGGER.TITLE)
      .setDescription(CONFIG.SWAGGER.DESCRIPTION)
      .setVersion(CONFIG.SWAGGER.VERSION)
      .addBearerAuth()
      .addCookieAuth("accessToken")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(CONFIG.SWAGGER.PATH, app, document, {
      jsonDocumentUrl: "api/docs/json",
    });
  }

  // Start the application
  await app.listen(CONFIG.PORT);
  logger.log(`Application is running on: http://localhost:${CONFIG.PORT}`);

  // Log additional info
  if (CONFIG.NODE_ENV !== "production") {
    logger.log(
      `Swagger documentation available at: http://localhost:${CONFIG.PORT}/${CONFIG.SWAGGER.PATH}`,
    );
  }
}

void bootstrap();
