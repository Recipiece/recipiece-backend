import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ForgotPasswordService {
  constructor(private prisma: PrismaService) {}
}
