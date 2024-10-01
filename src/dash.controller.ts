import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './common/auth/jwt.guard';
import { ApiBearerAuth, ApiTags, ApiResponse,ApiOperation} from '@nestjs/swagger';

@ApiTags('Recursos Protegidos')
@Controller('dash')
export class DashController {
  @Get()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter recurso protegido' })
  @ApiResponse({ status: 200, description: 'Retorna o recurso protegido.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  getProtectedResource() {
    return { message: 'Este é um recurso protegido' };
  }
}
