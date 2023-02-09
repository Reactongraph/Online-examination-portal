import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
// somewhere in your initialization file

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['debug']
	})
	app.use(cookieParser())
	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	})

	const config = new DocumentBuilder()
		.setTitle('Online Examination portal')
		.setDescription('Online Exam portal API description')
		.setVersion('1.0')
		.addTag("Exam-portal-api's")
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api-docs', app, document)
	await app.listen(5000)
}
bootstrap()
